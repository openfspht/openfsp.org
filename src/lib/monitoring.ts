type Settings = {
    dsn?: string;
    environment?: string;
    release?: string;
    tracesSampleRate?: string;
    analyticsHost?: string;
    analyticsWebsiteId?: string;
};

const SETTINGS_PATH = "/monitoring.json";

let loaded: Promise<Settings | undefined> | undefined;

function settings(): Promise<Settings | undefined> {
    loaded ??= fetch(SETTINGS_PATH, { cache: "no-store" })
        .then((response) => (response.ok ? (response.json() as Promise<Settings>) : undefined))
        .catch(() => undefined);
    return loaded;
}

export async function startAnalytics(): Promise<void> {
    const found = await settings();
    if (!found?.analyticsHost || !found.analyticsWebsiteId) {
        return;
    }
    const script = document.createElement("script");
    script.defer = true;
    script.src = new URL("/script.js", found.analyticsHost).href;
    script.dataset.websiteId = found.analyticsWebsiteId;
    document.head.append(script);
}

export async function startMonitoring(service: string): Promise<void> {
    const found = await settings();
    if (!found?.dsn) {
        return;
    }
    const Sentry = await import("@sentry/react");
    Sentry.init({
        dsn: found.dsn,
        environment: found.environment || undefined,
        release: found.release || undefined,
        dataCollection: { userInfo: false, httpBodies: [] },
        integrations: [Sentry.browserTracingIntegration()],
        tracesSampleRate: Number(found.tracesSampleRate) || 0,
        initialScope: { tags: { service } },
    });
}
