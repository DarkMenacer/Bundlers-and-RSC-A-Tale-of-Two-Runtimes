import { Espresso } from "./Espresso.js";
import { htmlWriter } from "./htmlWriter.js";
import { Milk } from "./Milk.js";

export function Cappuccino({ includeSugar = false } = {}) {
    htmlWriter("cappuccino", "Cappuccino contents: ");

    if (includeSugar) {
        import("./Sugar.js").then(({ Sugar }) => {
            Sugar();
        });
    }
    Espresso("cappuccino-container");
    Milk();
}
