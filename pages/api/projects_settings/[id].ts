import {NextApiRequest, NextApiResponse} from "next";
import {ref, deleteObject} from "firebase/storage";
import {db, storage} from "../../../firebaseConfig";
import {getDoc, doc, deleteDoc} from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query;

  if (!id || typeof id !== "string") {
    return res.status(404).json({error: "Id não encontrado"});
  }

  if (req.method === "DELETE") {
    try {
      const projectRef = doc(db, "projects", id);
      const projectSnapshot = await getDoc(projectRef);

      if (!projectSnapshot.exists()) {
        return res.status(404).json({error: "Projeto não encontrado"});
      }

      const imgUrl = projectSnapshot.data().img_url;
      if (imgUrl) {
        const imgRef = ref(storage, imgUrl);
        await deleteObject(imgRef);
      }

      await deleteDoc(projectRef);

      return res.status(200).json({message: "Deletado com sucesso"});
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      return res.status(500).json({error});
    }
  } else {
    return res.status(405).json({error: "Método não permitido"});
  }
}
