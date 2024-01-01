import { z } from "zod";

export const CreateComment = z.object({
  body: z.string({
    required_error: "Body is required",
    invalid_type_error: "Body is required",
  }),
  cardId: z.string(),
});
