import { useEffect, useState } from 'react';

/**
 * Custom hook to determine if the screen matches a media query
 * @param query Media query string, e.g., '(min-width: 1024px)'
 * @returns Boolean indicating whether the query matches
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Update state based on initial match
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange(); // Check on mount
    mediaQuery.addEventListener('change', handleChange); // Listen for changes

    return () => {
      mediaQuery.removeEventListener('change', handleChange); // Cleanup on unmount
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
