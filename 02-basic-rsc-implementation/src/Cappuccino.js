import { Espresso } from "./Espresso.js";
import { Milk } from "./Milk.js";

export function Cappuccino() {
    const appDiv = document.getElementById("app");
    const cappDiv = document.createElement("div");
    cappDiv.className = "cappuccino-container";

    const mixture = document.createElement("span");
    mixture.textContent = "Cappuccino contents: ";
    cappDiv.appendChild(mixture);
    appDiv.appendChild(cappDiv);

    Espresso();
    Milk();
}
