import {
  list,
  get,
  remove,
  upSet,
  salt,
  getAllUsersdb,
  query,
} from "../../db/dummy.js";
import { success, error } from "../../network/response.js";
import { registerController } from "../auth/controller.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { err } from "../../utils/error.js";

//const saltou = await bcrypt.genSalt(5)

async function hashear(pass) {
  return await bcrypt.hash(pass, salt);
}

const TABLA = "users";

async function getUsers(req, res) {
  const lista = await list(TABLA);
  try {
    success(req, res, lista, 200);
  } catch (e) {
    error(req, res, e.message, 500);
  }
}

async function getAllUsers(req, res) {
  try {
    const msg = await getAllUsersdb();
    success(req, res, msg, 200);
  } catch (e) {
    error(req, res, e.message, 404);
  }
}

async function getUser(req, res) {
  const id = req.params.id;
  console.log(id);
  const user = await get(TABLA, id);
  console.log("getuser + user");
  console.log("usere: ", user);
  try {
    success(req, res, user, 200);
  } catch (e) {
    error(req, res, e.message, 404);
  }
}

async function saveUser(req, res) {
  postUser(req, res, "save");
}

async function updateUser(req, res) {
  postUser(req, res, "update");
}

async function postUser(req, res, key) {
  const post = {
    id: req.body.id,
    name: req.body.name,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, salt),
  };

  if (req.body.id) {
    post.id = req.body.id;
  } else {
    post.id = nanoid(6);
  }

  switch (key) {
    case "update":
      await registerController(post);
      await upSet(TABLA, post);
      return { message: "usuario creado", user: post };
      break;
    case "save":
      try {
        verifyAllreadyCreated(post).then((user) => {
          success(req, res, user, 201);
        });
      } catch (e) {
        error(req, res, e.message, 404);
      }
      break;
    default:
      break;
  }
}

async function verifyAllreadyCreated(post) {
  const { username } = post;
  const usernameQuery = await query(TABLA, { username: username });
  console.log("este es el username: ", username);
  console.log("este es el usernamequery: ", usernameQuery);
  if (usernameQuery == null) {
    await registerController(post);
    await upSet(TABLA, post);
    return { message: "usuario creado", user: post };
  }
  if (usernameQuery.username == username) {
    return { message: "usuario en uso" };
  }
}

/*async function updateUser(req, res) {
  const { id } = req.body;

  const idQuery = await query(TABLA, { id: id });
  console.log("idquery: ", idQuery);
  const user = {
    id: idQuery?.id,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  if (idQuery == null) {
    return null;
  }

  if (idQuery !== null) {
    registerUser(user)
      .then((u) => {
        success(req, res, u, 201);
      })
      .catch((e) => {
        error(req, res, e.message, 404);
      });
  }
  // if (idQuery !== null) {
  //   console.log("idquery.id: ", idQuery?.id);

  //   console.log("updateUser: ", user);
  //   try {
  //     const reguser = await registerUser(user);
  //     success(req, res, reguser, 201);
  //   } catch (e) {
  //     error(req, res, e.message, 500);
  //   }
  // }
}*/

async function registerUser(body) {
  await registerController(body);
  return upSet(TABLA, body);
}

function deleteUser(req, res) {
  try {
    const id = req.params.id;
    remove(TABLA, id);
    success(req, res, id, 200);
  } catch (e) {
    error(req, res, e.message, 404);
  }
}

// function proof(req,res){
//   hashear('paco').then((a) => {
//       success(req,res,a,200)
//   }).catch((e) =>{
//       error(req,res,e.message,404)
//   })
// }

async function proof(req, res) {
  const a = await hashear("paco");
  success(req, res, a, 200);
}

export {
  getUsers,
  getUser,
  saveUser,
  deleteUser,
  updateUser,
  getAllUsers,
  proof,
};
