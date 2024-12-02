import { getAllBackupDatabase } from "@/actions/backup_database";
import { useQuery } from "@tanstack/react-query";

export function useGetBackupDatabase() {
  return useQuery({
    queryFn: async () => getAllBackupDatabase(),
    queryKey: ["backupDatabase"],
  });
}
