import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { BadgeCheck, BadgeX, LibraryBig, Users } from "lucide-react";

const Dashboard = async () => {
  const students = await db.students.findMany();
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
    totalGrades > 0 ? ((passingCount / totalGrades) * 100).toFixed(2) : 0;
  const failingRate =
    totalGrades > 0 ? ((failingCount / totalGrades) * 100).toFixed(2) : 0;
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
    </>
  );
};

export default Dashboard;
