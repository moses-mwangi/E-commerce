import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Option {
  value: string;
  label: string;
}

const currencyOptions: Option[] = [
  { value: "USD", label: "USD ($)" },
  { value: "KES", label: "KES (KSh)" },
  { value: "NGN", label: "NGN (₦)" },
  { value: "GHS", label: "GHS (₵)" },
  { value: "ZAR", label: "ZAR (R)" },
];

const languageOptions: Option[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "it", label: "Italian" },
  { value: "ar", label: "Arabic" },
];

function useLanguage_Currency() {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("KES");

  const [tempCurrency, setTempCurrency] = useState(selectedCurrency);
  const [tempLanguage, setTempLanguage] = useState(selectedLanguage);

  const displayLanguage = languageOptions.find(
    (l) => l.value === selectedLanguage
  )?.label;
  const displayCurrency = currencyOptions.find(
    (c) => c.value === selectedCurrency
  )?.label;

  function handleSave() {
    setSelectedLanguage(tempLanguage);
    setSelectedCurrency(tempCurrency);
    setDropDown(false);

    i18n.changeLanguage(tempLanguage);
    localStorage.setItem("language", tempLanguage);
    localStorage.setItem("currency", tempCurrency);

    window.location.reload();
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    const storedCurrency = localStorage.getItem("currency") || "KES";

    setSelectedLanguage(storedLanguage);
    setTempLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);

    setSelectedCurrency(storedCurrency);
    setTempCurrency(storedCurrency);
  }, [i18n]);

  return {
    setDropDown,
    dropDown,
    displayCurrency,
    displayLanguage,
    tempCurrency,
    tempLanguage,
    setTempCurrency,
    setTempLanguage,
    handleSave,
    selectedCurrency,
  };
}

export default useLanguage_Currency;
