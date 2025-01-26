import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { PostRepository } from "@/lib/repositories/post.repository";

const prisma = new PrismaClient();
const postRepository = new PostRepository(prisma);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryObject = req.query;
  const options = {
    DEFAULT_LIMIT: "10",
    VALUE_DELIMITER: ",",
    LOOKUP_DELIMITER: "||",
    CONDITION_DELIMITER: ";",
    CONTAINS: "$cont",
    EXACT: "$eq",
    GT: "$gt",
    LT: "$lt",
  };

  try {
    const paginatedPosts = await postRepository.findPaginated(
      queryObject as any,
      options
    );
    return res.status(200).json(paginatedPosts);
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
