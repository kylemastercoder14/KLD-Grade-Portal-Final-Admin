import Image from "next/image";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <Image
        src="/images/under-construction.png"
        alt="Maintenance"
        width={300}
        height={300}
      />
      <h1 className="text-5xl font-bold">Dashboard Page</h1>
      <p className="text-md mt-2 text-muted-foreground">
        This page is under construction. We are working hard to bring you new
        features. Please check back soon!
      </p>
    </div>
  );
};

export default Dashboard;