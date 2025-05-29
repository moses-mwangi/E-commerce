import Image from "next/image";
import anex from "../../public/paymentImages/amex.png";
import dinner from "../../public/paymentImages/dinnerCard.png";
import discover from "../../public/paymentImages/discoverCard.png";
import jcb from "../../public/paymentImages/jcbCard.png";
import master from "../../public/paymentImages/masterCard.png";
import M_Pesa from "../../public/paymentImages/mpesa.png";
import unionPay from "../../public/paymentImages/unionPay.png";

const cardBrands = [
  {
    name: "Visa",
    icon: M_Pesa,
  },
  {
    name: "Mastercard",
    icon: master,
  },
  {
    name: "American Express",
    icon: anex,
  },
  {
    name: "Discover",
    icon: discover,
  },
  {
    name: "JCB",
    icon: jcb,
  },
  {
    name: "Diners Club",
    icon: dinner,
  },
  {
    name: "UnionPay",
    icon: unionPay,
  },
  {
    name: "Card",
    icon: M_Pesa,
  },
];

export default function AvailableCard() {
  return (
    <div className=" max-w-md">
      <div className=" flex items-center justify-between">
        <span>Secure Payment</span>
        <div className="flex space-x-2">
          {cardBrands?.map((el, idx) => (
            <div key={idx} className="w-10 h-6">
              <Image
                src={el.icon || ""}
                alt="llll"
                width={40}
                height={40}
                className=" w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
