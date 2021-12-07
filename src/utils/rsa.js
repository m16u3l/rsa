import { KeyPair } from "../models/models";
import { getPrimo } from "./primos";
import { mcd, getCodeHex, getCodeDec } from "./utils";

import bigInt from "big-integer";

let calcularD = (e, fN) => {
  //return bigInt(e).modInv(bigInt(fN))
  e %= fN;
  for (let i = 1; i < fN; i++) {
    if ((e * i) % fN === 1) {
      return i;
    }
  }
}

let calcularE = (fN) => {
  let aux = 2;
  let e = aux;
  while (mcd(e, fN) !== 1 && 1 < e < fN) {
    e = aux;
    aux++;
  }
  return e;
}

let generarClave = (x, n) => {
  const xAscii = getCodeHex(x);
  const nAscii = getCodeHex(n);
  return xAscii + "," + nAscii
};

let generarParDeClaves = () => {
  // generar par de claves
  // cambiar aca
  const p = getPrimo();
  const q = getPrimo();

  const n = p * q;
  const fN = (p - 1) * (q - 1);

  const e = calcularE(fN);
  const d = calcularD(e, fN);

  let clavePublica = generarClave(e, n); //[publica]
  let clavePrivada = generarClave(d, n); //[privada]
  return new KeyPair(clavePublica, clavePrivada);
}

const encriptarRSA = (mensajeEnClaro, clavePublica) => {
  console.log(mensajeEnClaro)
  console.log(clavePublica)
  const [es, ns] = clavePublica.split(',');
  const e = bigInt(getCodeDec(es));
  const n = bigInt(getCodeDec(ns));

  const arrayEncriptados = [];

  for (let i = 0; i < mensajeEnClaro.length; i++) {
    const ascii = mensajeEnClaro.charCodeAt(i);
    // encriptar
    const cadenaEcriptada = bigInt(ascii).modPow(e, n);
    const valor = getCodeHex(+cadenaEcriptada);
    arrayEncriptados.push(valor);
  }
  return arrayEncriptados;
}

let desencriptarRSA = (mensajeEncriptado, clavePrivada) => {
  const [ds, ns] = clavePrivada.split(',');

  const d = bigInt(getCodeDec(ds));
  const n = bigInt(getCodeDec(ns));

  let mensajeDesencriptado = "";
  const arrayEncriptados = mensajeEncriptado.split(",");
  for (let i = 0; i < arrayEncriptados.length; i++) {
    // desencriptar
    const ascii = bigInt(getCodeDec(arrayEncriptados[i])).modPow(d, n);
    mensajeDesencriptado += String.fromCharCode(ascii);
  }

  return mensajeDesencriptado;
}

export { generarParDeClaves, encriptarRSA, desencriptarRSA };
