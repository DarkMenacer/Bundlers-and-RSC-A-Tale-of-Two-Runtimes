export function Sugar() {
    const appDiv = document.getElementById("app");
    const sugarDiv = document.createElement("div");
    sugarDiv.className = "sugar-container";

    const sugar = document.createElement("span");
    sugar.textContent = "Sugar added: 2 teaspoons of sugar.";
    sugarDiv.appendChild(sugar);
    appDiv.appendChild(sugarDiv);
}
