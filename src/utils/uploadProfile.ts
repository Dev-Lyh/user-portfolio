export const uploadProfile = async (file: File, name: string, bio: string) => {
  const formData = new FormData();
  formData.append("file", file); // Arquivo
  formData.append("name", name); // Nome
  formData.append("bio", bio);   // Biografia

  try {
    const response = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar perfil");
    }

    const data = await response.json();
    console.log("Perfil cadastrado com sucesso:", data);
    alert("Perfil cadastrado!");
  } catch (error) {
    console.error("Erro no cadastro:", error);
    alert("Erro ao cadastrar o perfil");
  }
};
