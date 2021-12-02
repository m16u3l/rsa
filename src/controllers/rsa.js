import { KeyPair } from "../models/models";

let generarParDeClaves = () => {
  // generar par de claves
  let clavePrivada = 123;
  let clavePublica = 321;
  return new KeyPair(clavePrivada, clavePublica);
}

let encriptarRSA = (mensajeEnClaro, clavePublica, CalvePrivada) => {
  console.log(mensajeEnClaro, clavePublica, CalvePrivada);
  // encriptar
  let mensajeEncriptado = "mensaje encriptado";
  return mensajeEncriptado;
}

let desencriptarRSA = (mensajeEncriptado, clavePublica, CalvePrivada) => {
  console.log(mensajeEncriptado, clavePublica, CalvePrivada);
  // desencriptar
  let mensajeDesencriptado = "mensaje desencriptado";
  return mensajeDesencriptado;
}

export { generarParDeClaves, encriptarRSA, desencriptarRSA };
