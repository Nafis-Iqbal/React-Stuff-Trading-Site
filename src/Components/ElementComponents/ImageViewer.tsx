"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageProps {
  imageURL: string;
  imageAlt?: string;
}

export const ImageViewer = ({ className, imageList }: { imageList: ImageProps[], className?: string }) => {
  const [imageURLsList, setImageURLsList] = useState<ImageProps[]>(imageList);
  const [displayedImageId, setDisplayedImageId] = useState<number>(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const showPreviousImage = () => {
    if (displayedImageId > 0) {
      setDirection("prev");
      setDisplayedImageId(displayedImageId - 1);
    }
  };

  const showNextImage = () => {
    if (displayedImageId < imageList.length - 1) {
      setDirection("next");
      setDisplayedImageId(displayedImageId + 1);
    }
  };

  useEffect(() => {
    setImageURLsList(imageList);
    console.log(imageList);
  }, [imageList]);

  // Animation variants
  const variants = {
    enter: (direction: "next" | "prev") => ({
      x: direction === "next" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "next" | "prev") => ({
      x: direction === "next" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className={`flex flex-col w-full bg-gray-700 border-green-800 border-1 ${className ? className : 'h-full'}`}>
        <div className="flex flex-1 p-2 bg-gray-500">
            <div className="relative w-full h-full">
                <AnimatePresence custom={direction}>
                    <motion.div
                        key={displayedImageId} // Ensures animation on change
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                        }}
                        className="absolute w-full h-full"
                    >
                        <img
                          className="w-full h-full object-contain" src={imageURLsList[displayedImageId]?.imageURL ?? "/CPUPIC.webp"} 
                          alt={imageURLsList[displayedImageId]?.imageAlt ?? "Some stuff about the pic."}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
      

        <div className="flex justify-between mt-4">
            <button 
                className="p-2 ml-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={showPreviousImage}
                disabled={displayedImageId === 0}
            >
                <ChevronLeft className="w-8 h-8 text-green-500 hover:text-green-400" />
            </button>

            <div className="flex items-center space-x-1">
                {imageList.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === displayedImageId 
                                ? 'bg-green-500' 
                                : 'bg-gray-400 hover:bg-gray-300'
                        }`}
                        onClick={() => {
                            setDirection(index > displayedImageId ? "next" : "prev");
                            setDisplayedImageId(index);
                        }}
                    />
                ))}
            </div>

            <button 
                className="p-2 mr-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={showNextImage}
                disabled={displayedImageId === imageList.length - 1}
            >
                <ChevronRight className="w-8 h-8 text-green-500 hover:text-green-400" />
            </button>
        </div>
    </div>
  );
};
