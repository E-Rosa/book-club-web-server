import express, { Request, Response } from "express";
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import authenticationRouter from "./src/routes/authentication";
import bookRouter from "./src/routes/book";
const prisma = new PrismaClient();

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", 86400)
  next();
});


app.use("/api/authentication", authenticationRouter);
app.use("/api/books", bookRouter)

app.listen(4000, () => {
  console.log("server listening on port 4000");
});

app.all("/", (req: Request, res: Response)=>{
    res.sendStatus(404)
})

