import { Espresso } from "./Espresso.js";
import { htmlWriter } from "./htmlWriter.js";
import { Milk } from "./Milk.js";

export function Cappuccino({ includeSugar = true } = {}) {
    htmlWriter("cappuccino", "Cappuccino contents: ");

    if (includeSugar) {
        import("./Sugar.js").then(({ Sugar }) => {
            Sugar("cappuccino-container");
        });
    }
    Espresso("cappuccino-container");
    Milk();
}
