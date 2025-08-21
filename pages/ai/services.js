// pages/ai.js
import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

const trackEvent = (eventName, eventData) => {
  console.log('Analytics Event:', eventName, eventData);
  window.gtag('event', eventName, eventData);
};

const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default function AIServicePage() {
  return (
    <div className="text-gray-900 bg-white scroll-smooth">
      <Head>
        <title>Building Real AI Solutions</title>
        <meta name="description" content="Agentic AI workflows, RAG, self-hosted models and more for technology consulting companies." />
      </Head>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Don’t just use AI — <span className="text-blue-400">own</span> your AI workflows.</h1>
        <p className="text-lg md:text-xl max-w-xl mb-6">
          We help businesses like yours go from AI-curious to AI-operational with real workflows, agents, and private models. Our team will work with your team to build Together!
        </p>
        <Link href="#journey" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all">
          See How It Works
        </Link>
      </section>

      <Separator />

      {/* The Shift Section */}
      <section id="journey" className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white text-gray-800">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">From Tools to Transformation - We Empower You</h2>
          <p className="text-lg mb-8">
            Your clients are asking about AI. Bolt-on tools won’t cut it. You need systems that integrate deeply and deliver results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border rounded-xl bg-gray-50">
              <h3 className="font-semibold mb-2">❌ ChatGPT Experiments</h3>
              <ul className="list-disc list-inside text-left">
                <li>Unstable, no ownership</li>
                <li>No integration with workflows</li>
                <li>Compliance and data risks</li>
              </ul>
            </div>
            <div className="p-6 border rounded-xl bg-blue-50">
              <h3 className="font-semibold mb-2">✅ Agentic Systems</h3>
              <ul className="list-disc list-inside text-left">
                <li>Custom agents for real tasks</li>
                <li>Private RAG & model hosting</li>
                <li>Owned data + control</li>
              </ul>
            </div>
          </div>
          <a href="#problems" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all">
            Problems We Solve
          </a>
        </div>
      </section>

      <Separator />

      {/* Problems We Solve */}
      <section id="problems" className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-50 text-gray-900">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-10">Problems We Solve - Building Together</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded-xl shadow">
              <p>❌ You’ve tried integrating APIs but nothing’s sticky.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <p>❌ Your team lacks GPU infra or LLM experience.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <p>❌ You can’t justify high SaaS AI costs to your clients.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <p>✅ On-device and self-hosted AI solutions.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <p>✅ Agent workflows for support, onboarding, data processing.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <p>✅ Full AI pipelines with your own data and models.</p>
            </div>
          </div>
          <a href="#agentflow" className="mt-10 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all">
            Agentic Solutions
          </a>
        </div>
      </section>

      <Separator />

      {/* Agentic flow Section */}
      <section id="agentflow" className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white text-gray-900">
        <div className="max-w-5xl">
          <h2 className="text-3xl font-bold mb-6">Agents in Action - Designed by You</h2>
          <p className="mb-8 text-lg text-gray-700">Visualize agentic workflows integrating seamlessly into your business processes.</p>
          <div className="rounded-xl overflow-hidden shadow-lg mb-8">
            <img src="/images/automation-workflow.png" alt="AI Workflow System" className="w-full h-auto object-cover" />
          </div>
          <a href="#ragflow" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all">
            Augmented With Your Data
          </a>
        </div>
      </section>

      <Separator />

      {/* Rag flow Section */}
      <section id="ragflow" className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white text-gray-900">
        <div className="max-w-5xl">
          <h2 className="text-3xl font-bold mb-6">RAG Implemented - Built by You</h2>
          <p className="mb-8 text-lg text-gray-700">Securely Augment AI with Your Proprietary Context</p>
          <div className="rounded-xl overflow-hidden shadow-lg mb-8">
            <img src="/images/rag-flowchart.png" alt="AI Workflow System" className="w-full h-auto object-cover" />
          </div>
          <a href="#solution" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all">
            How We Do It
          </a>
        </div>
      </section>

      <Separator />

      {/* Our Solution */}
      <section id="solution" className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white text-gray-900">
        <div className="max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Your Solution: AI Built With You</h2>
          <p className="mb-12 text-lg">From architecture to implementation — we do it together - Empowering You. You own the outcomes.</p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">🔍 Understand</h3>
              <p>We audit your workflows and identify together AI opportunities that truly fit.</p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">⚙️ Build</h3>
              <p>We create agentic workflows, implement RAG, and integrate self-hosted or tuned models, working alongisde your team.</p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="text-xl font-semibold mb-2">🚀 Empower</h3>
              <p>We deploy, monitor, and train your team on AI systems you own and understand.</p>
            </div>
          </div>
          <a href="#cta" className="mt-10 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all">
            Let's Talk
          </a>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section id="cta" className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white text-gray-900">
        <h2 className="text-3xl font-bold mb-6">Ready to stop experimenting and start implementing?</h2>
        <p className="mb-6 text-lg">Let’s explore your AI roadmap together.</p>
        <a
          href="/demo"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-bold transition-all"
        >
          Book a Free AI Strategy Call
        </a>
      </section>
    </div>
  );
}

function Separator() {
  return (
    <div className="w-full h-1 overflow-hidden">
      <div className="animate-slide-horizontal w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
    </div>
  );
}

<style jsx>{`
  @keyframes slide-horizontal {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-slide-horizontal {
    animation: slide-horizontal 3s linear infinite;
  }
`}</style>
