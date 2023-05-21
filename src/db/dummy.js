const salt = '$2b$05$rY070hhp1857OjfCcX3Nu.'

const db = {
  users: [],
};

async function list(tabla) {
  return await db[tabla];
}

async function get(tabla, id) {
  let col = await list(tabla);
  const user = (await col.filter((user) => user.id == id)) || { not: "found" };
  return user;
}

async function upSet(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = [];
  }
  //const {username} = await query(tabla, {username:data.username})

  await db[tabla].push(data);
}

async function remove(tabla, id) {
  let index = await db[tabla].findIndex((user) => user.id === id);
  console.log(index, list(tabla));
  db[tabla].splice(index);
  console.log(db[tabla]);
}

async function query(tabla, q) {
  if (!db[tabla]) {
    db[tabla] = [];
  }
  let col = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];

  let pass = { message: "Usuario o cotraseña incorrecto" };

  return col.filter((item) => item[key] === q[key])[0] || null;
}

async function getAllUsersdb() {
  console.log(db);
  return db;
}

export { list, get, upSet, remove, query, salt, getAllUsersdb };
