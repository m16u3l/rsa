import { KeyPair } from "../models/models";
import { getPrimo } from "./primos";
import { mcd } from "./utils";

let calcularD = (e, fN) => {
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

let generarClave = (x, n) => x + "," + n;

let generarParDeClaves = () => {
  // generar par de claves
  const p = 11;
  const q = 17;

  const n = p * q;
  const fN = (p - 1) * (q - 1);

  const e = calcularE(fN);
  const d = calcularD(e, fN);

  let clavePublica = generarClave(e, n); //[publica]
  let clavePrivada = generarClave(d, n); //[privada]
  return new KeyPair(clavePublica, clavePrivada);
}

let encriptarRSA = (mensajeEnClaro, clavePublica) => {
  const [e, n] = clavePublica.split(',');
  // encriptar
  let mensajeEncriptado = Math.pow(+mensajeEnClaro, +e) % n;
  return mensajeEncriptado;
}

let desencriptarRSA = (mensajeEncriptado, clavePrivada) => {
  const [d, n] = clavePrivada.split(',');
  // desencriptar
  let mensajeDesencriptado = Math.pow(+mensajeEncriptado, +d) % n;
  return mensajeDesencriptado;
}

export { generarParDeClaves, encriptarRSA, desencriptarRSA };
