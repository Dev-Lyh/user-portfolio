export const uploadProfile = async (file: File, name: string, bio: string, job_title: string, id: string) => {

  if (!file) {
    throw new Error("Arquivo de foto de perfil obrigatório!");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("bio", bio);
  formData.append("job_title", job_title);

  try {
    const response = await fetch(`/api/profile_settings/${id}`, {
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
