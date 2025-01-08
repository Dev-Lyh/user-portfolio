import {NextApiRequest, NextApiResponse} from 'next';
import {getDoc, doc, setDoc} from 'firebase/firestore';
import {db} from '../../../firebaseConfig';

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
                return res.status(200).json({user});
            } else {
                const user = {
                    bio: "",
                    email: email,
                    job_title: "",
                    name: ""
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
