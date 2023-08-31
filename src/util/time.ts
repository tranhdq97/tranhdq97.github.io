import { IFTimeDiff } from "@/interfaces/common";
import { addPaddingNumber, concatList } from "./common";

export function untilNow(fromDate: Date): IFTimeDiff | null {
  if (!fromDate) return null;
  const now = Date.now();
  const mockTime = new Date(fromDate).getTime();
  const diff = now - mockTime;
  const diffDays = Math.floor(diff / 86400000);
  const diffHours = Math.floor((diff % 86400000) / 3600000);
  const diffMins = Math.floor(((diff % 86400000) % 3600000) / 60000);
  const diffSecs = Math.floor((((diff % 86400000) % 3600000) % 60000) / 1000);
  return {
    diffDays: diffDays,
    diffHours: diffHours,
    diffMins: diffMins,
    diffSecs: diffSecs,
  };
}

export function toTime(time: Date | undefined): string {
  if (!time) return "";
  return new Date(time).toTimeString().split(" ")[0];
}

export function toDMY(time: Date, factor: string): string {
  if (!time) return "";
  const dateTime = new Date(time);
  return concatList(
    [
      addPaddingNumber(dateTime.getDay(), 2),
      addPaddingNumber(dateTime.getMonth(), 2),
      dateTime.getFullYear(),
    ],
    factor
  );
}
