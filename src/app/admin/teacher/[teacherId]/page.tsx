import React from "react";
import db from "@/lib/db";
import TeacherForm from "@/components/forms/teacher-form";

const TeacherPage = async ({ params }: { params: { teacherId: string } }) => {
  const teachers = await db.teachers.findUnique({
    where: {
      id: params.teacherId,
    },
  });

  return (
    <div className="flex-1 space-y-4">
      <TeacherForm initialData={teachers} />
    </div>
  );
};

export default TeacherPage;
