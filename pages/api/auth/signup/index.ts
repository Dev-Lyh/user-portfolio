import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {user} = req.body;

    } catch (error) {
      res.status(500).json({error});
    }
  } else {
    res.status(405).json({message: 'Método não permitido'});
  }
}
