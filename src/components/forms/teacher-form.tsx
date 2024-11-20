"use client";

import { useAddressData } from "@/functions/address-selection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Teachers } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import Heading from "../ui/heading";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { TeacherValidator } from "@/functions/validators/teacher";
import { useSaveTeacher } from "@/data/teacher";

const TeacherForm = ({ initialData }: { initialData: Teachers | null }) => {
  const router = useRouter();
  const title = initialData
    ? "Edit Teacher Information"
    : "Add Teacher Information";
  const description = initialData
    ? "Make sure to click save changes after you update the teacher."
    : "Please fill the required fields to add a new teacher.";
  const action = initialData ? "Save Changes" : "Save Teacher";

  const form = useForm<z.infer<typeof TeacherValidator>>({
    resolver: zodResolver(TeacherValidator),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
          middleName: initialData?.middleName ?? "",
          extensionName: initialData?.extensionName ?? "",
          profileImage: initialData?.profileImage ?? "",
          maritalStatus: initialData?.civilStatus ?? "",
          municipality: initialData?.city ?? "",
          barangay: initialData?.barangay ?? "",
        }
      : {
          employeeNumber: "",
          firstName: "",
          middleName: "",
          lastName: "",
          extensionName: "",
          birthDate: "",
          age: "",
          gender: "",
          maritalStatus: "",
          phoneNumber: "",
          region: "CALABARZON",
          province: "Cavite",
          municipality: "",
          barangay: "",
          houseNumber: "",
          zipCode: "",
          email: "",
          password: "12345678",
          profileImage: "",
          position: "",
        },
  });

  const { mutate: saveTeacher, isPending: isLoading } =
    useSaveTeacher(initialData);

  async function onSubmit(values: z.infer<typeof TeacherValidator>) {
    saveTeacher(values, {
      onSuccess: () => router.push("/admin/teacher"),
    });
  }

  const selectedRegionName = form.watch("region");
  const selectedProvinceName = form.watch("province");
  const selectedMunicipalityName = form.watch("municipality");

  const {
    regionOptions,
    provinceOptions,
    municipalityOptions,
    barangayOptions,
  } = useAddressData(
    selectedRegionName,
    selectedProvinceName,
    selectedMunicipalityName
  );
  return (
    <Form {...form}>
      <Heading title={title} description={description} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
          <CustomFormField
            label="Employee Number"
            name="employeeNumber"
            placeholder="Enter employee number"
            isRequired
            fieldType={FormFieldType.INPUT}
            control={form.control}
            disabled={isLoading}
          />
          <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
            <CustomFormField
              label="First Name"
              name="firstName"
              placeholder="Juan"
              isRequired
              type="text"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Middle Name"
              name="middleName"
              placeholder="Santiago"
              isRequired={false}
              type="text"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Last Name"
              name="lastName"
              placeholder="Dela Cruz"
              isRequired
              type="text"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Extension Name"
              name="extensionName"
              placeholder="JR, SR, III"
              isRequired={false}
              type="text"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
          </div>
          <CustomFormField
            label="Email Address"
            name="email"
            placeholder="jdelacruz@kld.edu.ph"
            isRequired
            type="email"
            fieldType={FormFieldType.INPUT}
            control={form.control}
            disabled={isLoading}
          />
          <CustomFormField
            label="Phone Number"
            name="phoneNumber"
            type="phone"
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            disabled={isLoading}
            isRequired
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomFormField
              label="Date of Birth"
              name="birthDate"
              placeholder="dd/mm/yyyy"
              isRequired
              type="date"
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Age"
              name="age"
              placeholder="Enter age"
              isRequired
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomFormField
              label="Sex"
              name="gender"
              placeholder="Select your sex"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              options={["Male", "Female"]}
              disabled={isLoading}
            />
            <CustomFormField
              label="Marital Status"
              name="maritalStatus"
              placeholder="Select your marital status"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              options={["Single", "Married", "Separated", "Widowed"]}
              disabled={isLoading}
            />
          </div>
          <CustomFormField
            label="House/Unit/Block No., Street, Subdivision/Village"
            name="houseNumber"
            placeholder="Blk 1 Lot 2 Phase 3"
            isRequired
            fieldType={FormFieldType.INPUT}
            type="text"
            control={form.control}
            disabled={isLoading}
          />
          <CustomFormField
            label="Region"
            name="region"
            placeholder="Select your region"
            isRequired
            fieldType={FormFieldType.SELECT}
            control={form.control}
            dynamicOptions={regionOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            disabled
          />
          <CustomFormField
            label="Province"
            name="province"
            placeholder="Select your province"
            isRequired
            fieldType={FormFieldType.SELECT}
            control={form.control}
            dynamicOptions={provinceOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            disabled
          />
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
            <CustomFormField
              label="Municipality"
              name="municipality"
              placeholder="Select your municipality"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={municipalityOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              disabled={isLoading}
            />
            <CustomFormField
              label="Barangay"
              name="barangay"
              placeholder="Select your barangay"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={barangayOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              disabled={isLoading || !selectedMunicipalityName}
            />
            <CustomFormField
              label="Zip Code"
              name="zipCode"
              placeholder="4114"
              isRequired
              fieldType={FormFieldType.INPUT}
              type="text"
              control={form.control}
              disabled={isLoading}
            />
          </div>
          <CustomFormField
            label="Position"
            name="position"
            placeholder="Select your position"
            isRequired
            fieldType={FormFieldType.SELECT}
            control={form.control}
            options={[
              "Professor",
              "Program Chair",
              "Associate Dean",
              "Dean",
            ]}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="mt-3 md:w-auto w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default TeacherForm;
