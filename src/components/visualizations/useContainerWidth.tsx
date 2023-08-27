import { useEffect, useState } from "react";

interface UseContainerWidthProps {
  ref: React.RefObject<HTMLDivElement>;
}

const useContainerWidth = ({ ref }: UseContainerWidthProps) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setContainerWidth(ref.current.offsetWidth);
      }
    };

    // Call once to set the initial width
    updateWidth();

    // Set up the event listener
    window.addEventListener("resize", updateWidth);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [ref]);

  return { containerWidth };
};

export default useContainerWidth;
