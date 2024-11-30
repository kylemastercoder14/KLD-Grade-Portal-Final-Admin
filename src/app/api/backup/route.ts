// @typescript-eslint/no-explicit-any
import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function POST() {
  try {
    // Define PostgreSQL connection parameters
    const PGHOST = process.env.PGHOST;
    const PGDATABASE = process.env.PGDATABASE;
    const PGUSER = process.env.PGUSER;
    const PGPASSWORD = process.env.PGPASSWORD; // This should be stored securely in environment variables
    const DEST = path.join(process.cwd(), "backups"); // Adjust path if needed for file storage

    // Create timestamp for the backup file
    const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "-");

    // Construct the backup command using pg_dump
    const backupFilePath = path.join(DEST, `${TIMESTAMP}.sql`);
    const dumpCommand = `set PGPASSWORD=${PGPASSWORD} && pg_dump --host=${PGHOST} --dbname=${PGDATABASE} --username=${PGUSER} --inserts --column-inserts --file=${backupFilePath}`;

    console.log(`Executing backup command: ${dumpCommand}`);

    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing backup: ${error.message}`);
        console.error(stderr);
        return new NextResponse("Internal error", { status: 500 });
      }

      // Successful backup
      console.log(`Backup completed: ${stdout}`);
      return new NextResponse("Backup successful", { status: 200 });
    });

    return new NextResponse("Backup request received", { status: 200 });
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}
