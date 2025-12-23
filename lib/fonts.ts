import { Inter, Playfair_Display, Dancing_Script, Mina } from 'next/font/google';

// Inter for Latin/English text - primary font for the app
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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

// Mina for Bengali signatures
export const mina = Mina({
  weight: ['400', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-mina',
  preload: true,
});

