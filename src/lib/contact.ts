export const WHATSAPP_NUMBER = "12687755221";
export const ASHANTE_EMAIL = "ashante@alindsayluxe.com";
export const ASHANTE_PHONE = "+1 (268) 775-5221";
export const ASHANTE_PHONE_RAW = "+12687755221";

// Single source of truth — surfaced in Footer + ContactForm
export const OFFICE_HOURS = "By appointment · 9am–5pm";
// TODO(client): replace with confirmed new office location
export const OFFICE_LOCATION = "Antigua & Barbuda";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
