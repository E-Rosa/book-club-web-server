import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { AuthenticationService } from "../services/authenticationService";

class UserRepo {
  static async getUserByEmailAndPassword(email: string, password: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: email, password: password },
      });
      if (user == null) {
        throw new Error("could not get user by email and password");
      }
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  static async getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: email },
      });
      if (user == null) {
        throw new Error("could not get user by email");
      }
      return user;
    } catch (error) {
      throw new Error("could not get user by email");
    }
  }
  static async createUser(email: string, password: string, name: string) {
    try {
      return await prisma.user.create({
        data: {
          email: email,
          password: AuthenticationService.hashPassword(password),
          name: name,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepo;
