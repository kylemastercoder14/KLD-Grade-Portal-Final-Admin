import React from "react";
import db from "@/lib/db";
import StudentForm from "@/components/forms/student-form";

const StudentPage = async ({ params }: { params: { studentId: string } }) => {
  const student = await db.students.findUnique({
    where: {
      id: params.studentId,
    },
  });

  const yearLevel = await db.yearLevels.findMany({
    orderBy: {
      name: "asc"
    }
  })

  const programs = await db.programs.findMany({
    orderBy: {
      name: "asc"
    }
  })

  const sections = await db.sections.findMany({
    orderBy: {
      name: "asc"
    }
  })

  return (
    <div className="flex-1 space-y-4">
      <StudentForm initialData={student} yearLevel={yearLevel} programs={programs} sections={sections} />
    </div>
  );
};

export default StudentPage;
