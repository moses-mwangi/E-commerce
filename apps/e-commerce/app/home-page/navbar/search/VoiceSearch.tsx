"use client";

import { MicIcon } from "lucide-react";
import React, { useCallback, useState } from "react";

export default function VoiceSearch({
  setSearchQuery,
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  // const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const { t, i18n } = useTranslation();
  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };

  const handleVoiceSearch = useCallback(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setErrorMessage("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = () => setErrorMessage("");
    recognition.onresult = (event: any) =>
      setSearchQuery(event.results[0][0].transcript);
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        setErrorMessage(
          "Microphone access is denied. Please allow microphone access."
        );
      } else {
        setErrorMessage(
          "An error occurred while using voice recognition. Please try again."
        );
      }
    };

    try {
      recognition.start();
    } catch (error) {
      setErrorMessage("Failed to start speech recognition.");
    }
  }, [setSearchQuery]);

  return (
    <div>
      <MicIcon
        onClick={handleVoiceSearch}
        className="hover:cursor-pointer hover:text-orange-500 transition duration-200"
        size={20}
        aria-label="Search by Voice"
      />
    </div>
  );
}
