 import { pool } from "../Data_BD.js";
import fs from 'fs';
 
export const getUsuario = async (req, res) => {
    console.log(req.params.Email);
    const [result] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", 
    [
        req.params.Email
    ])
    if(result.length == 0){
        return res.status(404).json({message: "Usuario no encontrado"});
    }
    res.json(result[0]);
}

export const createUsuario = async (req, res) => {
    const {Nombre, Email, Password} = req.body
    await pool.query("BEGIN;");
    const result = await pool.query("INSERT INTO Usuarios (Email, Password) VALUES (?,?) ",
    [
        Email,
        Password
    ]);
    const result1 = await pool.query("INSERT INTO Usuarios ( Email, Password , ID_Cliente) VALUES ( ?, ?, (SELECT MAX(ID_Cliente) AS id FROM clientes))",
    [
        Email,
        Password
    ]);
    await pool.query("COMMIT;");
    console.log(result1);
    res.send('Creando Usuario');
}

export const getCategorias = async (req, res) => {
    
    console.log(req.params);
    
    const [result] = await pool.query("SELECT * FROM Categorias");
    
    console.log(result);
    
    if(result.length == 0){
        return res.status(404).json({message: "Categoria no encontrada"});
    }
    res.json(result);
}
