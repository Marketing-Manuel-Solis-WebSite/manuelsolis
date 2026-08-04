export interface ResendContact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  unsubscribed: boolean;
}

export type BlastVariant = 'cta' | 'no-cta';

export interface BlastProgressEvent {
  type: 'progress' | 'summary' | 'error' | 'started';
  processed: number;
  total: number;
  withCta: number;
  withoutCta: number;
  errors: number;
  currentEmail?: string;
  message?: string;
}

export type Language = 'es' | 'en';
