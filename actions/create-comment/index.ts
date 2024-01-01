"use server";

import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateComment } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  const { body, cardId } = data;

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const comment = await db.comment.create({
      data: {
        body,
        cardId,
        userId,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
    return { data: comment };
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }
};

export const createComment = createSafeAction(CreateComment, handler);
