import { Espresso } from "./Espresso.js";

export function Black() {
    const appDiv = document.getElementById("app");
    const blackDiv = document.createElement("div");
    blackDiv.className = "black-container";

    const black = document.createElement("span");
    black.textContent = "Black coffee contents: ";
    blackDiv.appendChild(black);
    appDiv.appendChild(blackDiv);
    Espresso();
}
