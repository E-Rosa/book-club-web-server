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
      const {id, email, isAdmin} =  verifyResult;
      if(!id || !email){
        throw new Error("authorizationHeader invalid - not ID or email extracted from verify()")
      }
      return {id: id, email: email, isAdmin: isAdmin}
    }
    catch (error){
      throw new Error('authenticate failed')
    }
  }
  static authenticateAdmin(authorizationHeader: any): UserPayload{
    try{  
      if(typeof authorizationHeader != "string" || !authorizationHeader.includes("Bearer")){
        throw new Error("authorizationHeader invalid")
      }
      const token = authorizationHeader.split(" ")[1];
      const verifyResult = verify(token, process.env.SECRET_KEY as string) as UserPayload;
      const {id, email, isAdmin} =  verifyResult;
      if(!id || !email){
        throw new Error("authorizationHeader invalid - not ID or email extracted from verify()")
      }
      if(!isAdmin){
        throw new Error("authorizationHeader invalid - not admin")
      }
      return {id: id, email: email, isAdmin: isAdmin}
    }
    catch (error: any){
      throw new Error('authenticate failed '+ error.message)
    }
 
  }
}

export { AuthenticationService };
