const numerosPrimos = [
  /*
  3,
  5,
  7,
  11,
  13,
  17,
*/
  
  5915587277,
  1500450271,
  3267000013,
  5754853343,
  4093082899,
  9576890767,
  3628273133,
  2860486313,
  5463458053,
  3367900313,
];

let getPrimo = () => {
  return numerosPrimos[Math.floor(Math.random() * numerosPrimos.length)];
}

export { getPrimo };