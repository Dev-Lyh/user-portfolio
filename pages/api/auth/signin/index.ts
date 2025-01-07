import {NextApiRequest, NextApiResponse} from 'next';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../../../firebaseConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {

      const {uid} = req.body;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = {
          bio: docSnap.data().bio,
          job_title: docSnap.data().job_title,
          email: docSnap.data().email,
          name: docSnap.data().name
        }
        res.status(200).json({user})
      } else {
        res.status(404).json({message: 'User Not Found.'})
      }
    } catch (error) {
      res.status(500).json({error});
    }
  } else {
    res.status(405).json({message: 'Método não permitido'});
  }
}
