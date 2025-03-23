import PositionSelect from "@/components/FormSelectField"
import { Position } from "@/types/Position"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const positionsList: SelectValueProps<T>[] = [
  { value: Position.PG, label: "Point Guard" },
  { value: Position.SG, label: "Shooting Guard" },
  { value: Position.SF, label: "Small Forward" },
  { value: Position.PF, label: "Power Forward" },
  { value: Position.C, label: "Center" }
];