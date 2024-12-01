/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { YearLevelValidators } from "@/functions/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveYearLevel } from "@/data/year-level";

const YearLevelForm = ({
  initialData,
  onClose,
  isOpen
}: {
  initialData: any;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const title = initialData ? "Edit Year Level" : "Add Year Level";
  const description = initialData
    ? "Make sure to click save changes after you update the year level."
    : "Please fill the required fields to add a new year level.";
  const action = initialData ? "Save Changes" : "Save Year Level";
  const form = useForm<z.infer<typeof YearLevelValidators>>({
    resolver: zodResolver(YearLevelValidators),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
        },
  });

  const { mutate: saveYearLevel, isPending: isSaving } =
    useSaveYearLevel(initialData);

  async function onSubmit(values: z.infer<typeof YearLevelValidators>) {
    saveYearLevel(values, {
      onSuccess: () => {
        onClose();
        window.location.reload();
      },
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
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
                  placeholder="1st Year"
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

export default YearLevelForm;
