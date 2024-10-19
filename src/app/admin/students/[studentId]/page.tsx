import React from "react";
import db from "@/lib/db";
import StudentForm from "@/components/forms/student-form";

const StudentPage = async ({ params }: { params: { studentId: string } }) => {
  const student = await db.students.findUnique({
    where: {
      id: params.studentId,
    },
  });

  return (
    <div className="flex-1 space-y-4">
      <StudentForm initialData={student} />
    </div>
  );
};

export default StudentPage;
