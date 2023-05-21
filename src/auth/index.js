import jwt, { verify } from "jsonwebtoken";
import { err } from "../utils/error.js";

function  authSign(data) {
  return jwt.sign(data, "secret");
}

function verifyTK(token){
    return verify(token, "secret")
}

const check = {
  own: function (req, owner) {
    const tokenDecoded = decodeHeader(req)
    console.log('este es el token decoded: ',tokenDecoded.id)
    console.log('este es el owner: ', owner)
    if(tokenDecoded.id !== owner){
      console.log('dentro del if de compraracion tokendecoded.id y owner')
      err('No estas autorizado para hacer esto',404);
    }
  },
};

function getToken(auth) {
  if (!auth) {
    err("No viene token",401);
  }

  if(auth.indexOf('Bearer ') === -1){
    err('Formato Invalido',400)
  }

  let token = auth.replace("Bearer ", "");
  console.log('este es el token en gettoken: ',token)
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verifyTK(token);
  req.tk = decoded;
  return decoded;
}

export { authSign, check };
