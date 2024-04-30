import Commerce from "@chec/commerce.js";

const publicKey = import.meta.env.VITE_REACT_APP_CHEC_PUBLIC_KEY || 'your_default_public_key';

export const commerce = new Commerce(publicKey, true);
