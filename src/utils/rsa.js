import { KeyPair } from "../models/models";
import { getPrimo } from "./primos";
import { mcd } from "./utils";
import bigInt from "big-integer";

let calcularD = (e, fN) => {
  return bigInt(e).modInv(bigInt(fN))
  /*
  e %= fN;
  for (let i = 1; i < fN; i++) {
    if ((e * i) % fN === 1) {
      return i;
    }
  }
  */
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

let generarClave = (x, n) => x + "," + n;

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

let encriptarRSA = (mensajeEnClaro, clavePublica) => {
  const [es, ns] = clavePublica.split(',');
  const e = bigInt(es);
  const n = bigInt(ns);
  // encriptar
  let mensajeEncriptado = bigInt(mensajeEnClaro).modPow(e, n);
  return mensajeEncriptado;
}

let desencriptarRSA = (mensajeEncriptado, clavePrivada) => {
  const [ds, ns] = clavePrivada.split(',');
  const d = bigInt(ds);
  const n = bigInt(ns);

  // desencriptar
  const x = bigInt(mensajeEncriptado).modPow(d, n);
  const mensajeDesencriptado = x;
  return mensajeDesencriptado;
}

export { generarParDeClaves, encriptarRSA, desencriptarRSA };
