/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { SemesterValidator } from "@/functions/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveSemester } from "@/data/semester";

const SemesterForm = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {

  const title = initialData ? "Edit Semester" : "Add Semester";
  const description = initialData
    ? "Make sure to click save changes after you update the semester."
    : "Please fill the required fields to add a new semester.";
  const action = initialData ? "Save Changes" : "Save Semester";
  const form = useForm<z.infer<typeof SemesterValidator>>({
    resolver: zodResolver(SemesterValidator),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          year: ""
        },
  });

  const { mutate: saveSemester, isPending: isSaving } = useSaveSemester(
    initialData
  );

  async function onSubmit(values: z.infer<typeof SemesterValidator>) {
    saveSemester(values, {
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
                  placeholder="1st Semester"
                  label="Name"
                  isRequired={true}
                  name="name"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="2024 - 2025"
                  label="Year"
                  isRequired={true}
                  name="year"
                  disabled={isSaving}
                />
                <Button type="submit" disabled={isSaving} size="sm">
                  {isSaving && (
                    <Loader className="animate-spin w-4 h-4 mr-2" />
                  )}
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

export default SemesterForm;
