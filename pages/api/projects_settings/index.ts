import {NextApiRequest, NextApiResponse} from 'next';
import {db, storage} from '../../../firebaseConfig';
import {getDocs, query, where, collection, addDoc, updateDoc, doc} from 'firebase/firestore';
import {Project} from "@/types/Project"
import formidable, {Fields, Files} from "formidable";
import {ref, uploadBytes} from "firebase/storage";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query;
  const form = formidable({
    multiples: false,
    uploadDir: "./uploads",
    keepExtensions: true,
  });

  if (!id || typeof id !== "string") {
    return res.status(400).json({error: "Invalid or missing user ID"});
  }

  if (req.method === 'GET') {

    try {
      const q = query(collection(db, "projects"), where("user_id", "==", id));
      const projectsSnapshot = await getDocs(q);
      const projects: Array<Project> = [];

      projectsSnapshot.forEach((doc) => {
        projects.push({
          id: doc.id,
          user_id: doc.data().user_id,
          img_url: doc.data().img_url,
          name: doc.data().name,
          repository_url: doc.data().repository_url,
          demo_url: doc.data().demo_url,
          description: doc.data().description,
        });
      });

      res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({error: "Failed to fetch projects"});
    }
  } else if (req.method === "POST") {

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

      const {user_id, name, img_url, repository_url, demo_url, description, id} = fields;
      if (!user_id || !name || !img_url || !repository_url || !demo_url || !description) {
        return res.status(400).json({error: "Nome e biografia são obrigatórios."});
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      let fileUrl = null;

      if (file) {
        const fileBuffer = await fs.promises.readFile(file.filepath);
        if (file.originalFilename) {
          fileUrl = `projects/${user_id[0]}/${name[0].replace(" ", "_")}`;
          const storageRef = ref(storage, fileUrl);
          await uploadBytes(storageRef, fileBuffer);
        }
      }

      const project = {
        user_id: user_id[0],
        name: name[0],
        repository_url: repository_url[0],
        demo_url: demo_url[0],
        description: description[0],
        img_url: fileUrl,
      };

      if (id) {
        const docRef = doc(db, "projects", id[0]);
        await updateDoc(docRef, project);
        return res.status(200).json({...project, id});
      } else {
        const docRef = await addDoc(collection(db, "projects"), project);
        const project_id = docRef.id;
        return res.status(200).json({...project, id: project_id});
      }


    } catch (error) {
      return res.status(500).json({error});
    }
  } else {
    return res.status(405).json({error: "Method not allowed"});
  }
}
