import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserRepo {
  static async getUserByEmailAndPassword(email: string, password: string) {
    try {
      const user  = await prisma.user.findFirst({
        where: { email: email, password: password },
      });
      if(user == null){
        throw new Error("could not get user by email and password")
      }
      await prisma.$disconnect()
      return user
    } catch (error: any) {
      await prisma.$disconnect()
      throw new Error("could not get user by email and password - " + JSON.stringify(error));
    }
  }
  static async getUserByEmail(email: string) {
    try {
      const user  = await prisma.user.findFirst({
        where: { email: email },
      });
      if(user == null){
        throw new Error("could not get user by email")
      }
      await prisma.$disconnect()
      return user
    } catch (error) {
      await prisma.$disconnect()
      throw new Error("could not get user by email");
    }
  }
}

export default UserRepo;
