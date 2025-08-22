import { Espresso } from "./Espresso.js";
import { htmlWriter } from "./htmlWriter.js";
import { Milk } from "./Milk.js";

export function Cappuccino() {
    htmlWriter("cappuccino", "Cappuccino contents: ");

    Espresso("cappuccino-container");
    Milk();
}
