import { Espresso } from './Espresso.js';
import { Milk } from './Milk.js';

export function Cappuccino() {
	console.log('Cappucino contents:');
	Espresso();
	Milk();
}
