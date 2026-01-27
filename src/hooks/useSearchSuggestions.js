import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to handle YouTube-style search suggestions
 * @param {Array} items - The list of objects to search through
 * @param {string} searchKey - The property of the object to use for suggestions (e.g., 'title')
 * @returns {Object} Search states and handlers
 */
export function useSearchSuggestions(items = [], searchKey = "title") {
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Derive suggestions based on searchText and items
  const suggestions = items
    .filter((item) => {
      const value = item[searchKey];
      return value && value.toLowerCase().includes(searchText.toLowerCase());
    })
    .map((item) => item[searchKey])
    .slice(0, 8);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset selection index when search text changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchText]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        setSearchText(suggestions[selectedIndex]);
        setShowSuggestions(false);
      } else {
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchText(suggestion);
    setShowSuggestions(false);
  };

  return {
    searchText,
    setSearchText,
    showSuggestions,
    setShowSuggestions,
    selectedIndex,
    suggestions,
    searchRef,
    handleKeyDown,
    handleSelectSuggestion,
  };
}
