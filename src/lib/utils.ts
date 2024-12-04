import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAddress(address: string) {
  const addressParts = address.split(", ").map((part) => part.trim());

  // Check if we have at least four parts
  if (addressParts.length < 4) {
    return {
      houseNumber: "",
      region: "",
      province: "",
      municipality: "",
      barangay: "",
    };
  }

  const [barangay, municipality, province, region] = addressParts.slice(-4);
  const houseNumber = addressParts.slice(0, -4).join(" ");

  return {
    houseNumber,
    region,
    province,
    municipality,
    barangay,
  };
}

export function formatDateWithSuffix(date: Date) {
  const day = date.getDate();
  const month = format(date, "MMMM");
  const year = format(date, "yyyy");

  // Determine the suffix
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} day of ${month} ${year}`;
}
