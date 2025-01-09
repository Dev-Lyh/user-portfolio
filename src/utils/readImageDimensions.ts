export const readImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({width: img.width, height: img.height});
      };
      img.onerror = () => {
        reject(new Error("Erro ao carregar a imagem."));
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo."));
    };
    reader.readAsDataURL(file);
  });
};