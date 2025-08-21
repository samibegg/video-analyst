// components/CookieConsentPopup.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // For linking to Privacy Policy
import { X } from 'lucide-react'; // Optional: For a close icon

// Key to use for storing consent in localStorage
const CONSENT_LOCAL_STORAGE_KEY = 'cookie_consent_given';

export const CookieConsentPopup = () => {
  // State to control visibility of the popup
  const [isVisible, setIsVisible] = useState(false);

  // Check localStorage on initial mount (client-side only)
  useEffect(() => {
    // localStorage is only available in the browser
    if (typeof window !== 'undefined') {
      const consentGiven = localStorage.getItem(CONSENT_LOCAL_STORAGE_KEY);
      // Show the popup only if consent hasn't been explicitly given
      if (consentGiven !== 'true') {
        // Optional delay before showing to be less intrusive
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500); // Show after 1.5 seconds
        return () => clearTimeout(timer); // Cleanup timer on unmount
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle accepting cookies
  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      // Store consent in localStorage
      localStorage.setItem(CONSENT_LOCAL_STORAGE_KEY, 'true');
      // Hide the popup
      setIsVisible(false);
    }
  };

  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  // Render the popup
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-gray-800 dark:bg-gray-900 text-white shadow-lg transition-transform duration-500 ease-out transform translate-y-0"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Text Content */}
        <p className="text-sm text-gray-200 dark:text-gray-300 flex-grow">
          We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience. By clicking “Accept,” you agree to our cookie use. You can read more in our{' '}
          <Link href="/privacy-policy" passHref> {/* Adjust link as needed */}
            <span className="font-medium underline hover:text-blue-400 cursor-pointer">
              Privacy Policy
            </span>
          </Link>.
        </p>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition"
            aria-label="Accept cookies"
          >
            Accept
          </button>
          {/* Optional Close Button */}
          {/* <button
            onClick={handleAccept} // Or a separate dismiss function
            className="ml-2 p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Dismiss cookie notice"
          >
            <X size={18} />
          </button> */}
        </div>
      </div>
    </div>
  );
};

