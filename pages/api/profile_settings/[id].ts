import {NextApiRequest, NextApiResponse} from "next";
import formidable, {Fields, Files} from "formidable";
import fs from "fs";
import {ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../firebaseConfig"

// Desabilitar o parseamento automático de body pelo Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {id} = req.query;
    const form = formidable({multiples: false});

    try {
      // Tipos explícitos para fields e files
      const {fields, files} = await new Promise<{
        fields: Fields;
        files: Files;
      }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({fields, files});
        });
      });

      // Validação dos dados
      const {name, bio, job_title} = fields;
      if (!name || !bio) {
        return res.status(400).json({error: "Nome e biografia são obrigatórios."});
      }

      // Faz o upload do arquivo (se houver)
      const file = files.file as formidable.File | undefined;

      let fileUrl = null;
      if (file) {
        // Continuar com o processamento do arquivo
        console.log("Arquivo recebido:", file.originalFilename);

        // Exemplo de lógica para salvar o arquivo e gerar a URL
        // fileUrl = await salvarArquivoNoStorage(file);
      } else {
        console.log("Nenhum arquivo foi enviado.");
      }


      if (file) {
        const fileBuffer = await fs.promises.readFile(file.filepath);
        const storageRef = ref(storage, `profiles/${id}/${file.originalFilename}`);
        await uploadBytes(storageRef, fileBuffer);

        // Gerar URL pública
        fileUrl = `https://firebasestorage.googleapis.com/v0/b/${
          process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
        }/o/${encodeURIComponent(`profiles/${id}/${file.originalFilename}`)}?alt=media`;
      }

      // Simula salvar os dados em um banco de dados (pode integrar ao Firestore)
      const profile = {
        name,
        bio,
        job_title,
        img_path: fileUrl,
      };

      console.log("Perfil cadastrado:", profile);

      return res.status(200).json({message: "Perfil cadastrado com sucesso", profile});
    } catch (error) {
      console.error("Erro ao cadastrar perfil:", error);
      return res.status(500).json({error: "Erro ao cadastrar perfil"});
    }
  } else {
    return res.status(405).json({error: "Método não permitido"});
  }
}
