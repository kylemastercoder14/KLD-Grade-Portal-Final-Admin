/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { AnnouncementValidator } from "@/functions/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveAnnouncement } from "@/data/announcement";

const AnnouncementForm = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {
  const title = initialData ? "Edit Announcement" : "Add Announcement";
  const description = initialData
    ? "Make sure to click save changes after you update the announcement."
    : "Please fill the required fields to add a new announcement.";
  const action = initialData ? "Save Changes" : "Save Announcement";
  const form = useForm<z.infer<typeof AnnouncementValidator>>({
    resolver: zodResolver(AnnouncementValidator),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
          image: initialData.image || "",
        }
      : {
          name: "",
          description: "",
          image: "",
        },
  });

  const { mutate: saveAnnouncement, isPending: isSaving } =
    useSaveAnnouncement(initialData);

  async function onSubmit(values: z.infer<typeof AnnouncementValidator>) {
    saveAnnouncement(values, {
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
                  fieldType={FormFieldType.INPUT}
                  placeholder="Enter Title"
                  label="Title"
                  isRequired={true}
                  name="name"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.TEXTAREA}
                  placeholder="Enter Description"
                  label="Description"
                  isRequired={true}
                  name="description"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.DROP_ZONE}
                  label="Image"
                  isRequired={false}
                  name="image"
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

export default AnnouncementForm;
