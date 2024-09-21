/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";

export const generateSectionName = (
  selectedYearLevel: string,
  selectedProgram: string,
  yearLevelData: { label: string; value: string }[],
  programData: { label: string; value: string; code: string; }[]
) => {
  const [sectionName, setSectionName] = React.useState<string>("");

  React.useEffect(() => {
    // Find the selected year level label
    const yearLevel = yearLevelData.find(
      (level) => level.value === selectedYearLevel
    );

    // Find the selected program label
    const program = programData.find(
      (program) => program.value === selectedProgram
    );

    // Generate section name based on labels
    if (yearLevel && program) {
      const yearSuffix = yearLevel.label.replace(/\D/g, "");
      const newSectionName = `${program.code}${yearSuffix}`;
      setSectionName(newSectionName);
    } else {
      setSectionName("");
    }
  }, [selectedYearLevel, selectedProgram, yearLevelData, programData]);

  return sectionName;
};
