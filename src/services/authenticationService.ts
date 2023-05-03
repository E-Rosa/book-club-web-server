import { createHash } from "crypto";
import { UserPayload } from "../interfaces/interfaces";
import {verify} from 'jsonwebtoken'

class AuthenticationService {
  static hashPassword(password: string): string {
    return createHash("sha256")
      .update(password + process.env.SECRET_KEY)
      .digest("hex");
  }
  static authenticate(authorizationHeader: any): UserPayload{
    try{  
      if(typeof authorizationHeader != "string" || !authorizationHeader.includes("Bearer")){
        throw new Error("authorizationHeader invalid")
      }
      const token = authorizationHeader.split(" ")[1];
      const verifyResult = verify(token, process.env.SECRET_KEY as string) as UserPayload;
      const {id, email} =  verifyResult;
      if(!id || !email){
        throw new Error("authorizationHeader invalid - not ID or email extracted from verify()")
      }
      return {id: id, email: email}
    }
    catch (error){
      throw new Error('authenticate failed')
    }
 
  }
}

export { AuthenticationService };
