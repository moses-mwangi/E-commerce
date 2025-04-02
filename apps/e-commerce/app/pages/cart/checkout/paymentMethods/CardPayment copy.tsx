import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormContext, useForm, FieldError } from "react-hook-form";
import { FaCcVisa } from "react-icons/fa";
import { GrVisa } from "react-icons/gr";
import { SiVisa } from "react-icons/si";

import visa from "../../../../public/visa.png";
import masterCard from "../../../../public/masterCard.png";
import jcbCard from "../../../../public/jcbCard.png";
import dinnerCard from "../../../../public/dinnerCard.png";
import amexCard from "../../../../public/amex.png";
import discoverCard from "../../../../public/discoverCard.png";
import Image from "next/image";

const CARD_EXPIRY_MONTHS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

const CURRENT_YEAR = new Date().getFullYear();
const CARD_EXPIRY_YEARS = Array.from({ length: 10 }, (_, i) =>
  String(CURRENT_YEAR + i)
);

// Card type detection patterns
const CARD_PATTERNS = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$/,
  amex: /^3[47][0-9]{13}$/,
  diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
};

const CARD_ICONS = {
  visa: visa,
  mastercard: masterCard,
  amex: amexCard,
  diners: dinnerCard,
  discover: discoverCard,
  jcb: jcbCard,
};

export default function CardPayment() {
  const [showCvv, setShowCvv] = useState(false);
  const [cardType, setCardType] = useState<string | null>(null);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  let cardNumber = watch("cardNumber");

  useEffect(() => {
    if (cardNumber) {
      setCardType(detectCardType(cardNumber));
    }
  }, [cardNumber]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const cardType = detectCardType(v);

    if (cardType === "amex") {
      const parts = [];
      if (v.length > 4) parts.push(v.substring(0, 4));
      if (v.length > 10) parts.push(v.substring(4, 10));
      if (v.length > 15) parts.push(v.substring(10, 15));
      else if (v.length > 4) parts.push(v.substring(4));
      return parts.join(" ");
    } else {
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || "";
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      if (parts.length) {
        return parts.join(" ");
      }
      return v;
    }
  };

  const validateCardNumber = (value: string) => {
    const num = value.replace(/\s/g, "");
    if (!/^\d+$/.test(num)) return "Invalid card number";

    // Luhn algorithm
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
      let digit = parseInt(num[i]);
      if ((num.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0 ? true : "Invalid card number";
  };

  // Detect card type based on number
  const detectCardType = (number: string) => {
    const num = number.replace(/\s/g, "");
    for (const [type, pattern] of Object.entries(CARD_PATTERNS)) {
      if (pattern.test(num)) {
        return type;
      }
    }
    return null;
  };

  // Handle card number changes
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    e.target.value = formattedValue;
    setValue("cardNumber", formattedValue, { shouldValidate: true });
    setCardType(detectCardType(formattedValue));
  };

  cardNumber = watch("cardNumber");

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Card number"
          className="bg-gray-50 focus-visible:ring-orange-500/30 pl-[50px]"
          onChange={handleCardNumberChange}
          defaultValue={watch("cardNumber")}
          maxLength={19} // 16 digits + 3 spaces
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {cardType ? (
            <span className="text-xl font-medium">
              {/* {CARD_ICONS[cardType as keyof typeof CARD_ICONS]} */}
              <Image
                src={CARD_ICONS[cardType as keyof typeof CARD_ICONS]}
                alt="ff"
                width={100}
                height={100}
                className="w-8 h-auto"
              />
            </span>
          ) : (
            <CreditCard className="w-4 h-4 text-gray-400" />
          )}
        </div>
        {errors.cardNumber && (
          <p className="text-red-500 text-xs mt-1">
            {(errors.cardNumber as FieldError)?.message}
          </p>
        )}
      </div>

      {/* Cardholder Name */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            placeholder="First Name"
            className="bg-gray-50 focus-visible:ring-orange-500/30"
            {...register("cardFirstName", {
              required: "First name is required",
            })}
          />
          {errors.cardFirstName && (
            <p className="text-red-500 text-xs mt-1">
              {(errors?.cardNumber as FieldError)?.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <Input
            placeholder="Surname"
            className="bg-gray-50 focus-visible:ring-orange-500/30"
            {...register("cardLastName", {
              required: "Last name is required",
            })}
          />
          {errors.cardLastName && (
            <p className="text-red-500 text-xs mt-1">
              {(errors?.cardNumber as FieldError)?.message}
            </p>
          )}
        </div>
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-3">
        {/* Expiry Date */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Select {...register("cardExpMonth", { required: true })}>
              <SelectTrigger className="bg-gray-50 focus:ring-orange-500/30">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {CARD_EXPIRY_MONTHS.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select {...register("cardExpYear", { required: true })}>
              <SelectTrigger className="bg-gray-50 focus:ring-orange-500/30">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {CARD_EXPIRY_YEARS.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* CVV */}
        <div className="relative">
          <Input
            placeholder="CVV/CVC"
            type={showCvv ? "text" : "password"}
            maxLength={cardType === "amex" ? 4 : 3}
            className="bg-gray-50 focus-visible:ring-orange-500/30 pr-8"
            {...register("cardCvv", {
              required: "CVV is required",
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: "Invalid CVV code",
              },
            })}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowCvv(!showCvv)}
            aria-label={showCvv ? "Hide CVV" : "Show CVV"}
          >
            {showCvv ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.cardCvv && (
            <p className="text-red-500 text-xs mt-1">
              {(errors?.cardNumber as FieldError)?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
