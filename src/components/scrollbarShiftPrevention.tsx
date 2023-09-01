"use client";
import React, { useState, useEffect } from "react";

const PlaceholderDiv: React.FC = () => {
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  useEffect(() => {
    const checkForScrollbar = () => {
      if (window.innerHeight < document.documentElement.scrollHeight) {
        setIsScrollbarVisible(true);
      } else {
        setIsScrollbarVisible(false);
      }
    };

    // Initial check
    checkForScrollbar();

    // Add an event listener to check when the window is resized
    window.addEventListener("resize", checkForScrollbar);

    return () => {
      // Cleanup - remove the event listener when the component is unmounted
      window.removeEventListener("resize", checkForScrollbar);
    };
  }, []);

  // If scrollbar is visible, don't render the div (or render it as invisible)
  if (isScrollbarVisible) {
    return <div className="placeholder pointer-events-none hidden h-screen w-4 bg-blue-400"></div>;
  }

  // If scrollbar is not visible, render the div
  return <div className="placeholder h-screen w-2 bg-red-400"></div>;
};

export default PlaceholderDiv;
