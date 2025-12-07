import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Bangla Language Utilities
 * Centralized functions for Bangla number and date formatting
 */

/**
 * Convert numbers to Bangla numerals (০১২৩৪৫৬৭৮৯)
 */
export function toBanglaNumerals(num: number | string): string {
  const banglaNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(digit => banglaNumerals[parseInt(digit)] || digit).join('');
}

/**
 * Format file ID to Bangla format
 * Example: RNPL-1001 -> আরএনপিএল/১৪৩২/২০২৫/০০০১
 */
export function formatFileIdToBangla(fileId: string): string {
  const match = fileId.match(/(\d+)/);
  if (!match) return fileId;
  
  const num = parseInt(match[1]);
  const currentYear = new Date().getFullYear();
  const banglaYear = currentYear - 593; // Convert to Bangla year (1432 for 2025)
  
  const sequence = num.toString().padStart(4, '0');
  return `আরএনপিএল/${toBanglaNumerals(banglaYear)}/${toBanglaNumerals(currentYear)}/${toBanglaNumerals(sequence)}`;
}

/**
 * Format date to Bangla format
 * Example: 2025-12-07 -> ৭ ডিসেম্বর ২০২৫ খ্রিষ্টাব্দ
 */
export function formatDateToBangla(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const day = date.getDate();
  const monthNames = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return `${toBanglaNumerals(day)} ${month} ${toBanglaNumerals(year)} খ্রিষ্টাব্দ`;
}

/**
 * Get current date in Bangla format with day name
 * Example: রবিবার, ৭ ডিসেম্বর ২০২৫
 */
export function getCurrentDateBangla(): string {
  const date = new Date();
  const day = date.getDate();
  const dayNames = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const monthNames = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const dayName = dayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayName}, ${toBanglaNumerals(day)} ${month} ${toBanglaNumerals(year)}`;
}
