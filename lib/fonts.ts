import { Inter, Tiro_Bangla, Playfair_Display, Dancing_Script } from 'next/font/google';

// Inter for Latin/English text - primary font for the app
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Tiro Bangla for Bengali text - loaded with bengali subset only
// The 'bengali' subset restricts the font to only Bengali glyphs
export const tiroBangla = Tiro_Bangla({
  weight: ['400'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-tiro-bangla',
  // Preload only Bengali subset
  preload: true,
});

// Playfair Display for serif text
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// Dancing Script for cursive/signature text
export const dancingScript = Dancing_Script({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cursive',
});

