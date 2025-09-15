import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export {cn,pb}
