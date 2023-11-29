"use client";

import { useRef } from "react";
import { savePostForm } from "@/db/actions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      className="flex flex-col gap-4"
      action={async (formData) => {
        await savePostForm(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <Input
        type="text"
        name="title"
        aria-label="Your title"
        placeholder="Title"
      />
      <Textarea
        name="body"
        cols={30}
        rows={4}
        aria-label="Your message"
        placeholder="Message"
      />
      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Submit post
    </Button>
  );
}

export default Form;
