import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class MeetingRepo {
  static async createMeeting(
    hostId: string,
    date: Date,
    bookTitle: string,
    address: string,
    description: string
  ) {
    try {
      return await prisma.meeting.create({
        data: {
          hostId: hostId,
          date: date,
          bookTitle: bookTitle,
          address: address,
          description: description,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async getMeetingsPaginated(skip: number) {
    try {
      return await prisma.meeting.findMany({
        skip: skip,
        take: 10,
        orderBy: {
          date: "desc",
        },
        include: {
          participants: {
            select: {
              name: true,
              email: true,
            },
          },
          host:{
            select:{
              name: true,
              email: true
            }
          }
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async getMeetingsCount(){
    try{
      return await prisma.meeting.count()
    }
    catch(error){
      throw error
    }
  }
  static async editMeeting(
    id: string,
    date: Date,
    bookTitle: string,
    address: string,
    description: string
  ) {
    try {
      return await prisma.meeting.update({
        where: { id: id },
        data: {
          date: date,
          bookTitle: bookTitle,
          address: address,
          description: description,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async deleteMeeting(id: string){
    try{
        return await prisma.meeting.delete({
            where:{id:id}
        })
    }
    catch (error){
        throw error
    }
  }
}   
export default MeetingRepo;