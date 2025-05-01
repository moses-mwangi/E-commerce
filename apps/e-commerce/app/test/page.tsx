// "use client";

// import React, { useEffect, useState } from "react";
// import ModernEcommerceSearch from "./ModernEcommerceSearch";
// import DropdownDrawerDemo from "./te";
// import { Card } from "@/components/ui/card";
// import ExtraNavbarSection from "../home-page/navbar/ExtraNavbarSection/ExtraNavbarSection copy";
// import Aos from "aos";
// import { Button } from "@/components/ui/button";

// export default function TestPage() {
//   const [is, setIs] = useState(false);
//   useEffect(() => {
//     Aos.init({
//       once: true,
//     });
//   }, []);

//   useEffect(() => {
//     Aos.refresh();
//   }, [is]);

//   return (
//     <div className=" py-4 px-10">
//       <Button data-aos="slide-up" onClick={() => setIs((s) => !s)}>
//         CLCK
//       </Button>

//       {is === true && (
//         <p
//           data-aos="fade-up"
//           // data-aos="slide-down"
//           data-aos-duration="600"
//         >
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis fugiat
//           exercitationem delectus fugit modi sunt ducimus nobis! Sed facilis
//           perspiciatis consectetur veniam rerum minus magni sequi ipsum,
//           inventore optio ex.
//         </p>
//       )}
//       {/* <ModernEcommerceSearch /> */}
//       {/* <DropdownDrawerDemo /> */}
//       {/* <ExtraNavbarSection /> */}
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    Aos.init({
      once: false, // Changed to false so animations can trigger again
      duration: 600, // Set default duration
    });

    return () => {
      Aos.refresh(); // Cleanup
    };
  }, []);

  return (
    <div className="py-4 px-10">
      <Button data-aos="slide-up" onClick={() => setShowText((prev) => !prev)}>
        TOGGLE TEXT
      </Button>

      {showText && (
        <p data-aos="fade-up" data-aos-duration="600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis fugiat
          exercitationem delectus fugit modi sunt ducimus nobis! Sed facilis
          perspiciatis consectetur veniam rerum minus magni sequi ipsum,
          inventore optio ex.
        </p>
      )}
    </div>
  );
}
