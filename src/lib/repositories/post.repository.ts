import { PrismaClient, Post } from "@prisma/client";
import { BaseRepository } from "../prisma/prisma-abstarct-repository";

export class PostRepository extends BaseRepository<Post> {
  constructor(prisma: PrismaClient) {
    super(prisma.post, prisma);
  }

  async findByTitle(title: string) {
    return this.model.findMany({
      where: {
        title: { contains: title, mode: "insensitive" },
      },
    });
  }
}
