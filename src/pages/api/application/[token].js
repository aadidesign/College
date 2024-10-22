import dbConnect from '../lib/dbConnect';
import { processApproval } from '../services/applicationService'; // move logic to service

export default async function handler(req, res) {
  await dbConnect();

  const { token } = req.query;

  if (req.method === 'POST') {
    const { action, role, rejectReason } = req.body;

    try {
      // Delegate processing logic to service
      const result = await processApproval(token, action, role, rejectReason);
      return res.status(result.status).json(result.message);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
