import { deserialize } from "./utils/serialize.js";
import { Cafe } from "./src/Cafe.js";

const REGISTRY = { Cafe };

async function fetchRSC() {
    const res = await fetch("/rsc");
    const data = await res.json(); // { html, components }
    return data;
}

async function main() {
    const data = await fetchRSC();

    // Render the HTML into the root element
    const root = document.getElementById("app");
    root.innerHTML = data.html;

    // Deserialize the components
    data.components.forEach((c, i) => {
        deserialize({ entry: c, i }, root, REGISTRY);
    });
}

main();
