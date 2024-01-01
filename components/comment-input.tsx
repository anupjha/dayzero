'use client';

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { FormSubmit } from "./form/form-submit";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { createComment } from "@/actions/create-comment";
import { useQueryClient } from "@tanstack/react-query";
import { ElementRef, useRef, useState } from "react";
import RichTextEditor from "./wysiwyg/rich-text-editor";

interface CommentInputProps {
  cardId: string;
};

export const CommentInput = ({
  cardId,
}: CommentInputProps) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const queryClient = useQueryClient();
  const formRef = useRef<ElementRef<"form">>(null);
  const [ content, setContent ] = useState('');

  const { execute, fieldErrors } = useAction(createComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card-comments", cardId]
      });
      formRef.current?.reset();
      toast.success(`comment created`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
 
  const onSubmit = (formData: FormData) => {
    const body = content;

    execute({
      body,
      cardId,
    })
  }

  if (!isSignedIn || !isLoaded) {
    return null;
  }
  
  return (
    <div className="flex">
      <Avatar className="h-8 w-8 m-1">
        <AvatarImage src={user.imageUrl} />
      </Avatar>
      <div className="flex flex-col w-full">
        <form
          action={onSubmit}
          className="space-y-2"
          ref={formRef}
        >
          <RichTextEditor value={content} onChange={setContent} />
          <div className="flex items-center gap-x-2">
            <FormSubmit>
              Comment
            </FormSubmit>
          </div>
        </form>
      </div>
    </div>
  );
};
