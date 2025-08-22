export function Cafe({ showCappuccino, showBlack }) {
    console.log("Cafe props -> ", showCappuccino, showBlack);
    // Create a div with a black background and a button
    const appDiv = document.getElementById("app");
    const cafeDiv = document.createElement("div");
    cafeDiv.className = "cafe-container";

    const button = document.createElement("button");
    button.textContent = "Show Menu";
    button.onclick = showMenu;

    cafeDiv.appendChild(button);
    appDiv.appendChild(cafeDiv);

    console.log("Divs -> ", cafeDiv, appDiv);

    // Function to dynamically import modules
    function showMenu() {
        if (showCappuccino === "true") {
            import("./Cappuccino.js").then((module) => {
                const Cappuccino = module.Cappuccino;
                Cappuccino();
            });
        }

        if (showBlack === "true") {
            import("./Black.js").then((module) => {
                const Black = module.Black;
                Black();
            });
        }

        button.disabled = true; // Disable the button after clicking
        if (!showCappuccino && !showBlack) {
            const noItems = document.createElement("div");
            noItems.textContent = "No items to show in the menu.";
            cafeDiv.appendChild(noItems);
        }
    }
}

// Cafe();
