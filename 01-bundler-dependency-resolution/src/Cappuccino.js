import { Espresso } from './Espresso.js';
import { Milk } from './Milk.js';
import { Sugar } from './Sugar.js';

export function Cappuccino() {
	console.log('Cappucino contents:');
	Espresso();
	Milk();
	Sugar();
}
