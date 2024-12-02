import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function POST() {
  try {
    // Get environment variables for PostgreSQL connection
    const PGHOST = process.env.PGHOST;
    const PGDATABASE = process.env.PGDATABASE;
    const PGUSER = process.env.PGUSER;
    const PGPASSWORD = process.env.PGPASSWORD;

    // Define the backup destination
    const DEST = path.join(process.cwd(), "backups");

    // Ensure the backups folder exists
    if (!fs.existsSync(DEST)) {
      fs.mkdirSync(DEST);
    }

    // Create timestamp for the backup file
    const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFilePath = path.join(DEST, `${TIMESTAMP}.sql`);

    // Construct the backup command using pg_dump
    const dumpCommand = `pg_dump --host=${PGHOST} --dbname=${PGDATABASE} --username=${PGUSER} --password=${PGPASSWORD} --inserts --column-inserts --file=${backupFilePath}`;

    console.log(`Executing backup command: ${dumpCommand}`);

    // Execute the command
    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing backup: ${error.message}`);
        console.error(stderr);
        return new NextResponse("Internal error", { status: 500 });
      }

      // Successful backup
      console.log(`Backup completed: ${stdout}`);
      return new NextResponse(JSON.stringify({ filePath: backupFilePath }), {
        status: 200,
      });
    });

    return new NextResponse("Backup request received", { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
