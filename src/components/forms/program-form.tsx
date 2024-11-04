/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { ProgramValidators } from "@/functions/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveProgram } from "@/data/programs";

const ProgramForm = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {
  const title = initialData ? "Edit Program" : "Add Program";
  const description = initialData
    ? "Make sure to click save changes after you update the program."
    : "Please fill the required fields to add a new program.";
  const action = initialData ? "Save Changes" : "Save Program";
  const form = useForm<z.infer<typeof ProgramValidators>>({
    resolver: zodResolver(ProgramValidators),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          code: "",
        },
  });

  const { mutate: saveProgram, isPending: isSaving } =
    useSaveProgram(initialData);

  async function onSubmit(values: z.infer<typeof ProgramValidators>) {
    saveProgram(values, {
      onSuccess: () => {
        onClose();
        window.location.reload();
      },
    });
  }

  return (
    <>
      <Modal
        isOpen={true}
        onClose={onClose}
        title={title}
        description={description}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto grid flex-1 auto-rows-max gap-4">
              <div className="grid gap-4">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="Bachelor of Science in Information System"
                  label="Name"
                  isRequired={true}
                  name="name"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="BSIS"
                  label="Code"
                  isRequired={true}
                  name="code"
                  disabled={isSaving}
                />
                <Button type="submit" disabled={isSaving} size="sm">
                  {isSaving && <Loader className="animate-spin w-4 h-4 mr-2" />}
                  {action}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default ProgramForm;
