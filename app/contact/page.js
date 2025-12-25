export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-bold text-yellow-500">Contact Us</h1>
          <p className="mt-4 text-gray-300">Get in touch with our team</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-600"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-600"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-600"
                  placeholder="Inquiry about..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-600"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">123 Anima Nagar<br />New Delhi</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">+91 99371 91669</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">info@luxejewellery.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 10:00 AM - 7:00 PM<br />Saturday: 10:00 AM - 6:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <p className="text-gray-500">Map Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}