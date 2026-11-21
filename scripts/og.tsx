import { Resvg } from "@resvg/resvg-js";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import satori, { type Font } from "satori";
import { OG_HEIGHT, OG_WIDTH } from "../src/lib/og";

const INK = "#0B3B36";
const ACCENT = "#E8A33D";
const CHALK = "#EEF5F4";
const MUTED = "#B9D3CF";

const modules = resolve(import.meta.dir, "../node_modules/@fontsource");
const font = async (name: string, file: string, weight: Font["weight"]): Promise<Font> => ({
    name,
    data: await readFile(join(modules, file)),
    weight,
    style: "normal",
});
const fonts = await Promise.all([
    font("Space Grotesk", "space-grotesk/files/space-grotesk-latin-700-normal.woff", 700),
    font("Space Grotesk", "space-grotesk/files/space-grotesk-latin-500-normal.woff", 500),
    font("Inter", "inter/files/inter-latin-400-normal.woff", 400),
    font("Inter", "inter/files/inter-latin-500-normal.woff", 500),
]);
const logo = `data:image/svg+xml;base64,${Buffer.from(await readFile(resolve(import.meta.dir, "../public/openfsp-logo-inverse.svg"))).toString("base64")}`;

export interface OgPage {
    path: string;
    title: string;
    description: string;
    section?: string;
}

function shorten(text: string, limit: number): string {
    if (text.length <= limit) {
        return text;
    }
    const cut = text.slice(0, limit);
    return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "")}…`;
}

const RING = "#2A6B62";
const RING_STRONG = "#3E857A";
const ARCS = [
    "M492.1 565.7A300 300 0 0 1 48.1 446.8",
    "M21.1 346.1A300 300 0 0 1 346.1 21.1",
    "M446.8 48.1A300 300 0 0 1 565.7 492.1",
    "M451.1 411.8A160 160 0 0 1 206.9 433.1",
    "M175.0 387.6A160 160 0 0 1 278.6 165.5",
    "M333.9 160.6A160 160 0 0 1 474.5 361.4",
];
const DASHED = [
    "M340.0 549.1A230 230 0 0 1 90.9 300.0",
    "M111.5 222.8A230 230 0 0 1 451.9 131.6",
    "M508.4 188.1A230 230 0 0 1 417.2 528.5",
];
const NODES = [
    [492.1, 565.7],
    [48.1, 446.8],
    [21.1, 346.1],
    [346.1, 21.1],
    [446.8, 48.1],
    [565.7, 492.1],
    [340.0, 549.1],
    [90.9, 300.0],
    [111.5, 222.8],
    [451.9, 131.6],
    [508.4, 188.1],
    [417.2, 528.5],
    [451.1, 411.8],
    [206.9, 433.1],
    [175.0, 387.6],
    [278.6, 165.5],
    [333.9, 160.6],
    [474.5, 361.4],
];
const rings = `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640" fill="none">${[
        ...ARCS.map((d) => `<path d="${d}" stroke="${RING}" stroke-width="1.5"/>`),
        ...DASHED.map(
            (d) => `<path d="${d}" stroke="${RING}" stroke-width="1.5" stroke-dasharray="2 8"/>`,
        ),
        `<path d="M292.2 477.6A160 160 0 0 1 169.6 374.7" stroke="${RING_STRONG}" stroke-width="3" stroke-linecap="round"/>`,
        ...NODES.map(
            ([x, y]) =>
                `<circle cx="${x}" cy="${y}" r="4" fill="${INK}" stroke="${RING_STRONG}" stroke-width="1.5"/>`,
        ),
        `<circle cx="320" cy="320" r="7" fill="${ACCENT}"/>`,
    ].join("")}</svg>`,
).toString("base64")}`;

function titleSize(title: string): number {
    if (title.length <= 24) {
        return 76;
    }
    if (title.length <= 44) {
        return 64;
    }
    return 54;
}

const isHome = (path: string) => path === "/" || path === "/en";
const isEnglish = (path: string) => path === "/en" || path.startsWith("/en/");

function Title({ page }: { page: OgPage }) {
    const words = shorten(page.title, 80).split(" ");
    const underline = isHome(page.path) ? words.length - 1 : -1;
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                maxWidth: 640,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: titleSize(page.title),
                lineHeight: 1.1,
                letterSpacing: -1.5,
                color: "#FFFFFF",
            }}
        >
            {words.map((word, index) => {
                const last = index === underline;
                const text = last ? word.replace(/[.!?]$/, "") : word;
                return (
                    <div key={index} style={{ display: "flex", marginRight: 16 }}>
                        <span style={last ? { borderBottom: `6px solid ${ACCENT}` } : {}}>
                            {text}
                        </span>
                        {last && text !== word ? <span>{word.slice(text.length)}</span> : null}
                    </div>
                );
            })}
        </div>
    );
}

function Card({ page }: { page: OgPage }) {
    const tagline =
        page.section ??
        (isEnglish(page.path)
            ? "Open specification, Apache-2.0"
            : "Spécification ouverte, Apache-2.0");
    return (
        <div
            style={{
                position: "relative",
                width: OG_WIDTH,
                height: OG_HEIGHT,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 80px",
                backgroundColor: INK,
                color: CHALK,
                fontFamily: "Inter",
                overflow: "hidden",
            }}
        >
            <img
                src={rings}
                width={760}
                height={760}
                style={{ position: "absolute", right: -120, top: -65 }}
            />
            <img src={logo} width={267} height={48} />
            <div style={{ display: "flex", marginTop: 40 }}>
                <Title page={page} />
            </div>
            {isHome(page.path) ? null : (
                <div
                    style={{
                        display: "flex",
                        marginTop: 20,
                        maxWidth: 720,
                        fontSize: 24,
                        lineHeight: 1.4,
                        color: MUTED,
                    }}
                >
                    {shorten(page.description, 130)}
                </div>
            )}
            <div style={{ display: "flex", alignItems: "center", marginTop: 40, fontSize: 24 }}>
                <span style={{ fontWeight: 500, color: "#FFFFFF" }}>openfsp.org</span>
                <span
                    style={{
                        width: 7,
                        height: 7,
                        borderRadius: 999,
                        backgroundColor: ACCENT,
                        margin: "0 18px",
                    }}
                />
                <span style={{ color: MUTED }}>{tagline}</span>
            </div>
        </div>
    );
}

const homeCard = resolve(import.meta.dir, "assets/og-home.png");

export async function renderOgImage(page: OgPage, file: string): Promise<void> {
    await mkdir(dirname(file), { recursive: true });
    if (isHome(page.path)) {
        await copyFile(homeCard, file);
        return;
    }
    const svg = await satori(<Card page={page} />, { width: OG_WIDTH, height: OG_HEIGHT, fonts });
    const png = new Resvg(svg, { fitTo: { mode: "width", value: OG_WIDTH } }).render().asPng();
    await writeFile(file, png);
}
