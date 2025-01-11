import {NextApiRequest, NextApiResponse} from "next";
import formidable, {Fields, Files} from "formidable";
import fs from "fs";
import {ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../../../firebaseConfig"
import {updateDoc, doc} from "firebase/firestore"

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {id} = req.query;
    const form = formidable({
      multiples: false,
      uploadDir: "./uploads",
      keepExtensions: true,
    });

    if (!id || typeof id !== "string") {
      return res.status(400).json({error: "Invalid or missing user ID"});
    }

    try {
      const {fields, files} = await new Promise<{
        fields: Fields;
        files: Files;
      }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({fields, files});
        });
      });

      const {name, bio, job_title} = fields;
      if (!name || !bio || !job_title) {
        return res.status(400).json({error: "Nome e biografia são obrigatórios."});
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      let fileUrl = null;

      if (file) {
        const fileBuffer = await fs.promises.readFile(file.filepath);
        if (file.originalFilename) {
          fileUrl = `profiles/${id}/profile_picture`;
          const storageRef = ref(storage, fileUrl);
          await uploadBytes(storageRef, fileBuffer);
        }
      }

      const profile = {
        name: name[0],
        bio: bio[0],
        job_title: job_title[0],
        img_url: fileUrl,
      };
      await updateDoc(doc(db, "users", id), profile)

      return res.status(200).json({message: "Perfil cadastrado com sucesso", profile});
    } catch (error) {
      return res.status(500).json({error});
    }
  } else {
    return res.status(405).json({error: "Método não permitido"});
  }
}
