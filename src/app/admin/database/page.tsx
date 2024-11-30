"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const Database = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/backup");
      if (response.status === 200) {
        const { filePath } = response.data;
        console.log(filePath);
        toast.success("Backup completed successfully!");
      }
    } catch (error) {
      console.error("Error during backup:", error);
      toast.error("Backup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Database</h2>
      <Button onClick={handleBackup} disabled={isLoading}>
        {isLoading ? "Backing up..." : "Backup Database"}
      </Button>
    </div>
  );
};

export default Database;
