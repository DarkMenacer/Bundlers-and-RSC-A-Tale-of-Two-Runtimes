import { deserialize, injectPreloads } from "./utils/serialize.js";
import { Cafe } from "./src/Cafe.js";

// const REGISTRY = {
//     Cafe: () => import("./src/Cafe.js"),
// };

// const REGISTRY = ;
const REGISTRY = { Cafe };

async function main() {
    const res = await fetch("/rsc");

    const data = await res.json(); // { html, components }
    console.log("Data received: ", data);

    // 1) Preload *before* we mount
    injectPreloads(data.preload);

    const root = document.getElementById("app");
    root.innerHTML = data.html;

    // Hydrate the slots
    data.components.forEach((c, i) => {
        deserialize({ entry: c, i }, root, REGISTRY);
    });
}

main();
