import express, { Request, Response } from "express";
import { createUser } from "./dbscript";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const app = express();

app.use(express.json())
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
  req.setTimeout(10000);
  const {name, email, password} = req.body
  const newUser = await prisma.user.create({data:{name:name,  email:email, password:password}})
  await prisma.$disconnect()
  res.status(200).send(newUser)
})
app.get("/users", async (req: Request, res: Response)=>{
  req.setTimeout(10000);
  const users = await prisma.user.findMany();
  await prisma.$disconnect();
  res.status(200).send(users)
})
