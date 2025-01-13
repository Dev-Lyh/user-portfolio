import {NextApiRequest, NextApiResponse} from "next";
import {ref, deleteObject, getDownloadURL} from "firebase/storage";
import {db, storage} from "../../../firebaseConfig";
import {getDoc, doc, deleteDoc, collection, query, where, getDocs} from "firebase/firestore";
import {Project} from "@/types/Project"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query;

  if (!id || typeof id !== "string") {
    return res.status(404).json({error: "Id não encontrado"});
  }

  if (req.method === "GET") {
    const userSnap = await getDoc(doc(db, "users", id));
    const q = query(collection(db, "projects"), where("user_id", "==", id));
    const projectsSnapshot = await getDocs(q)

    const projects: Array<Project> = projectsSnapshot.docs.map((doc) => ({
      id: doc.id,
      user_id: doc.data().user_id,
      img_url: doc.data().img_url,
      name: doc.data().name,
      repository_url: doc.data().repository_url,
      demo_url: doc.data().demo_url,
      description: doc.data().description,
    }));

    const updatedProjects = await Promise.all(
      projects.map(async (project) => {
        const imgRef = ref(storage, project.img_url);
        const imgURL = await getDownloadURL(imgRef);
        return {
          ...project,
          img_url: imgURL
        }
      })
    )

    if (userSnap.exists()) {
      const user = userSnap.data();
      const imgRef = ref(storage, `profiles/${id}/profile_picture`);
      try {
        user.img_url = await getDownloadURL(imgRef); // Tenta obter a URL
        return res.status(200).json({projects: updatedProjects, user})
      } catch (error) {
        if (error.code === "storage/object-not-found") {
          console.log("Imagem não encontrada no Storage.");
          return res.status(200).json({...user, img_url: null}); // Retorna null para img_url
        } else {
          console.error("Erro ao verificar a imagem:", error);
          return res.status(500).json({error: "Erro ao buscar a imagem do usuário."});
        }
      }
    }

  }
}