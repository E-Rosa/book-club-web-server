import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function createUser(){
  return await prisma.user.create({
    data:{
      name:"Elias Rosa",
      email:"elias_rrosa@Hotmail.com",
      password:"goodpass"
    }
  })
}

async function main(){
  const users = await prisma.user.deleteMany()
}
main()
    .then((result)=>[console.log(result)])
    .catch(e=>{console.log(e)})
    .finally(async()=>{await prisma.$disconnect()})

export {createUser}

