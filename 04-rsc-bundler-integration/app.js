// Minimal static server + /page endpoint
import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { serialize } from "./utils/serialize.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, ""); // project root
const CLIENT = join(ROOT, "");
const manifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));
const PORT = 3004;

const mime = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json",
};

function ServerComponent({ name }) {
    return `<p style="font-style:italic">Hello ${name} from the Server Component</p>`;
}

const server = http.createServer((req, res) => {
    if (req.url.startsWith("/rsc")) {
        const db = JSON.parse(readFileSync(join(ROOT, "db.json"), "utf8"));
        // Determine availability based on db.json
        const showCappuccino = db.isMilkAvailable;
        const showBlack = db.isEspressoAvailable;
        console.log(showBlack, showCappuccino);

        const html = `
            <div>
            <h1>RSC simplified demo</h1>
            ${ServerComponent({ name: "Bangalore" })}
            <Cafe showCappuccino="${showCappuccino}" showBlack="${showBlack}" />
            </div>
        `;
        const payload = serialize(html); // { html, components: [...] }
        // Attach manifest for client to know the mappings
        payload.preload = computePreload(payload.components);
        res.writeHead(200, {
            "Content-Type": "application/json",
        });

        res.end(JSON.stringify(payload));
    } else {
        serveStatic(req, res);
    }
});

function serveStatic(req, res) {
    let filePath =
        req.url === "/" ? join(CLIENT, "index.html") : join(`${ROOT}`, req.url);
    console.log("Serving: ", filePath);
    if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end("Not found");
        return;
    }
    const type = mime[extname(filePath)] || "text/plain";
    res.writeHead(200, { "Content-Type": type });
    res.end(readFileSync(filePath));
}

function computePreload(components) {
    const urls = new Set();
    for (const c of components) {
        console.log("Component: ", c.name);
        (manifest[c.name] || []).forEach((u) => urls.add(u));
    }
    return [...urls];
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
