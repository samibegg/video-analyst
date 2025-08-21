// pages/ai/marketing-sales-solutions.js // Renamed for clarity, adjust as needed

import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import ChatWindow from '@/components/ChatWindow'; // Adjust path if needed

// Consider importing icons from a library like lucide-react for better visual appeal
// import { Target, BarChartBig, Users, Settings, BrainCircuit } from 'lucide-react';

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

// Main component for the AI Marketing & Sales Solutions page
export default function AIMarketingSalesSolutionsPage() {
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const pageTitle = "AI-Driven Marketing & Sales Optimization | ForgeMission";
  const pageDescription = "Boost your ROI with AI-powered marketing campaign optimization, content personalization, and lead scoring. Solutions by Your ForgeMission."; 
  const canonicalUrl = "https://www.forgemission.com/ai/marketing-sales-solutions"; 
  const imageUrl = "https://www.forgemission.com/images/ai/marketing-sales-solutions.jpg"; 
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
                  Optimize Your Marketing & Sales with AI
                </h1>
                <p className="text-lg text-slate-600">
                  Drive growth, enhance targeting, and maximize your ROI with our intelligent AI solutions.
                </p>
              </header>

              {/* Main Content Section */}
              <section className="space-y-8">
                {/* Section 1: Core Offering */}
                <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-blue-500/20 hover:scale-[1.01]">
                  <h2 className="text-3xl font-semibold text-blue-600 mb-3">
                    {/* Icon placeholder: <Target className="inline-block mr-2" /> */}
                    Marketing & Sales Optimization
                  </h2>
                  <p className="text-slate-600 mb-2">
                    <strong className="text-slate-700">Use Case:</strong> AI-Driven Marketing Campaign Optimization & Personalization
                  </p>
                  <div className="mt-4 space-y-3 text-slate-700">
                    <h3 className="text-xl font-semibold text-sky-600 mb-2">Problem & Cost Driver:</h3>
                    <p className="text-slate-600">
                      Wasted marketing spend on poorly targeted campaigns, low conversion rates, and significant time spent on manual campaign management and content creation.
                    </p>
                  </div>
                </div>

                {/* Section 2: AI Solution Details */}
                <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-sky-500/20 hover:scale-[1.01]">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                    {/* Icon placeholder: <BrainCircuit className="inline-block mr-2" /> */}
                    AI Solution & How it Works:
                  </h3>
                  <ul className="list-disc list-inside space-y-3 text-slate-600 pl-4">
                    <li>
                      <strong className="text-slate-700">Ad Targeting:</strong> AI algorithms analyze customer data and market trends to identify the most profitable customer segments and optimize ad spend across different channels (e.g., Google Ads, Meta Ads) in real-time.
                    </li>
                    <li>
                      <strong className="text-slate-700">Content Personalization:</strong> AI tools can personalize website content, email marketing messages, and product recommendations based on individual user behavior and preferences.
                    </li>
                    <li>
                      <strong className="text-slate-700">Automated Content Generation:</strong> Generative AI can assist in drafting marketing copy, social media posts, email subject lines, and even basic blog content, which can then be refined by human marketers.
                    </li>
                    <li>
                      <strong className="text-slate-700">Lead Scoring:</strong> AI can analyze lead behavior and demographics to score their likelihood to convert, allowing sales teams to prioritize their efforts.
                    </li>
                  </ul>
                </div>

                {/* Section 3: Cost-Cutting Mechanism */}
                <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-cyan-500/20 hover:scale-[1.01]">
                  <h3 className="text-2xl font-semibold text-sky-600 mb-3">
                    {/* Icon placeholder: <BarChartBig className="inline-block mr-2" /> */}
                    Cost-Savings Achieved:
                  </h3>
                  <ul className="space-y-3 text-slate-700">
                    <li>
                      <strong className="text-slate-800 block mb-1">Reduced Ad Spend Waste:</strong>
                      <span className="text-slate-600">
                        Improves targeting and ad performance, leading to lower customer acquisition costs (potentially up to 50% reduction in marketing costs).
                      </span>
                    </li>
                    <li>
                      <strong className="text-slate-800 block mb-1">Increased Conversion Rates:</strong>
                      <span className="text-slate-600">
                        Personalized experiences lead to higher engagement and more sales.
                      </span>
                    </li>
                    <li>
                      <strong className="text-slate-800 block mb-1">Time Savings:</strong>
                      <span className="text-slate-600">
                        Automates repetitive tasks like audience segmentation, A/B testing, and basic content creation, freeing up marketing staff for strategic work.
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
                    <p className="text-slate-600 mb-3 italic">Your strategic partner for AI-driven marketing success.</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 pl-4">
                      <li>Identifying and integrating suitable AI marketing tools (e.g., AI features within existing CRMs like HubSpot or Salesforce, or specialized AI marketing platforms).</li>
                      <li>Setting up data feeds and integrations for customer data analysis.</li>
                      <li>Developing initial AI models for customer segmentation and personalization.</li>
                      <li>Training the marketing team on how to use AI-powered insights and tools.</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-lg shadow-lg transition-all hover:shadow-sky-500/20 hover:scale-[1.01]">
                    <h3 className="text-2xl font-semibold text-sky-600 mb-3">
                      {/* Icon placeholder: <Settings className="inline-block mr-2" /> */}
                      Empowering Your Team:
                    </h3>
                    <p className="text-slate-600 mb-3 italic">Equipping your in-house talent for sustained growth.</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 pl-4">
                      <li>Managing data inputs and ensuring data quality for AI tools.</li>
                      <li>Monitoring campaign performance dashboards provided by the AI tools.</li>
                      <li>Implementing AI-suggested optimizations (with oversight).</li>
                      <li>Managing integrations between marketing AI tools and other business systems.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Page-specific Call to Action Section */}
              <section className="mt-12 pt-10 border-t border-slate-300 text-center">
                <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 mb-4">
                  Ready to Amplify Your Marketing & Sales?
                </h2>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  Let us help you implement AI solutions that drive measurable results and significant ROI. Contact us today for a personalized consultation!
                </p>
                <Link href="/demo" className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50">
                  Boost My ROI with AI
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
