"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface Image {
  images: string[] | undefined;
  selectedImage: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ImageScrol({
  images,
  selectedImage,
  setSelectedImage,
}: Image) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(5);

  useEffect(() => {
    function updateImagesPerPage() {
      const width = window.innerWidth;
      if (width < 440) {
        setImagesPerPage(2);
      } else if (width < 540) {
        setImagesPerPage(3);
      } else if (width < 650) {
        setImagesPerPage(4);
      } else {
        setImagesPerPage(5); // Default for desktop
      }
    }

    updateImagesPerPage();
    window.addEventListener("resize", updateImagesPerPage);
    return () => window.removeEventListener("resize", updateImagesPerPage);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setCurrentIndex(0);
      setImagesPerPage(images ? images?.length : 5);
    }
  }, [images?.length, images]);

  function handlePrev() {
    if (images && images.length > 1 && currentIndex > 0) {
      setCurrentIndex((el) => el - 1);
      setImagesPerPage((el) => el - 1);
    }
  }

  function handleNext() {
    if (images && imagesPerPage + 1 < images?.length) {
      setCurrentIndex((el) => el + 1);
      setImagesPerPage((el) => el + 1);
    }
  }

  if (!images) return null;

  return (
    <div className=" flex items-center justify-center gap-2">
      <Button
        className="disabled:cursor-not-allowed w-9 h-9  rounded-full hover:text-black hover:bg-slate-50 bg-slate-100 font-semibold"
        onClick={() => {
          handlePrev();
        }}
        disabled={currentIndex === 0}
      >
        <SlArrowLeft className=" text-black font-bold" />
      </Button>
      <div className="">
        <div className="overflow-x-scroll sm:overflow-x-hidden hide-scrollbar flex gap-3">
          {images?.slice(currentIndex, imagesPerPage).map((image, idx) => (
            <Image
              onClick={() => {
                setSelectedImage(idx);
              }}
              className={`${
                selectedImage === idx ? "ring-2 ring-orange-500" : ""
              } rounded-lg cursor-pointer w-24 h-20`}
              key={idx}
              src={image}
              alt="nnnn"
              width={imagesPerPage === 1 ? 200 : 150}
              height={imagesPerPage === 1 ? 100 : 100}
            />
          ))}
        </div>
      </div>
      <Button
        className="w-9 h-9  rounded-full hover:text-black hover:bg-slate-50 bg-slate-100 font-semibold"
        onClick={() => {
          handleNext();
        }}
        disabled={imagesPerPage + 1 === images?.length}
      >
        <SlArrowRight className=" text-black font-bold" />
      </Button>
    </div>
  );
}
