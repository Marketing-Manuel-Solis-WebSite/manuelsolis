export interface BosPerson {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface BosSearchResponse {
  ok: boolean;
  data: BosPerson[];
}

export interface ResendContact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  unsubscribed: boolean;
}

export type BlastVariant = 'cta' | 'no-cta';

export interface ClassifiedSubscriber {
  email: string;
  firstName: string;
  variant: BlastVariant;
  bosPerson: BosPerson | null;
  bosLookupFailed: boolean;
}

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
