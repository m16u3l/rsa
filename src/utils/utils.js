const mcd = (m, n) => {
  var iaux; //auxiliar
  m = Math.abs(m); //tomamos valor absoluto
  n = Math.abs(n);
  var i1 = Math.max(m, n); //i1 = el más grande
  var i2 = Math.min(m, n); //i2 = el más pequeño

  do {
    iaux = i2; //guardar divisor
    i2 = i1 % i2; //resto pasa a divisor
    i1 = iaux; //divisor pasa a dividendo
  } while (i2 !== 0);
  return i1; //ultimo resto no nulo
}

/**
 * 
 * @param {number} x 
 * @returns hexadecimal string
 */
const getCodeHex = (x) => {
  return x.toString(16).toUpperCase();
}

/**
 * 
 * @param {string} x 
 * @returns decimal number
 */
const getCodeDec = (x) => {
  return parseInt(x, 16);
}

export { mcd, getCodeHex, getCodeDec };
