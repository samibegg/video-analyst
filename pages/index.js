'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useEffect, useState } from 'react';

// You can also import this from a separate file
const heroTexts = [
  ["Intelligence in Every Layer", "Forging AI That Drives Results"],
  ["Turning Data into Direction", "And Algorithms into Action"],
  ["Where AI Gets Practical", "And Data Powers the Mission"],
  ["Forged from Data", "Built to Learn, Scale, and Adapt"],
  ["Smarter Systems and Decisions", "Mission-Driven AI Starts Here"],
  ["Data-Rich, Mission-Ready", "AI Solutions That Deliver"],
  ["Raw Data to Real Impact", "Engineering Intelligence"],
  ["AI with Purpose", "Data with Direction"],
  ["Insights Into Action", "Where AI Powers Missions"],
  ["Strategic by Design", "AI and Data Aligned to Your Goals"]
];

export default function HomePage() {

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % heroTexts.length);
        setFade(true); // Fade back in
      }, 500); // Wait for fade-out before changing
    }, 3100);

    return () => clearInterval(interval);
  }, []);

  const [line1, line2] = heroTexts[index];


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col justify-center items-center px-6 py-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl">
          <h1
            className={`text-5xl font-extrabold text-gray-900 mb-6 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          >
            {line1} <br /> {line2}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We specialize in cloud migration, big data engineering, cutting-edge app development, and AI strategy — guiding enterprises across industries through modern technological transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/knowledge-base" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md text-lg transition">
              Access Knowledge Base
            </Link>
            <Link href="/ai/solutions" className="bg-red-500 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md text-lg transition">
              Unlock Your AI Advantage
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Areas of Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Cloud Migration</h3>
              <p className="text-gray-600 mt-2">We help enterprises seamlessly transition to the cloud, ensuring scalability, cost-efficiency, and security.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Big Data Solutions</h3>
              <p className="text-gray-600 mt-2">Unlock the power of data with our big data solutions, enabling real-time insights and decision-making.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">AI Strategy</h3>
              <p className="text-gray-600 mt-2">Leverage the latest in AI to automate processes and drive intelligent growth in your business.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Build and Deploy Applications</h3>
              <p className="text-gray-600 mt-2">From ideation to deployment, we develop modern applications that drive innovation and growth.</p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mt-24 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Process</h2>
          <p className="text-gray-600 text-lg mb-6">
            Our consultative approach ensures each engagement is rooted in strategy, deeply aligned with business outcomes, and delivered with technical excellence from discovery to deployment.
          </p>
          <Link href="/process" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md text-lg transition">
            Explore Our Process
          </Link>
        </section>

        {/* Call to Action Section */}
        <section className="text-center max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how our expertise in cloud, data, AI, and application development can accelerate your digital journey and drive meaningful growth.
          </p>
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md text-lg transition inline-block">
            Get In Touch
          </Link>
        </section>

      </main>

      <Footer />
    </div>
  );
}
