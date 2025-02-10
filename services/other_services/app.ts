// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// const availableLanguages = [
//   { code: "en", name: "English", flag: "../../images/image.png" },
//   { code: "it", name: "Italian", flag: "../../images/image.png" },
//   { code: "fr", name: "French", flag: "../../images/image.png" },
// ];

// export default function Language() {
//   const { i18n, t } = useTranslation(); // Get translation functions
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language") || "en";
//     i18n.changeLanguage(savedLanguage);
//     setSelectedLanguage(savedLanguage);
//   }, [i18n]);

//   const handleLanguageChange = (langCode: string) => {
//     i18n.changeLanguage(langCode); // Change website language
//     localStorage.setItem("language", langCode);
//     setDropdownOpen(false); // Close dropdown
//     setSelectedLanguage(langCode); ///i can remove it
//   };

//   return (
//     <div className="relative">
//       <button
//         className="text-gray-500 py-2 px-4 bg-gray-200 rounded-md"
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//       >
//         {/* {t("selectLanguage")}
//         {
//           availableLanguages.find((lang) => lang.code === selectedLanguage)
//             ?.name
//         }
//         {t("search")} */}
//         EN
//       </button>

//       {dropdownOpen && (
//         <div className="absolute top-full mt-2 bg-white shadow-md rounded-md w-full">
//           {availableLanguages.map((lang) => (
//             <button
//               key={lang.code}
//               className="block py-2 px-4 hover:bg-gray-200 w-full text-left"
//               onClick={() => handleLanguageChange(lang.code)}
//             >
//               {lang.name}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
