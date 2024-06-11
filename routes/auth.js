import { Router } from "express";
var router = Router();

/* Register. */
import { register, login } from "../controller/authentication_controller.js";

router.post(
  "/register",
  async (req, res, next) => await register(req, res),
);
router.post(
  "/login",
  async (req, res, next) => await login(req, res),
);

export default router;
