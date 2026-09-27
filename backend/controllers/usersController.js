import { createUser } from "../db.js";

export const createUserController = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await createUser(username);
        return res.json({status: true, data: user});
    }
    catch {
        return res.status(500).json({error: "Ошибка при создании пользователя"});
    }
};