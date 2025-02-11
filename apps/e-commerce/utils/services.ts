export const phoneRegexByCountry: { [key: string]: RegExp } = {
  kenya: /^(?:\+254|0)(7\d{8}|1\d{8})$/,
  ghana: /^(?:\+233|0)[235][0-9]{8}$/,
  nigeria: /^(?:\+234|0)[789][01]\d{8}$/,
  tanzania: /^(?:\+255|0)7\d{8}$/,
  uganda: /^(?:\+256|0)7\d{8}$/,
  dubai: /^(?:\+971|0)5\d{8}$/,
};

export const countries = [
  { country: "Kenya", value: "kenya", code: "254", flag: "🇰🇪" },
  { country: "Ghana", value: "ghana", code: "233", flag: "🇬🇭" },
  { country: "Nigeria", value: "nigeria", code: "234", flag: "🇳🇬" },
  { country: "Tanzania", value: "tanzania", code: "255", flag: "🇹🇿" },
  { country: "Uganda", value: "uganda", code: "256", flag: "🇺🇬" },
  { country: "Dubai", value: "dubai", code: "971", flag: "🇦🇪" },
];
