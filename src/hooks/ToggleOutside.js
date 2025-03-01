import { useEffect, useRef, useState } from "react";

/**
 * ToggleOutside Hook
 * 
 * This was taken from the Code institute moments project.
 * 
 * This hook manages a toggle state and automatically closes it when clicking outside a referenced element.
 * 
 * @returns {object} { expanded, setExpanded, ref } - Provides the toggle state, setter function, and ref for element tracking.
 */
const ToggleOutside = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return {expanded, setExpanded, ref}
};

export default ToggleOutside;
