import { deserialize } from "./utils/serialize.js";
import { Cafe } from "./src/Cafe.js";

const REGISTRY = { Cafe };

async function main() {
    const res = await fetch("/page");

    const data = await res.json(); // { html, components }
    console.log("Data received: ", data);

    const root = document.getElementById("app");
    root.innerHTML = data.html;

    // Hydrate the slots
    data.components.forEach((c, i) => {
        deserialize({ entry: c, i }, root, REGISTRY);
    });
}

main();
