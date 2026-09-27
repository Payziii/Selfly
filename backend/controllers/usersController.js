import { createUser, updateUserBio, getUserById, getUserByUsername } from "../db.js";

export const createNewUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = createUser(username);
        return res.json({status: true, data: user});
    }
    catch {
        return res.status(500).json({status: false, error: "Ошибка при создании пользователя"});
    }
};

export const changeBio = async (req, res) => {
    try {
        const { user_id, bio } = req.body;
        const user = updateUserBio(user_id, bio);
        return res.json({status: true, data: user});
    }
    catch {
        return res.status(500).json({status: false, error: "Ошибка при редактировании биографии"});
    }
};

export const getUser = async (req, res) => {
    try {
        const { user_id, username } = req.params;
        const user = user_id ? getUserById(user_id) : getUserByUsername(username);
        return res.json({status: true, data: user});
    }
    catch {
        return res.status(500).json({status: false, error: "Ошибка при получении пользователя"});
    }
};