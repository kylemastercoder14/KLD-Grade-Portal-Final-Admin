"use client";

import React, { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

type JsonData = Record<string, unknown>[];

export const parseExcelFile = async (file: File): Promise<JsonData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Get the first sheet name
      const sheetName = workbook.SheetNames[2];

      // Convert the sheet to JSON
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

      resolve(jsonData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const Test = () => {
  const [excelData, setExcelData] = useState<JsonData | null>(null);
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const data = await parseExcelFile(file);
      setExcelData(data);
    }
  };
  return (
    <>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <pre>{JSON.stringify(excelData, null, 2)}</pre>
    </>
  );
};

export default Test;
