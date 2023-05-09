import { PrismaClient, Tag } from "@prisma/client";
const prisma = new PrismaClient();

class TagRepo {
  static async createTag(name: string) {
    return await prisma.tag.create({
      data: { name: name },
    });
  }
  static async getTagIdByName(name: string) {
    try {
      const result = await prisma.tag.findFirst({
        where: { name: name },
        select: { id: true },
      });
      if (result == null) {
        throw new Error("cant get tag id by name");
      }
      return result.id
    } catch (error) {
      throw error;
    }
  }
}

export default TagRepo;
