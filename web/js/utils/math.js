export const roundToDecimal = (number, decimalDigits) => {
    const scale = Math.pow(10, decimalDigits);
    return Math.round(number * scale) / scale;
}

export const randomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
}