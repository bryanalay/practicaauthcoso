import { check } from "../../auth/index.js";
import { error, success } from "../../network/response.js";

function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        const owner = req.body.id;
        try {
          const a = check.own(req, owner);
          success(req, res, a, 200);
          next();
        } catch (e) {
          error(req, res, e.message, 404);
          next();
        }
        break;
      default:
        next();
        break;
    }
  }

  return middleware;
}

export { checkAuth };
