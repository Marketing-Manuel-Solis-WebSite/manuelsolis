// Mapeo de slugs de oficinas a números de teléfono de emergencia
export const officesPhoneMap: Record<string, string> = {
  'houston-principal': '+1 (713) 701-1731',
  'houston-accidentes': '+1 (713) 231-5384',
  'main-st': '+1 (713) 842-9575',
  'north-loop': '+1 (713) 429-0237',
  'northchase': '+1 (346) 522-4848',
  'houston-bellaire': '+1 (832) 598-0914',
  'kirby': '+1 (713) 903-7875',
  'dallas': '+1 (214) 753-8315',
  'el-paso': '+1 (915) 233-7127',
  'harlingen': '+1 (956) 597-7090',
  'chicago': '+1 (312) 477-0389',
  'losangeles': '+1 (213) 784-1554',
  'arvada': '+1 (720) 358-8973',
  'memphis': '+1 (901) 557-8357',
  'league-city': '+1 (832) 598-3782',
};

// Número por defecto (global)
export const DEFAULT_PHONE = '+1-888-676-1238';
export const DEFAULT_PHONE_LINK = 'tel:+18886761238';