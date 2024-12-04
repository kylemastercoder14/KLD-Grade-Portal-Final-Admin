import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { BadgeCheck, BadgeX, LibraryBig, Users } from "lucide-react";
import PassingPieChart from "@/components/globals/passing-pie-chart";
import TopLeaderboards from "@/components/globals/top-leaderboards";
import { Programs, Students } from "@prisma/client";

interface OtherProps extends Students {
  programs: Programs;
}

interface StudentGWA {
  studentNumber: string;
  student: Students;
  totalGrade: number;
  subjectCount: number;
}

const Dashboard = async () => {
  const students = await db.students.findMany({
    include: {
      programs: true,
    },
  });
  const assignedAdvisers = await db.assignTeacher.findMany();
  const grades = await db.grades.findMany();

  const totalGrades = grades.length;
  const passingCount = grades.filter(
    (grade) => grade.remarks === "PASSED"
  ).length;
  const failingCount = grades.filter(
    (grade) => grade.remarks === "FAILED"
  ).length;

  const passingRate =
    totalGrades > 0 ? ((passingCount / totalGrades) * 100).toFixed(2) : "0";
  const failingRate =
    totalGrades > 0 ? ((failingCount / totalGrades) * 100).toFixed(2) : "0";

  const instituteData = Array.from(
    new Set(grades.map((grade) => grade.programCode))
  ).map((programCode) => {
    const instituteStudents = students.filter(
      (student: OtherProps) => student.programs.code === programCode
    );
    const instituteGrades = grades.filter((grade) =>
      instituteStudents.some(
        (student) => student.studentNumber === grade.studentNumber
      )
    );

    const totalGrades = instituteGrades.length;
    const passingCount = instituteGrades.filter(
      (grade) => grade.remarks === "PASSED"
    ).length;

    const passingRate =
      totalGrades > 0 ? ((passingCount / totalGrades) * 100).toFixed(2) : "0";

    return {
      institute: programCode,
      passingRate: parseFloat(passingRate),
    };
  });

  const topStudentsData = await db.grades.findMany({
    where: {
      remarks: "PASSED",
    },
    orderBy: {
      grade: "asc",
    },
    take: 50,
    include: {
      student: true,
    },
  });

  // Define accumulator with explicit types
  const studentGWA = topStudentsData.reduce<Record<string, StudentGWA>>(
    (acc, grade) => {
      if (!acc[grade.studentNumber]) {
        acc[grade.studentNumber] = {
          studentNumber: grade.studentNumber,
          student: grade.student,
          totalGrade: 0,
          subjectCount: 0,
        };
      }

      // Sum the grades and count the number of subjects
      acc[grade.studentNumber].totalGrade += grade.grade;
      acc[grade.studentNumber].subjectCount += 1;

      return acc;
    },
    {}
  );

  const gwaData = Object.values(studentGWA).map((student) => ({
    ...student,
    gwa: student.totalGrade / student.subjectCount, // Calculate the GWA
  }));

  // Sort by GWA in descending order to get the top students
  const topStudents = gwaData.sort((a, b) => b.gwa - a.gwa).slice(0, 10);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              The total number of students currently enrolled in the system.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
            <BadgeCheck />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passingRate}%</div>
            <p className="text-xs text-muted-foreground">
              Percentage of students who have successfully passed their courses.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failing Rate</CardTitle>
            <BadgeX />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failingRate}%</div>
            <p className="text-xs text-muted-foreground">
              Percentage of students who did not meet the passing criteria.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Advisory Classes
            </CardTitle>
            <LibraryBig />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedAdvisers.length}</div>
            <p className="text-xs text-muted-foreground">
              Total number of advisory classes assigned to teachers.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-10 grid-cols-1">
        <div className="col-span-6">
          <PassingPieChart data={instituteData} />
        </div>
        <div className="col-span-4">
          <TopLeaderboards data={topStudents} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
