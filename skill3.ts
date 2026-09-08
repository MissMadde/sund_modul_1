// ---- Temperature Converter ----

type ConvertCallback = (celsius: number) => number;

const convertTemperature = (celsius: number, callback: ConvertCallback) => {
    return callback(celsius);
}
const convertToFahrenheit = (celsius: number) => {
    return celsius * 1.8 + 32
}

const convertToKelvin = (celsius: number) => {
    return celsius + 273.15
}

console.log(convertTemperature(18, convertToFahrenheit))

console.log(convertTemperature(18, convertToKelvin))

