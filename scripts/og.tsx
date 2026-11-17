import { Resvg } from "@resvg/resvg-js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import satori, { type Font } from "satori";
import { OG_HEIGHT, OG_WIDTH } from "../src/lib/og";

const INK = "#0B3B36";
const ACCENT = "#E8A33D";
const CHALK = "#F4F4F4";
const MUTED = "#525252";
const RULE = "#D4D4D4";

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
const logo = `data:image/svg+xml;base64,${Buffer.from(await readFile(resolve(import.meta.dir, "../public/openfsp-logo.svg"))).toString("base64")}`;

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

function titleSize(title: string): number {
    if (title.length <= 24) {
        return 84;
    }
    if (title.length <= 40) {
        return 72;
    }
    return 60;
}

function Card({ page }: { page: OgPage }) {
    return (
        <div
            style={{
                width: OG_WIDTH,
                height: OG_HEIGHT,
                display: "flex",
                flexDirection: "column",
                backgroundColor: CHALK,
                color: INK,
                fontFamily: "Inter",
            }}
        >
            <div style={{ display: "flex", height: 14, backgroundColor: INK }}>
                <div style={{ width: 220, height: 14, backgroundColor: ACCENT }} />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    padding: "64px 88px 56px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <img src={logo} width={278} height={50} />
                    {page.section ? (
                        <div
                            style={{
                                display: "flex",
                                fontFamily: "Space Grotesk",
                                fontWeight: 500,
                                fontSize: 26,
                                color: MUTED,
                            }}
                        >
                            {page.section}
                        </div>
                    ) : null}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontFamily: "Space Grotesk",
                            fontWeight: 700,
                            fontSize: titleSize(page.title),
                            lineHeight: 1.05,
                            letterSpacing: -1.5,
                        }}
                    >
                        {shorten(page.title, 70)}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            marginTop: 28,
                            fontSize: 30,
                            lineHeight: 1.4,
                            color: MUTED,
                            maxWidth: 960,
                        }}
                    >
                        {shorten(page.description, 150)}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: `2px solid ${RULE}`,
                        paddingTop: 24,
                        fontSize: 24,
                    }}
                >
                    <div style={{ display: "flex", fontWeight: 500 }}>
                        openfsp.org{page.path === "/" ? "" : page.path}
                    </div>
                    <div style={{ display: "flex", color: MUTED }}>Apache-2.0</div>
                </div>
            </div>
        </div>
    );
}

export async function renderOgImage(page: OgPage, file: string): Promise<void> {
    const svg = await satori(<Card page={page} />, { width: OG_WIDTH, height: OG_HEIGHT, fonts });
    const png = new Resvg(svg, { fitTo: { mode: "width", value: OG_WIDTH } }).render().asPng();
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, png);
}
