import { redirect } from 'next/navigation';

// Fallback for when the proxy doesn't intercept (e.g., dev mode).
// In production, proxy.ts handles / → /{locale} based on browser language.
export default function RootPage() {
  redirect('/es');
}