export const capitalizaPriLetraDeCadaPalavra = (texto: string = ""): string => {
  return texto.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}