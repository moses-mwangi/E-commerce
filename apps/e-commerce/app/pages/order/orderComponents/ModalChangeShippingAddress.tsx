"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChangeShippingAddress from "./ChangeShippingAddress";

const Modal = ({ toggleAddressEdit, setToggleAddressEdit }: any) => {
  const modalRef = useRef(null);

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e: { key: string }) => {
      if (e.key === "Escape") setToggleAddressEdit(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setToggleAddressEdit]);

  useEffect(() => {
    if (toggleAddressEdit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [toggleAddressEdit]);

  // Click outside to close
  const handleClickOutside = (e: { target: any }) => {
    if (modalRef.current && !(modalRef.current as any)?.contains(e.target)) {
      setToggleAddressEdit(false);
    }
  };

  return (
    <AnimatePresence>
      {toggleAddressEdit && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClickOutside}
        >
          <motion.div
            ref={modalRef}
            className="max-h-dvh overflow-y-auto bg-white rounded-xl p-4 w-full max-w-3xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
          >
            <ChangeShippingAddress />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
