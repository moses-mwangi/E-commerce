"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const currencyOptions = [
  { value: "usd", label: "USD ($)" },
  { value: "eur", label: "EUR (€)" },
  { value: "kes", label: "KES (KSh)" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "it", label: "Italian" },
];

export default function LanguageCurrencySelector() {
  const [dropDown, setDropDown] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  const [tempLanguage, setTempLanguage] = useState(selectedLanguage);
  const [tempCurrency, setTempCurrency] = useState(selectedCurrency);

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
  }

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-500"
        onClick={() => setDropDown(!dropDown)}
      >
        🌍
        <div className="font-medium text-[14px] flex items-center flex-col">
          <p className="w-full">{displayLanguage}</p>
          <p className="w-full">{displayCurrency}</p>
        </div>
      </div>

      {dropDown && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 w-[335px]">
          <Card className="p-4 bg-white shadow-lg rounded-lg border">
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-800">
                Select Language & Currency
              </Label>
              <p className="text-sm pb-3 text-gray-600">
                Choose your preferred language and currency for a better
                shopping experience.
              </p>

              <div>
                <p className="text-sm font-medium pb-1 text-gray-700">
                  Language
                </p>
                <Select onValueChange={setTempLanguage} value={tempLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((el) => (
                      <SelectItem key={el.value} value={el.value}>
                        {el.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm font-medium pb-1 text-gray-700">
                  Currency
                </p>
                <Select onValueChange={setTempCurrency} value={tempCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map((el) => (
                      <SelectItem key={el.value} value={el.value}>
                        {el.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md py-2"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
