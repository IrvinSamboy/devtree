import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const validateUrl = (url: string) => {
    try {
        new URL(url)
        return true
    }
    catch {
        return false
    }
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
