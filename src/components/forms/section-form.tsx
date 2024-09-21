/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { SectionValidators } from "@/functions/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { generateSectionName } from "@/functions/generate-section";
import { useSaveSection } from "@/data/sections";

const SectionForm = ({
  initialData,
  onClose,
  yearLevelData,
  programData,
}: {
  initialData: any;
  onClose: () => void;
  yearLevelData: { label: string; value: string }[];
  programData: { label: string; value: string; code: string }[];
}) => {
  const title = initialData ? "Edit Section" : "Add Section";
  const description = initialData
    ? "Make sure to click save changes after you update the section."
    : "Please fill the required fields to add a new section.";
  const action = initialData ? "Save Changes" : "Save Section";
  const form = useForm<z.infer<typeof SectionValidators>>({
    resolver: zodResolver(SectionValidators),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
          yearLevel: initialData.yearLevelId,
          program: initialData.programId,
        }
      : {
          name: "",
          yearLevel: "",
          program: "",
        },
  });

  const selectedYearLevel = form.watch("yearLevel");
  const selectedProgram = form.watch("program");

  const sectionName = generateSectionName(
    selectedYearLevel,
    selectedProgram,
    yearLevelData,
    programData
  );

  useEffect(() => {
    if (!initialData) {
      form.setValue("name", sectionName);
    }
  }, [sectionName, form, initialData]);

  const { mutate: saveSection, isPending: isSaving } =
    useSaveSection(initialData);

  async function onSubmit(values: z.infer<typeof SectionValidators>) {
    saveSection(values, {
      onSuccess: () => onClose(),
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
                  placeholder="Select Year Level"
                  label="Year Level"
                  dynamicOptions={yearLevelData}
                  isRequired={true}
                  name="yearLevel"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.SELECT}
                  placeholder="Select Program"
                  label="Program"
                  dynamicOptions={programData}
                  isRequired={true}
                  name="program"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="BSIS405"
                  label="Name"
                  isRequired={true}
                  name="name"
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

export default SectionForm;
