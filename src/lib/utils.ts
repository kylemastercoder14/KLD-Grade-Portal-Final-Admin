import { clsx, type ClassValue } from "clsx";
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
