import { KeyPair } from "../models/models";
import { getPrimo } from "./primos";
import { mcd } from "./utils";

let calcularD = () => {
  return 321;
}
let calcularE = (n, fN) => {
  let aux = 2;
  let e = aux;
  while (mcd(e, fN) !== 1 && 1 < e < fN) {
    e = aux;
    aux++;
  }
  return e;
}

let generarClavePrivada = (n, Fn) => {
  let d = calcularD();
  return d + "," + n;
}

let generarClavePublica = (n, fN) => {
  let e = calcularE(n, fN);
  return e + "," + n;
}

let generarParDeClaves = () => {
  // generar par de claves
  const p = getPrimo();
  const q = getPrimo();

  const n = p * q;
  const fN = (p - 1) * (q - 1);

  let clavePublica = generarClavePublica(n, fN);
  let clavePrivada = generarClavePrivada(n, fN);
  return new KeyPair(clavePrivada, clavePublica);
}

let encriptarRSA = (mensajeEnClaro, clavePublica, ClavePrivada) => {
  console.log(mensajeEnClaro, clavePublica, ClavePrivada);
  // encriptar
  let mensajeEncriptado = "mensaje encriptado";
  return mensajeEncriptado;
}

let desencriptarRSA = (mensajeEncriptado, clavePublica, ClavePrivada) => {
  console.log(mensajeEncriptado, clavePublica, ClavePrivada);
  // desencriptar
  let mensajeDesencriptado = "mensaje desencriptado";
  return mensajeDesencriptado;
}

export { generarParDeClaves, encriptarRSA, desencriptarRSA };
