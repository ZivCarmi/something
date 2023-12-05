"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { useFormStatus } from "react-dom";
import { updatePost } from "@/db/actions";
import { Dispatch, SetStateAction } from "react";

type EditProps = {
  post: Post;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const EditDialog: React.FC<EditProps> = ({ post, open, setOpen }) => {
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <Input
              name="title"
              defaultValue={post.title}
              className="text-2xl"
            />
            <Textarea name="body" defaultValue={post.body} />
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Save changes
    </Button>
  );
};

export default EditDialog;
