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
  static async createUnauthorizedUser(
    email: string,
    password: string,
    name: string
  ) {
    try {
      return await prisma.unauthorizedUser.create({
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
  static async acceptSignup(email: string) {
    try {
      const unauthorizedUser = await prisma.unauthorizedUser.delete({
        where: { email: email },
      });
      return await prisma.user.create({
        data: {
          email: email,
          name: unauthorizedUser.name,
          password: unauthorizedUser.password,
          id: unauthorizedUser.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async checkEmailAvailability(email: string) {
    try {
      const isEmailUsed = await prisma.user.findFirst({
        where: { email: email },
      });
      if (isEmailUsed != null) {
        throw new Error("email in use");
      }
    } catch (error) {
      throw error;
    }
  }
  static async makeAdmin(userId: string) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { isAdmin: true 
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async getSignupRequests(){
    try{
      return await prisma.unauthorizedUser.findMany();
    }
    catch (error){
      throw error
    }
  }
  static async deleteUnauthorizedUser(email: string){
    try{
      return await prisma.unauthorizedUser.delete({
        where:{email: email}
      })
    }
    catch (error){
      throw error
    }
  }
}

export default UserRepo;
