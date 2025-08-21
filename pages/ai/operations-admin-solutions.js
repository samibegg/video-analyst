// pages/ai/operations-admin-solutions.js // Renamed for clarity, adjust as needed

import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import ChatWindow from '@/components/ChatWindow'; // Adjust path if needed

// Consider importing icons from a library like lucide-react for better visual appeal
// import { FileText, Zap, Users, Settings, DatabaseZap } from 'lucide-react';

/**
 * Placeholder function for analytics tracking.
 * Replace this with your actual analytics integration code.
 */
const trackEvent = (eventName, eventData) => {
  console.log('Analytics Event:', eventName, eventData);
  window.gtag('event', eventName, eventData);
};

/**
 * Simple debounce function.
 */
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Main component for the AI Operations & Admin Solutions page
export default function AIOperationsAdminSolutionsPage() {
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const pageTitle = "AI for Operations & Admin Automation | ForgeMission";
  const pageDescription = "Streamline operations and cut costs with AI-powered document processing and data entry automation. Solutions by Your ForgeMission."; 
  const canonicalUrl = "https://www.forgemission.com/ai/hr-recruitment-solutions"; 
  const imageUrl = "https://www.forgemission.com/images/ai/hr-recruitment-solutions.jpg"; 
  const publicationDate = "2025-05-11T10:00:00Z"; // Keep or adjust

  const [isChatOpen, setIsChatOpen] = useState(false);

  const closeChat = useCallback(() => {
    setIsChatOpen(false); // Setting this to false HIDES ChatWindow and SHOWS the toggle button below
  }, []);
  const openChat = useCallback(() => {
    setIsChatOpen(true); // Setting this to true SHOWS ChatWindow and HIDES the toggle button below
  }, []);
  const hasOpenedByScroll = useRef(false);
  const scrollListenerRef = useRef(null);

  // Effect for handling scroll detection
  useEffect(() => {
    // Define the scroll handler logic
    const handleScroll = () => {
      // 1. Check if chat is already open or already triggered by scroll
      if (isChatOpen || hasOpenedByScroll.current) {
        return; // Don't do anything
      }

      // 2. Calculate scroll position and threshold
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Prevent division by zero or calculation if not scrollable
      if (scrollableHeight <= 0) {
          return;
      }
      const scrollThreshold = scrollableHeight * 0.25; // 25% threshold

      // 3. Check if user scrolled past the threshold
      if (window.scrollY > scrollThreshold) {
        console.log("Scroll threshold (25%) reached. Opening chat automatically."); // For debugging
        hasOpenedByScroll.current = true; // Set the flag
        openChat(); // Call the function to open the chat
      }
    };

    // Store the handler in the ref (optional, but can be useful for removal)
    scrollListenerRef.current = handleScroll;

    // Add the event listener only if the chat isn't already open.
    // This avoids adding/removing listeners unnecessarily on every state change.
    // Although the check inside handleScroll prevents action, this avoids the handler *call*.
    if (!isChatOpen) {
        window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive for performance
        console.log("Scroll listener added."); // For debugging
    }

    // Cleanup function: Remove the listener when the component unmounts
    // or potentially when isChatOpen becomes true (if not handled by openChat itself)
    return () => {
      if (scrollListenerRef.current) { // Check if ref has the function
         window.removeEventListener('scroll', scrollListenerRef.current);
         console.log("Scroll listener removed."); // For debugging
         scrollListenerRef.current = null; // Clear the ref
      }
    };
    // Re-run the effect if isChatOpen changes (to potentially add/remove listener)
    // or if openChat changes (though it's stable due to useCallback)
  }, [isChatOpen, openChat]);

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: pageTitle }); // Updated title
  }, []);

  // 2. Track Scroll Depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const scrollPercent = Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestonesReached.current.has(milestone)) {
          scrollMilestonesReached.current.add(milestone);
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: pageTitle }); 
        }
      });
    };
    const debouncedScrollHandler = debounce(handleScroll, 250);
    window.addEventListener('scroll', debouncedScrollHandler);
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, []);

  // 3. Track Active Time Spent
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        totalActiveTime.current += Date.now() - activeTimeStart.current;
      } else {
        activeTimeStart.current = Date.now();
      }
    };
    const handleBeforeUnload = () => {
      if (document.visibilityState === 'visible') {
        totalActiveTime.current += Date.now() - activeTimeStart.current;
      }
      if (totalActiveTime.current > 0) {
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: pageTitle });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    activeTimeStart.current = Date.now();
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // 4. Track Text Copying
  useEffect(() => {
    const handleCopy = () => {
      const selectedText = window.getSelection()?.toString() || '';
      if (selectedText.length > 0) {
        trackEvent('text_copied', {
          page_section: pageTitle, 
          content_snippet: selectedText.substring(0, 100) + (selectedText.length > 100 ? '...' : '')
        });
      }
    };
    const contentElement = contentRef.current;
    if (contentElement) contentElement.addEventListener('copy', handleCopy);
    return () => {
      if (contentElement) contentElement.removeEventListener('copy', handleCopy);
    };
  }, []);

  // --- JSON-LD Structured Data ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "datePublished": publicationDate,
    "author": { "@type": "Organization", "name": "ForgeMission" }, 
    "publisher": {
       "@type": "Organization",
       "name": "ForgeMission", 
       "logo": { "@type": "ImageObject", "url": "https://www.forgemission.com/images/logo.png" } 
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
  };

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: imageUrl,
              alt: pageTitle,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          image: imageUrl,
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Main container for the page content */}
      <div className="flex flex-col min-h-screen">
        {/* Use your custom Header component */}
        <Header />

        {/* Main content area */}
        <main className="flex-grow">
          {/* Adjusted background for a lighter, professional feel */}
          <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 text-slate-800 p-6 sm:p-10 font-sans">
            {/* Main content card with a white background */}
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 md:p-12">

              {/* Page-specific Header Section */}
              <header className="mb-10 text-center">
                {/* Updated text gradient for a professional look */}
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 mb-4">
                  Streamline Operations & Admin Tasks with AI
                </h1>
                <p className="text-lg text-slate-600">
                  Enhance efficiency, reduce errors, and free up your team with our intelligent automation solutions.
                </p>
              </header>

              {/* Main Content Section */}
              <section className="space-y-8">
                {/* Section 1: Core Offering */}
                <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-blue-500/20 hover:scale-[1.01]">
                  <h2 className="text-3xl font-semibold text-blue-600 mb-3">
                    {/* Icon placeholder: <FileText className="inline-block mr-2" /> */}
                    Streamlining Operations & Administrative Tasks
                  </h2>
                  <p className="text-slate-600 mb-2">
                    <strong className="text-slate-700">Use Case:</strong> AI-Powered Document Processing and Data Entry Automation
                  </p>
                  <div className="mt-4 space-y-3 text-slate-700">
                    <h3 className="text-xl font-semibold text-sky-600 mb-2">Problem & Cost Driver:</h3>
                    <p className="text-slate-600">
                      Manual data entry from invoices, purchase orders, contracts, and other documents is time-consuming, error-prone, and labor-intensive.
                    </p>
                  </div>
                </div>

                {/* Section 2: AI Solution Details */}
                <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-sky-500/20 hover:scale-[1.01]">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                    {/* Icon placeholder: <DatabaseZap className="inline-block mr-2" /> */}
                    AI Solution & How it Works:
                  </h3>
                  <ul className="list-disc list-inside space-y-3 text-slate-600 pl-4">
                    <li>
                      AI tools using Optical Character Recognition (OCR) and NLP can automatically extract relevant information (e.g., vendor name, invoice number, amount, dates) from scanned documents or PDFs.
                    </li>
                    <li>
                      This extracted data can then be automatically entered into accounting software, ERP systems, or databases.
                    </li>
                    <li>
                      Robotic Process Automation (RPA) bots, often enhanced with AI, can automate entire workflows involving document handling and data entry.
                    </li>
                  </ul>
                </div>

                {/* Section 3: Cost-Cutting Mechanism */}
                <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-cyan-500/20 hover:scale-[1.01]">
                  <h3 className="text-2xl font-semibold text-sky-600 mb-3">
                    {/* Icon placeholder: <Zap className="inline-block mr-2" /> */}
                    Cost-Savings Achieved:
                  </h3>
                  <ul className="space-y-3 text-slate-700">
                    <li>
                      <strong className="text-slate-800 block mb-1">Drastic Reduction in Manual Labor:</strong>
                      <span className="text-slate-600">
                        Significantly reduces the hours spent on manual data entry and document sorting (up to 80% reduction in processing time).
                      </span>
                    </li>
                    <li>
                      <strong className="text-slate-800 block mb-1">Error Reduction:</strong>
                      <span className="text-slate-600">
                        Minimizes costly human errors in data entry (up to 95% decrease in errors).
                      </span>
                    </li>
                    <li>
                      <strong className="text-slate-800 block mb-1">Faster Processing Cycles:</strong>
                      <span className="text-slate-600">
                        Speeds up processes like invoice approval and payment, potentially unlocking early payment discounts.
                      </span>
                    </li>
                    <li>
                      <strong className="text-slate-800 block mb-1">Improved Data Accuracy:</strong>
                      <span className="text-slate-600">
                        Leads to more reliable data for financial reporting and decision-making.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Section 4: How We Help (External AI Help & In-house Management) */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-blue-500/20 hover:scale-[1.01]">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                      {/* Icon placeholder: <Users className="inline-block mr-2" /> */}
                      Our Implementation Expertise:
                    </h3>
                    <p className="text-slate-600 mb-3 italic">Your partner in building efficient, automated workflows.</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 pl-4">
                      <li>Selecting and implementing an appropriate AI-powered OCR/document processing solution (many cloud-based options are available).</li>
                      <li>Customizing the AI models to recognize specific document layouts and data fields relevant to the business.</li>
                      <li>Integrating the solution with existing financial or operational software.</li>
                      <li>Setting up validation rules and exception handling workflows.</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-sky-500/20 hover:scale-[1.01]">
                    <h3 className="text-2xl font-semibold text-sky-600 mb-3">
                      {/* Icon placeholder: <Settings className="inline-block mr-2" /> */}
                      Empowering Your Team:
                    </h3>
                    <p className="text-slate-600 mb-3 italic">Ensuring your in-house resources can manage and scale.</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 pl-4">
                      <li>Managing the document ingestion process (e.g., scanning, email forwarding).</li>
                      <li>Monitoring the accuracy and performance of the AI system.</li>
                      <li>Handling exceptions flagged by the system (e.g., documents the AI couldn't process with high confidence).</li>
                      <li>Performing regular system updates and maintenance as guided by the vendor.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Page-specific Call to Action Section */}
              <section className="mt-12 pt-10 border-t border-slate-300 text-center">
                <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 mb-4">
                  Ready to Automate Your Admin & Operations?
                </h2>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  Discover how AI can transform your backend processes, saving time and money. Contact us for a consultation tailored to your operational needs!
                </p>
                <Link href="/demo" className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50">
                  Optimize My Operations
                </Link>
              </section>

            </div>
          </div>

        {/* Button to toggle chat visibility */}
        {!isChatOpen && (
          <button
            onClick={openChat} // Use the specific open function
            className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 bg-blue-600 text-white rounded-full p-3 shadow-lg z-40 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-opacity duration-300 animate-pulse" // z-index higher than chat window, optional pulse animation
            aria-label="Open chat"
          >
            {/* Chat icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        )}

        {isChatOpen && <ChatWindow onClose={closeChat} />}

        </main>

        {/* Use your custom Footer component */}
        <Footer />
      </div>
    </>
  );
}
