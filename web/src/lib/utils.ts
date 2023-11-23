import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function catchError(err: any) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue :any) => {
      return issue.message;
    });
    // return toast(errors.join("\n"));
  } else if (err instanceof Error) {
    // return toast(err.message);
  } else {
    // return toast("Something went wrong, please try again later.");
  }
}
