// src/pages/api/admin/resources.js
import dbConnect from '../../../lib/dbConnect';
import Resource from '../../../models/Resource';

export default async function handler(req, res) {
    try {
        await dbConnect();

        const resources = await Resource.find({});
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
