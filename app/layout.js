import "./globals.css";
import Navbar from "@/components/Navbar"; // Import your fancy navbar

export const metadata = {
  title: "DIAMANTRA | Indian Haute Joaillerie",
  description: "Timeless luxury Indian jewellery handcrafted by master artisans. Heritage meets haute couture in every piece.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gradient-to-b from-gray-50 to-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          
          {/* ADD YOUR NAVBAR HERE */}
          <Navbar />
          
          {/* Main Content */}
          <main className="flex-grow relative">
            {/* Subtle dot pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-black text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                
                {/* Brand Column */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-yellow-500 mb-2">DIAMANTRA</h2>
                    <h2 className="text-3xl font-bold text-yellow-500 mb-2">DiaMantra</h2>
                    <p className="text-sm tracking-widest text-yellow-400">FINE JEWELLERY</p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Heritage Indian jewellery reimagined for the contemporary connoisseur.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-yellow-400 font-semibold mb-4">EXPLORE</h3>
                  <ul className="space-y-2">
                    <li><a href="/products" className="text-gray-400 hover:text-yellow-400 transition-colors">Collections</a></li>
                    <li><a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</a></li>
                    <li><a href="/products" className="text-gray-400 hover:text-yellow-400 transition-colors">Products</a></li>
                    <li><a href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</a></li>
                  </ul>
                </div>
                {/* Contact Info */}
                <div>
                  <h3 className="text-yellow-400 font-semibold mb-4">CONTACT</h3>
                  <div className="text-gray-400 text-sm space-y-2">
                    <p>28, Heritage Street</p>
                    <p>Mumbai 400001, India</p>
<<<<<<< HEAD
                    <p>+91 99371 91669</p>
                    <p>info@diamantrajewellery.com</p>
=======
                    <p>+91 22 1234 5678</p>
                    <p>info@diamantra.com</p>
>>>>>>> b8fedfa3ef707d02e29a0015bee0c48cadc1e406
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gray-800 my-6"></div>

              {/* Bottom Bar */}
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <div>
<<<<<<< HEAD
                  © {new Date().getFullYear()} DIAMANTRA Jewellery. All rights reserved.
                </div>
                <div className="flex space-x-4 mt-2 md:mt-0">
                  <a href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy</a>
                  <a href="/terms" className="hover:text-yellow-400 transition-colors">Terms</a>
                  <a href="/sitemap" className="hover:text-yellow-400 transition-colors">Sitemap</a>
=======
                  © {new Date().getFullYear()} DiaMantra. All rights reserved.
>>>>>>> b8fedfa3ef707d02e29a0015bee0c48cadc1e406
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
