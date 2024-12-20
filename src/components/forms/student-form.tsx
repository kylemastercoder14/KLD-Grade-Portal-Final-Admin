"use client";

import { useSaveStudent } from "@/data/student";
import { useAddressData } from "@/functions/address-selection";
import { StudentValidator } from "@/functions/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Programs, Sections, Students, YearLevels } from "@prisma/client";
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

const StudentForm = ({
  initialData,
  yearLevel,
  programs,
  sections,
}: {
  initialData: Students | null;
  yearLevel: YearLevels[];
  programs: Programs[];
  sections: Sections[];
}) => {
  const router = useRouter();
  const title = initialData
    ? "Edit Student Information"
    : "Add Student Information";
  const description = initialData
    ? "Make sure to click save changes after you update the student."
    : "Please fill the required fields to add a new student.";
  const action = initialData ? "Save Changes" : "Save Student";

  const form = useForm<z.infer<typeof StudentValidator>>({
    resolver: zodResolver(StudentValidator),
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
          yearLevel: initialData?.yearLevelId ?? "",
          program: initialData?.programId ?? "",
          section: initialData?.sectionId ?? ""
        }
      : {
          studentNumber: "",
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
          elementarySchool: "",
          highSchool: "",
          yearLevel: "",
          program: "",
          section: "",
        },
  });

  const { mutate: saveStudent, isPending: isLoading } =
    useSaveStudent(initialData);

  async function onSubmit(values: z.infer<typeof StudentValidator>) {
    saveStudent(values, {
      onSuccess: () => router.push("/admin/students"),
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
            label="Student Number"
            name="studentNumber"
            placeholder="Enter student number"
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
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomFormField
              label="Elementary School"
              name="elementarySchool"
              placeholder="Dasmarinas II Central School"
              isRequired
              fieldType={FormFieldType.INPUT}
              type="text"
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="High School"
              name="highSchool"
              placeholder="Dasmarinas National High School"
              isRequired
              fieldType={FormFieldType.INPUT}
              type="text"
              control={form.control}
              disabled={isLoading}
            />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
            <CustomFormField
              label="Year Level"
              name="yearLevel"
              placeholder="Select your year level"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={yearLevel.map((option) => ({
                label: option.name,
                value: option.id,
              }))}
              disabled={isLoading}
            />
            <CustomFormField
              label="Program"
              name="program"
              placeholder="Select your program"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={programs.map((option) => ({
                label: option.name,
                value: option.id,
              }))}
              disabled={isLoading}
            />
            <CustomFormField
              label="Section"
              name="section"
              placeholder="Select your section"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={sections.map((option) => ({
                label: option.name,
                value: option.id,
              }))}
              disabled={isLoading}
            />
            <Button className="mt-2" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
              {action}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default StudentForm;
