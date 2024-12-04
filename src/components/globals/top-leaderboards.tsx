import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Students } from "@prisma/client";

interface TopLeaderboardsProps {
  studentNumber: string;
  student: Students;
  gwa: number;
}

const TopLeaderboards = ({ data }: { data: TopLeaderboardsProps[] }) => {
  return (
    <Card className="md:col-span-3 overflow-y-auto h-[53vh]">
      <CardHeader>
        <CardTitle className="text-[18px]">Top Students</CardTitle>
        <CardDescription>
          Recognizing outstanding students who consistently excel in academics,
          leadership, and overall performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 ">
          {data.map((student) => (
            <div className="flex items-center" key={student.studentNumber}>
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>
                  {student.student.firstName.charAt(0)}
                  {student.student.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {student.studentNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  {student.student.firstName} {student.student.lastName}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {student.gwa.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopLeaderboards;
