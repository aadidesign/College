import dbConnect from "../../lib/dbConnect";
import Department from "../../models/Department";
import { verifyAuth } from "../../middleware/authenticate";

async function handler(req, res) {
    await dbConnect();

    if (req.method === "POST") {
        const { name, description } = req.body;

        try {
            const department = new Department({
                name,
                description,
                faculty_id: req.role,
            });

            await department.save();

            return res.status(201).json({ message: "Department created successfully", department });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}

export default verifyAuth(handler);
