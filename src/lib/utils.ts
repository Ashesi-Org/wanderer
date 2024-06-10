import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const classnames = (...args: string[]): string => {
  return args.join(" ");
};


export const createSlug = (title: string): string => {
  return title
    .toLowerCase()                     
    .replace(/[^a-z0-9\s-]/g, '')      
    .replace(/\s+/g, '-')               
    .replace(/-+/g, '-')                
    .replace(/^-+|-+$/g, '');          
}


export const formatObjectAsString = (obj:any) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
};


export const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


export const validatePassword = (password: string) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return re.test(password);
};


export const isBrowser = typeof window !== "undefined";