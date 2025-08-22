export function Espresso (){
	console.log('\tExpresso')
}


export function Black (){
	console.log('Black contents:');
	Espresso();
}
export function Milk(){
	console.log('\tMilk')
}



export function Cappuccino (){
	console.log('Cappucino contents:');
	Espresso()
	Milk()
}





export function Menu (){
	Cappuccino()
	Black()
}

Menu()
