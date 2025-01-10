export const uploadProfile = async (file: File, name: string, bio: string, job_title: string, id: string) => {

  if (!file) {
    throw new Error("Arquivo de foto de perfil obrigatório!");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("bio", bio);
  formData.append("job_title", job_title);

  fetch(`/api/profile_settings/${id}`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
