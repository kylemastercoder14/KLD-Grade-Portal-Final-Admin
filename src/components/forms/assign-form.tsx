/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { AssignAdviserValidator } from "@/functions/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveAssignAdviser } from "@/data/assign-adviser";

const AssignAdviserForm = ({
  initialData,
  onClose,
  teacher,
  section,
}: {
  initialData: any;
  onClose: () => void;
  teacher: { label: string; value: string }[];
  section: { label: string; value: string }[];
}) => {
  const title = initialData ? "Edit Assign Adviser" : "Assign Adviser";
  const description = initialData
    ? "Make sure to click save changes after you update the section."
    : "Please fill the required fields to assign a new adviser.";
  const action = initialData ? "Save Changes" : "Save Assign Adviser";
  const form = useForm<z.infer<typeof AssignAdviserValidator>>({
    resolver: zodResolver(AssignAdviserValidator),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
          section: initialData.sectionId,
          teacher: initialData.teacherId,
        }
      : {
          name: "",
          section: "",
          teacher: "",
        },
  });

  const { mutate: assignAdviser, isPending: isSaving } =
    useSaveAssignAdviser(initialData);

  async function onSubmit(values: z.infer<typeof AssignAdviserValidator>) {
    assignAdviser(values, {
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
                  fieldType={FormFieldType.SELECT}
                  placeholder="Select Teacher"
                  label="Teacher"
                  dynamicOptions={teacher}
                  isRequired={true}
                  name="teacher"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.SELECT}
                  placeholder="Select Section"
                  label="Section"
                  dynamicOptions={section}
                  isRequired={true}
                  name="section"
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

export default AssignAdviserForm;
