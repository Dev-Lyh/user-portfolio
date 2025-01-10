import {NextApiRequest, NextApiResponse} from 'next';
import {getDoc, doc, setDoc} from 'firebase/firestore';
import {db, storage} from '../../../firebaseConfig';
import {getDownloadURL, ref} from "firebase/storage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id, email} = req.query;

    if (req.method === 'GET') {
        if (!id || typeof id !== "string") {
            return res.status(400).json({error: "Invalid or missing user ID"});
        }

        try {
            const docSnap = await getDoc(doc(db, "users", id));

            if (docSnap.exists()) {
                const user = docSnap.data();
                const imgRef = ref(storage, `profiles/${id}/profile_picture`);
                try {
                    user.img_url = await getDownloadURL(imgRef); // Tenta obter a URL
                    console.log(user)
                    return res.status(200).json({...user});
                } catch (error) {
                    if (error.code === "storage/object-not-found") {
                        console.log("Imagem não encontrada no Storage.");
                        return res.status(200).json({...user, img_url: null}); // Retorna null para img_url
                    } else {
                        console.error("Erro ao verificar a imagem:", error);
                        return res.status(500).json({error: "Erro ao buscar a imagem do usuário."});
                    }
                }
            } else {
                const user = {
                    bio: "",
                    email: email,
                    job_title: "",
                    name: "",
                    img_path: ""
                }
                await setDoc(doc(db, "users", id), user)
                return res.status(201).json(user);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({error: "Internal server error"});
        }
    } else {
        return res.status(405).json({error: "Method not allowed"});
    }
}
