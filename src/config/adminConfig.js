const ADMIN_EMAILS_ENV = import.meta.env.VITE_ALLOWED_ADMIN_EMAILS || '';
export const ALLOWED_ADMIN_EMAILS = ADMIN_EMAILS_ENV
  ? ADMIN_EMAILS_ENV.split(',').map(e => e.trim().toLowerCase())
  : ['zulqarnain.hafeez@itcs.com.pk'];

export const isEmailAllowed = (email) => {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase());
};