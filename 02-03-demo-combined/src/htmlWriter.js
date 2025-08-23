export function htmlWriter(entity, textContent, parentElement = null) {
    const appDiv = document.getElementById("app");
    const entityDiv = document.createElement("div");
    entityDiv.className = `${entity}-container`;

    const entityElement = document.createElement("span");
    entityElement.textContent = textContent;
    entityDiv.appendChild(entityElement);
    console.log("parentElement -> ", parentElement);
    if (parentElement) {
        const parentElementDiv = document.querySelector(`.${parentElement}`);
        parentElementDiv.appendChild(entityDiv);
        appDiv.appendChild(parentElementDiv);
        console.log(`${parentElementDiv}`);
    } else if (appDiv) {
        // Fallback to appDiv if no parentElement is provided
        appDiv.appendChild(entityDiv);
    }
    console.log(`${appDiv}`);
}
