/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { CourseValidators } from "@/functions/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useGetCourses, useSaveCourse } from "@/data/courses";
import { toast } from "sonner";

const CourseForm = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {
  const { data: courseData, error } = useGetCourses();
  const title = initialData ? "Edit Course" : "Add Course";
  const description = initialData
    ? "Make sure to click save changes after you update the course."
    : "Please fill the required fields to add a new course.";
  const action = initialData ? "Save Changes" : "Save Course";
  const form = useForm<z.infer<typeof CourseValidators>>({
    resolver: zodResolver(CourseValidators),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          code: "",
          unit: 1,
          preRequisite: "",
        },
  });

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const { mutate: saveCourse, isPending: isSaving } =
    useSaveCourse(initialData);

  async function onSubmit(values: z.infer<typeof CourseValidators>) {
    saveCourse(values, {
      onSuccess: () => onClose(),
    });
  }

  const courseOptions = (courseData?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

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
              <div className="grid gap-3.5">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="Capstone II"
                  label="Name"
                  isRequired={true}
                  name="name"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="ISCP4102"
                  label="Code"
                  isRequired={true}
                  name="code"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="3"
                  label="Unit"
                  type="number"
                  isRequired={true}
                  name="unit"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.SELECT}
                  placeholder="Select a pre-requisite course"
                  dynamicOptions={courseOptions}
                  label="Pre-requisite"
                  isRequired={false}
                  name="preRequisite"
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

export default CourseForm;
