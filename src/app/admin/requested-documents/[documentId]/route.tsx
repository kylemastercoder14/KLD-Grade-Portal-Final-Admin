/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/lib/db";
import { NextResponse } from "next/server";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  renderToStream,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { DocumentRequest, Grades, Programs, Students } from "@prisma/client";
import { formatDateWithSuffix } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
    textDecoration: "underline",
  },
  studentInfo: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 20,
  },
  table: {
    display: "flex",
    width: "100%",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    textAlign: "center",
  },
  lastCell: {
    borderRightWidth: 0, // Remove the right border for the last cell
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
  footer: {
    fontSize: 12,
    marginTop: 10,
    marginLeft: 70,
  },
  footerName: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  flexColCenter: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 30,
  }
});

interface DocumentProps extends DocumentRequest {
  student: Students;
  programs: Programs;
  grades: Grades[];
}

const DocumentComponent = ({ document }: { document: DocumentProps }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>CERTIFICATE OF GRADES</Text>
        <Text style={styles.studentInfo}>
          This is to certify that{" "}
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            {document.student.firstName} {document.student.lastName}
          </Text>{" "}
          is currently enrolled in this institution under the{" "}
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>{document.programs.name}</Text>{" "}
          program and has obtained the following grades:
        </Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.headerCell]}>
              Course Code
            </Text>
            <Text style={[styles.tableCell, styles.headerCell]}>
              Description
            </Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Grade</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Units</Text>
          </View>
          {document.grades.map((grade: any) => (
            <>
              <View key={grade.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{grade.course?.code}</Text>
                <Text style={styles.tableCell}>{grade.course?.name}</Text>
                <Text style={styles.tableCell}>{grade.grade}</Text>
                <Text style={styles.tableCell}>{grade.course?.unit}</Text>
              </View>
            </>
          ))}
        </View>
        <Text style={styles.studentInfo}>
          This certification has been issued upon the student&apos;s request for{" "}
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>{document.purpose}</Text>{" "}
          purposes only. Given this{" "}
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            {formatDateWithSuffix(new Date())}
          </Text>{" "}
          at Kolehiyo ng Lungsod ng Dasmariñas.
        </Text>
        <View style={styles.flexColCenter}>
          <Text style={styles.footerName}>
            MA. VICTORIA C. BALBIO, MAEd, MBA, LPT
          </Text>
          <Text style={styles.footer}>College Registrar</Text>
        </View>
      </Page>
    </Document>
  );
};

export async function GET(
  request: Request,
  { params }: { params: { documentId: string } }
) {
  if (!params.documentId) {
    return new NextResponse("Document ID is required", { status: 400 });
  }

  const document = await db.documentRequest.findFirst({
    where: {
      status: "Confirmed",
    },
    include: {
      student: {
        include: {
          programs: true,
          grades: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  if (!document) {
    return new NextResponse("Document not found", { status: 404 });
  }

  const stream = await renderToStream(
    <DocumentComponent
      document={{
        ...document,
        programs: document.student.programs,
        grades: document.student.grades,
      }}
    />
  );

  return new NextResponse(stream as unknown as ReadableStream);
}
