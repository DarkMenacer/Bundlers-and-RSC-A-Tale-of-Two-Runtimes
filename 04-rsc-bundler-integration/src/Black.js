import { Espresso } from "./Espresso.js";
import { htmlWriter } from "./htmlWriter.js";

export function Black() {
    htmlWriter("black", "Black coffee contents: ");
    Espresso("black-container");
}
