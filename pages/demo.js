    // pages/demo.js
    import { useState } from 'react';
    import Header from '../components/Header'; // Adjust path if needed
    import Footer from '../components/Footer'; // Adjust path if needed
    import { Mail, Phone, MapPin } from 'lucide-react'; // Using lucide-react for icons

    export default function ContactPage() {
      // State for form fields
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [subject, setSubject] = useState('');
      const [message, setMessage] = useState('');
      const fromPage = 'RequestDemo';

      // State for submission status
      const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'
      const [statusMessage, setStatusMessage] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setStatus('loading');
        setStatusMessage('Sending message...');

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, subject, message, fromPage }),
          });

          const result = await response.json();

          if (response.ok) {
            setStatus('success');
            setStatusMessage('Demo Request sent successfully! We will get back to you soon.');
            // Clear form fields on success
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
          } else {
            setStatus('error');
            setStatusMessage(result.message || 'An error occurred. Please try again.');
          }
        } catch (error) {
          console.error('Submission error:', error);
          setStatus('error');
          setStatusMessage('An error occurred while sending the message. Please try again.');
        }
      };

      return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow container mx-auto px-4 sm:px-6 py-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-10">
              Request a Free Live AI Demo
            </h1>
            <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
              Let us show you how AI can work for you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Contact Information Section */}
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch Directly</h2>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Our Office</h3>
                    <p className="text-gray-600">
                      44679 Endicott Dr Suite 988 <br />
                      Ashburn, VA 20147<br />
                      United States
                    </p>
                     {/* Optional: Add a Google Maps embed link/iframe here */}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                    <a href="mailto:info@forgemission.com" className="text-blue-600 hover:text-blue-800 transition"> 
                      info@forgemission.com
                    </a>
                    <p className="text-gray-600 text-sm mt-1">For general inquiries</p>
                     <a href="mailto:careers@forgemission.com" className="text-blue-600 hover:text-blue-800 transition"> 
                      careers@forgemission.com
                    </a>
                     <p className="text-gray-600 text-sm mt-1">For career opportunities</p>
                  </div>
                </div>
                 {/*}<div className="flex items-start space-x-4">
                   <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                   <div>
                     <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                     <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800 transition"> 
                       +1 (555) 123-4567
                     </a>
                     <p className="text-gray-600 text-sm mt-1">Mon - Fri, 9am - 5pm EST</p>
                   </div> 
                 </div>*/}
              </div>

              {/* Contact Form Section */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="You"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Demo Focus Area <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="" disabled>Select a Use Case</option>
                      <option value="Customer Service Automation">Customer Service Automation</option>
                      <option value="Marketing & Sales Optimization">Marketing & Sales Optimization</option>
                      <option value="Operations & Admin Automation">Operations & Admin Automation</option>
                      <option value="Inventory & Demand Forecasting">Inventory & Demand Forecasting</option>
                      <option value="Social Media Content Automation">Social Media Content Automation</option>
                      <option value="Another Workflow">Another Workflow</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      What are you trying to improve? <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="My biggest pain is..."
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        status === 'loading'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {status === 'loading' ? 'Requesting...' : 'Request Demo'}
                    </button>
                  </div>

                  {/* Status Message Display */}
                  {status && (
                    <div
                      className={`mt-4 p-3 rounded-md text-sm ${
                        status === 'success' ? 'bg-green-100 text-green-800' : ''
                      } ${
                        status === 'error' ? 'bg-red-100 text-red-800' : ''
                      } ${
                        status === 'loading' ? 'bg-blue-100 text-blue-800' : ''
                      }`}
                    >
                      {statusMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      );
    }
    
