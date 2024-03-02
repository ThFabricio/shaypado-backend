class Utils {
    static generateFriendshipCode(tamanho: number): string {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let resultado = '';
  
      for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
      }
  
      return resultado;
    }
  }
  
  export default Utils;
  