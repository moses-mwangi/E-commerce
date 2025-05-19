export type CurrencyCode = "USD" | "EUR" | "KES";

let exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.93,
  KES: 190,
};

export const getCurrentCurrency = (): CurrencyCode => {
  // const currency = (localStorage.getItem("currency") as CurrencyCode) || "KES";

  const currency = localStorage.getItem("currency")
    ? localStorage.getItem("currency")?.toUpperCase() === "KSH"
      ? "KES"
      : (localStorage.getItem("currency")?.toUpperCase() as CurrencyCode)
    : "KES";
  return currency;
};

export const updateExchangeRates = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    const data = await response.json();
    exchangeRates = {
      USD: 1,
      EUR: data.rates.EUR,
      KES: data.rates.KES,
    };

    return {
      USD: 1,
      EUR: Number(data.rates.EUR),
      KES: Number(data.rates.KES),
    };
  } catch (error) {
    // console.error("Failed to fetch exchange rates, using defaults", error);
  }
};

export const convertPrice = (
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number => {
  const exchangeRate = updateExchangeRates();

  const amountInUSD = amount / exchangeRates[from];
  return parseFloat((amountInUSD * exchangeRates[to]).toFixed(2));
};

// export const formatPrice = (amount: number, currency: CurrencyCode): string => {
//   const formatter = new Intl.NumberFormat(getLocale(currency), {
//     style: "currency",
//     currency,
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
//   return formatter.format(amount);
// };

// const getLocale = (currency: CurrencyCode): string => {
//   const locales: Record<CurrencyCode, string> = {
//     USD: "en-US",
//     EUR: "de-DE",
//     KES: "sw-KE",
//   };
//   return locales[currency];
// };
