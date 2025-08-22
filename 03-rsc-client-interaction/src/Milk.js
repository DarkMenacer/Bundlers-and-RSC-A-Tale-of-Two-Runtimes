export function Milk() {
    const appDiv = document.getElementById("app");
    const milkDiv = document.createElement("div");
    milkDiv.className = "milk-container";

    const milk = document.createElement("span");
    milk.textContent = "Milk added: 200ml of whole milk.";
    milkDiv.appendChild(milk);
    appDiv.appendChild(milkDiv);
}
