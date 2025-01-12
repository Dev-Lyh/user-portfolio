export const uploadProjects = async (file: File, name: string, repository_url: string, demo_url: string, description: string, user_id: string, id?: string) => {

//  if (!file) {
//    throw new Error("Arquivo de foto de perfil obrigatório!");
//  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("repository_url", repository_url);
  formData.append("demo_url", demo_url);
  formData.append("description", description);
  formData.append("user_id", user_id);

  if (id) {
    formData.append("id", id);
  }

  fetch(`/api/projects_settings?id=${user_id}`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
