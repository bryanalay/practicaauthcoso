import { success, error } from "../../network/response.js";
import { query, upSet, salt } from "../../db/dummy.js";
import { authSign } from "../../auth/index.js";
import bcrypt from "bcrypt";

const TABLA = "auth";

async function loginController(req, res) {
  const { username, password } = req.body;
  const passCrypted = await bcrypt.hash(password, salt);
  const data = await query(TABLA, { username: username });
  console.log("MOSTRAR DATA DEL LOGINCONTROLLER")
  console.log('data: ',data)
  if(data == null){
    const msg = {message:'usuario o contraseña incorrecta'}
    return error(req,res,msg,404)
  }
  if (data.password === passCrypted) {
    const token = authSign(data);
    console.log("jwt creado: ", token );
    success(req, res, token, 200);
  } else {
    const msg = {
      message:'usuario o contraseña incorrecta'
    }
    error(req, res, msg, 404);
  }
}

async function registerController(body) {
   upSet(TABLA,body)
}

export { loginController, registerController };
