/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { AssignCourseTeacherValidator } from "@/functions/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveAssignCourseTeacher } from "@/data/assign-course-teacher";

const AssignCourseTeacherForm = ({
  initialData,
  onClose,
  teacher,
  section,
  course
}: {
  initialData: any;
  onClose: () => void;
  teacher: { label: string; value: string }[];
  section: { label: string; value: string }[];
  course: { label: string; value: string }[];
}) => {
  const title = initialData ? "Edit Course Teacher" : "Assign Course Teacher";
  const description = initialData
    ? "Make sure to click save changes after you update the course teacher."
    : "Please fill the required fields to assign a new course teacher.";
  const action = initialData ? "Save Changes" : "Save Course Teacher";
  const form = useForm<z.infer<typeof AssignCourseTeacherValidator>>({
    resolver: zodResolver(AssignCourseTeacherValidator),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
          teacher: initialData.teacherId,
          section: initialData.sectionId,
          course: initialData.courseId,
        }
      : {
          name: "",
          section: [],
          teacher: "",
          course: []
        },
  });

  const { mutate: assignCourseTeacher, isPending: isSaving } =
    useSaveAssignCourseTeacher(initialData);

  async function onSubmit(values: z.infer<typeof AssignCourseTeacherValidator>) {
    assignCourseTeacher(values, {
      onSuccess: () => {
        onClose();
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
                {initialData ? (
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
                ) : (
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.MULTISELECT}
                    placeholder="Select Section"
                    label="Section"
                    dynamicOptions={section}
                    isRequired={true}
                    name="section"
                    disabled={isSaving}
                  />
                )}
                {initialData ? (
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.SELECT}
                    placeholder="Select Course"
                    label="Course"
                    dynamicOptions={course}
                    isRequired={true}
                    name="course"
                    disabled={isSaving}
                  />
                ) : (
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.MULTISELECT}
                    placeholder="Select Course"
                    label="Course"
                    dynamicOptions={course}
                    isRequired={true}
                    name="course"
                    disabled={isSaving}
                  />
                )}
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

export default AssignCourseTeacherForm;
