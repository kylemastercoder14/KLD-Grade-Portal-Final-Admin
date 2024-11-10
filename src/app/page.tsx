import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoginComponent from "@/components/forms/login-form";
import { ModeToggle } from "@/components/globals/mode-toggle";

const Home = () => {
  return (
    <div className="flex flex-col relative h-screen items-center justify-center bg-[url('/images/school.jpg')] bg-no-repeat bg-cover">
      <div className="overlay fixed bg-black/60 w-full h-full backdrop-blur-sm"></div>
      <div className="absolute bottom-3 right-3 z-50 bg-white dark:bg-black p-1 rounded-full">
        <ModeToggle />
      </div>
      <div className="z-10 relative">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/kld-logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <p className="text-2xl text-white text-center font-bold">
            KLD Student Portal
          </p>
        </div>
        <p className="bg-black/40 text-center text-white px-5 py-1 rounded-md mt-3">
          Log in to view your grades, access academic advising tools, and stay
          updated on your educational journey.
        </p>
        <Card className="mt-5">
          <CardContent className="p-5">
            <LoginComponent />
          </CardContent>
        </Card>
        <p className="bg-black/40 text-center text-white px-5 py-1 rounded-md mt-3">
          <span className="text-emerald-300 font-semibold">
            Kolehiyo ng Lungsod ng Dasmarinas
          </span>{" "}
          | &copy; 2024. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Home;
