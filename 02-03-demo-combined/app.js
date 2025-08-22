// Minimal static server + /page endpoint
import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { serialize } from "./utils/serialize.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, ""); // project root
const CLIENT = join(ROOT, "");
const PORT = 3003;

const mime = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json",
};

function ServerComponent({ name }) {
    return `<p style="font-style:italic">Hello ${name} from the Server Component</p>`;
}

function ClientComponent({ showCappuccino, showBlack }) {
    return `
        <Cafe showCappuccino=${showCappuccino} showBlack=${showBlack} />
    `;
}

const server = http.createServer((req, res) => {
    if (req.url.startsWith("/rsc")) {
        const html = `
            <div>
                <h1>RSC simplified demo</h1>
                ${ServerComponent({ name: "Bangalore" })}
            </div>
        `;
        const payload = serialize(html); // { html, components: [...] }
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

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
