/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useEffect, useState } from "react";
// import { I18nextProvider } from "react-i18next";
// import i18n from "@/i18n";

// export default function I18nProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true); // Ensure it runs only on the client
//   }, []);

//   if (!isMounted) return null; // Prevent hydration mismatch

//   return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
// }

"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setIsMounted(true);

    // Listen for language change and update state
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  if (!isMounted) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
