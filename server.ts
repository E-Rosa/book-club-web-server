import express, { Request, Response } from "express";
import { createUser } from "./dbscript";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const app = express();

app.use((req: Request, res: Response, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.listen(4000, () => {
  console.log("server listening on port 4000");
});

app.all("/", (req: Request, res: Response)=>{
    res.sendStatus(200)
})

app.post("/users", async (req: Request, res: Response)=>{
  const users = await createUser()
  res.status(200)
})
app.get("/users", async (req: Request, res: Response)=>{
  const users = await prisma.user.findMany();
  res.status(200).send(users)
})
