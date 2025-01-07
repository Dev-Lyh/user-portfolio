import {NextApiRequest, NextApiResponse} from 'next';
import {getDoc, doc} from 'firebase/firestore';
import {db} from '../../../firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;

    if (req.method === 'GET') {
        // Validar se ID está presente e é uma string
        if (!id) {
            return res.status(400).json({error: "Invalid or missing user ID"});
        }

        try {
            const docSnap = await getDoc(doc(db, "users", id));

            if (docSnap.exists()) {
                const user = docSnap.data();
                return res.status(200).json({user});
            } else {
                return res.status(404).json({error: "User not found"});
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({error: "Internal server error"});
        }
    } else {
        return res.status(405).json({error: "Method not allowed"});
    }
}
