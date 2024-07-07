import { pool } from "../../database/config.js"


const findOneEmail = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email = $1"
    const { rows } = await pool.query(query, [email])
    return rows[0]
}

const create = async ({ email, password, rol, lenguage }) => {
    const query =
    "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *"
    const { rows } = await pool.query(query, [email, password, rol, lenguage])
    return rows[0]
}

export const userModel = {
    findOneEmail,
    create,
}