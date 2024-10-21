import express from "express";
import cors from "cors";

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = process.env.PORT || 3000;

import healthRouter from "./src/routes/health";
import userRouter from "./src/routes/user";

app.use(cors());

app.use(express.json());

app.use("/health", healthRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
