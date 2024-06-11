import { Router } from "express";
var router = Router();

import { getAll, addBenefit } from "../controller/benefit_controller.js";

router.get(
  "/",
  async (req, res, next) => await getAll(req, res),
);
router.post(
  "/",
  async (req, res, next) => await addBenefit(req, res),
);

export default router;
