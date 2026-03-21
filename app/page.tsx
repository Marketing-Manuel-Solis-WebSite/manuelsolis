import { redirect } from 'next/navigation';

// Fallback for when middleware doesn't intercept (e.g., dev mode).
// In production, middleware handles / → /{locale} based on browser language.
export default function RootPage() {
  redirect('/es');
}