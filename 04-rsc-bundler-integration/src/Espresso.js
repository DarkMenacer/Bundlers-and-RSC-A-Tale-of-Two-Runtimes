export function Espresso() {
    const appDiv = document.getElementById("app");
    const espressoDiv = document.createElement("div");
    espressoDiv.className = "espresso-container";

    const espresso = document.createElement("span");
    espresso.textContent = "Espresso made out of 100% Arabica beans.";
    espressoDiv.appendChild(espresso);
    appDiv.appendChild(espressoDiv);
}
