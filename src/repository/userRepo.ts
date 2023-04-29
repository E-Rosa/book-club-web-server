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
      return user
    } catch (error) {
      throw new Error("could not get user by email and password");
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
      return user
    } catch (error) {
      throw new Error("could not get user by email");
    }
  }
}

export default UserRepo;
