// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { MapPin, Loader2 } from "lucide-react";
// import { Card } from "@/components/ui/card";

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [formData, setFormData] = useState({
//     country: "United Kingdom",
//     fullName: "",
//     phoneNumber: "",
//     streetAddress: "",
//     apartment: "",
//     postcode: "",
//   });

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   function handleUseCurrentLocation() {
//     setLoadingLocation(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setTimeout(() => {
//           setFormData((prev) => ({
//             ...prev,
//             streetAddress: "Auto-fetched Street Name, London",
//             postcode: "SW1A 1AA",
//           }));
//           setLoadingLocation(false);
//         }, 1500);
//       },
//       () => {
//         alert("Failed to get location. Please enter manually.");
//         setLoadingLocation(false);
//       }
//     );
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (
//       !formData.fullName ||
//       !formData.phoneNumber ||
//       !formData.streetAddress ||
//       !formData.postcode
//     ) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     // Process order
//     console.log("Shipping Details:", formData);
//     router.push("/payment");
//   }

//   return (
//     <Card className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-4">
//         Shipping Address
//       </h1>
//       <p className="text-sm text-gray-600 mb-4">
//         Your personal information is encrypted and will only be used for
//         delivery purposes.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label>Country / Region</Label>
//           <Input
//             name="country"
//             value={formData.country}
//             readOnly
//             className="bg-gray-100"
//           />
//         </div>

//         <div>
//           <Label>First Name and Last Name</Label>
//           <Input
//             name="fullName"
//             placeholder="John Doe"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <Label>Phone Number</Label>
//           <Input
//             name="phoneNumber"
//             placeholder="+44 1234 567890"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Only used to contact you for delivery updates.
//           </p>
//         </div>

//         <div>
//           <Label>Street Address or P.O. Box</Label>
//           <div className="flex gap-2">
//             <Input
//               name="streetAddress"
//               placeholder="123 Baker Street"
//               value={formData.streetAddress}
//               onChange={handleChange}
//               required
//             />
//             <Button
//               type="button"
//               onClick={handleUseCurrentLocation}
//               disabled={loadingLocation}
//               className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
//             >
//               {loadingLocation ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <MapPin />
//               )}
//               Use my location
//             </Button>
//           </div>
//         </div>

//         <div>
//           <Label>Apartment, Suite, Unit, Building, Floor (Optional)</Label>
//           <Input
//             name="apartment"
//             placeholder="Building 3, Floor 5"
//             value={formData.apartment}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <Label>Postcode</Label>
//           <Input
//             name="postcode"
//             placeholder="B1 1AA"
//             value={formData.postcode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <Label>County</Label>
//           <Input
//             name="postcode"
//             placeholder="B1 1AA"
//             value={formData.postcode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <Label>City / town</Label>
//           <Input
//             name="postcode"
//             placeholder="B1 1AA"
//             value={formData.postcode}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <Separator />

//         <Button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700"
//         >
//           Proceed to Payment
//         </Button>
//       </form>
//     </Card>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CheckoutPage() {
  const router = useRouter();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [formData, setFormData] = useState({
    country: "United Kingdom",
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    apartment: "",
    postcode: "",
    city: "",
    county: "",
    town: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUseCurrentLocation() {
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Simulate Reverse Geocoding (Replace this with an actual API call)
        setTimeout(() => {
          setFormData((prev) => ({
            ...prev,
            streetAddress: "221B Baker Street",
            postcode: "NW1 6XE",
            city: "London",
            county: "Greater London",
            town: "Marylebone",
          }));
          setLoadingLocation(false);
        }, 1500);
      },
      () => {
        alert("Failed to get location. Please enter manually.");
        setLoadingLocation(false);
      }
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.streetAddress ||
      !formData.postcode
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Shipping Details:", formData);
    router.push("/payment");
  }

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Shipping Address
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Your personal information is encrypted and will only be used for
        delivery purposes.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Country / Region</Label>
          <Input
            name="country"
            value={formData.country}
            readOnly
            className="bg-gray-100"
          />
        </div>

        <div>
          <Label>First Name and Last Name</Label>
          <Input
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input
            name="phoneNumber"
            placeholder="+44 1234 567890"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Only used to contact you for delivery updates.
          </p>
        </div>

        <div>
          <Label>Street Address or P.O. Box</Label>
          <div className="flex gap-2">
            <Input
              name="streetAddress"
              placeholder="123 Baker Street"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />
            <Button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={loadingLocation}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
            >
              {loadingLocation ? (
                <Loader2 className="animate-spin" />
              ) : (
                <MapPin />
              )}
              Use my location
            </Button>
          </div>
        </div>

        <div>
          <Label>Apartment, Suite, Unit, Building, Floor (Optional)</Label>
          <Input
            name="apartment"
            placeholder="Building 3, Floor 5"
            value={formData.apartment}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Postcode</Label>
          <Input
            name="postcode"
            placeholder="B1 1AA"
            value={formData.postcode}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>County</Label>
          <Input
            name="county"
            placeholder="Greater London"
            value={formData.county}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>City / Town</Label>
          <Input
            name="city"
            placeholder="London"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <Separator />

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Proceed to Payment
        </Button>
      </form>
    </Card>
  );
}
