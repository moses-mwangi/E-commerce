import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

type CurrencyOption = "usd" | "eur" | "ksh";
type LanguageOption = "en" | "fr" | "it" | "ar";

interface Option {
  value: string;
  label: string;
}

const currencyOptions: Option[] = [
  { value: "usd", label: "USD ($)" },
  { value: "eur", label: "EUR (€)" },
  { value: "ksh", label: "KES (KSh)" },
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
  const [selectedCurrency, setSelectedCurrency] = useState("ksh");

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
    const storedCurrency = localStorage.getItem("currency") || "ksh";

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
