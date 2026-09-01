// ---- Color Picker -----

enum Color {
    Red = "Red",
    Green = "Green",
    Blue = "Blue"
}

const showColor = (color : Color) : string => {
return `You chose ${color}`;
}

console.log(showColor(Color.Red));
console.log(showColor(Color.Green));
console.log(showColor(Color.Blue));




// ----- Pizza Order -----

enum PizzaSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

const orderPizza = (pizza : PizzaSize) : string => {
return `You ordered a ${pizza} pizza.`;
}

console.log(orderPizza(PizzaSize.Medium));
console.log(orderPizza(PizzaSize.Small));
console.log(orderPizza(PizzaSize.Large));