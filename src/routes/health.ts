import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.send({ status: "ok" });
});

export default router;
