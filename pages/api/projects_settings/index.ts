import {NextApiRequest, NextApiResponse} from 'next';
import {db, storage} from '../../../firebaseConfig';
import {getDocs, query, where, collection, addDoc, updateDoc, doc} from 'firebase/firestore';
import {Project} from "@/types/Project"
import formidable, {Fields, Files} from "formidable";
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({error: "Invalid or missing user ID"});
  }

  if (req.method === 'GET') {

    try {
      const q = query(collection(db, "projects"), where("user_id", "==", id));
      const projectsSnapshot = await getDocs(q);

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

      res.status(200).json(updatedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({error: "Failed to fetch projects"});
    }
  } else if (req.method === "POST") {
    const form = formidable({
      multiples: false,
      uploadDir: "./uploads",
      keepExtensions: true,
    });
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
      const {user_id, name, repository_url, demo_url, description, id} = fields;
      if (!user_id || !name || !repository_url || !demo_url || !description) {
        return res.status(400).json({error: "Nome e biografia são obrigatórios."});
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      let fileUrl = "";

      const getFileBuffer = async (file: any) => {
        if (!file || !file.originalFilename) return null;
        return await fs.promises.readFile(file.filepath);
      };

      const uploadFileToStorage = async (fileBuffer: Buffer, filePath: string) => {
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, fileBuffer);
      };

      const deleteFileFromStorage = async (filePath: string) => {
        const storageRef = ref(storage, filePath);
        await deleteObject(storageRef);
      };

      const project = {
        user_id: user_id[0],
        name: name[0],
        repository_url: repository_url[0],
        demo_url: demo_url[0],
        description: description[0],
        img_url: "",
      };

      if (id) {
        const projectId = id[0];
        const docRef = doc(db, "projects", projectId);

        project.img_url = `projects/${user_id[0]}/${projectId}`;

        await deleteFileFromStorage(project.img_url);

        const fileBuffer = await getFileBuffer(file);
        if (fileBuffer) {
          fileUrl = project.img_url;
          await uploadFileToStorage(fileBuffer, fileUrl);
        }

        await updateDoc(docRef, project);
        return res.status(200).json({...project, id: projectId});
      } else {
        const docRef = await addDoc(collection(db, "projects"), project);
        const projectId = docRef.id;

        project.img_url = `projects/${user_id[0]}/${projectId}`;

        await updateDoc(doc(db, "projects", projectId), {
          img_url: project.img_url
        })

        const fileBuffer = await getFileBuffer(file);
        if (fileBuffer) {
          fileUrl = project.img_url;
          await uploadFileToStorage(fileBuffer, fileUrl);
        }

        return res.status(200).json({...project, id: projectId});
      }


    } catch (error) {
      return res.status(500).json({error});
    }
  } else {
    return res.status(405).json({error: "Method not allowed"});
  }
}
