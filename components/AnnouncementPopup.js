// components/AnnouncementPopup.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Zap } from 'lucide-react'; // Zap for announcement icon, X for close

// Key for localStorage to remember dismissal
const ANNOUNCEMENT_DISMISSED_KEY = 'announcement_popup_dismissed_v1'; // Increment version if content changes significantly

export const AnnouncementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true); // Start as dismissed until checked

  // Check localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(ANNOUNCEMENT_DISMISSED_KEY);
      if (dismissed !== 'true') {
        setIsDismissed(false); // Mark as not dismissed
        // Set timer to show after delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000); // 1 second delay
        return () => clearTimeout(timer); // Cleanup timer
      }
      // If already dismissed, isDismissed remains true, isVisible remains false
    }
  }, []);

  // Function to handle dismissing the popup
  const handleDismiss = (e) => {
     // Prevent link navigation if close button is clicked directly
     if (e && e.stopPropagation) {
        e.stopPropagation();
     }
    if (typeof window !== 'undefined') {
      localStorage.setItem(ANNOUNCEMENT_DISMISSED_KEY, 'true');
    }
    setIsVisible(false);
    // Keep isDismissed true after manual dismissal
    setIsDismissed(true);
  };

  // Don't render if dismissed or not yet set to visible
  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed top-5 right-5 z-[100] w-full max-w-sm rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0' // Slide in from right
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        <div className="flex items-start">
          {/* Icon */}
          <div className="flex-shrink-0 pt-0.5">
            <Zap className="h-5 w-5 text-blue-500 dark:text-blue-400" aria-hidden="true" />
          </div>
          {/* Content */}
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              New Feature Alert!
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Estimate AI system costs with our new interactive calculator. <sup>Beta</sup>
            </p>
            {/* Link/Button */}
            <div className="mt-3">
              <Link href="/ai-cost-estimator" passHref> {/* Corrected link */}
                <span
                  onClick={handleDismiss} // Dismiss when link is clicked
                  className="inline-flex rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer"
                >
                  Try it Now
                </span>
              </Link>
            </div>
          </div>
          {/* Close Button */}
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

