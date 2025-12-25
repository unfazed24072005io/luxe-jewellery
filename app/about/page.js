export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-bold text-yellow-500">About LUXE</h1>
          <p className="mt-4 text-gray-300">Our story of craftsmanship and excellence</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Brand Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 1985, LUXE has been at the forefront of luxury jewellery design for over three decades. 
            Our journey began with a simple vision: to create timeless pieces that celebrate life's most precious moments.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Each piece in our collection is meticulously crafted by master artisans who bring decades of experience 
            and passion to their work. We source only the finest materials from around the world, ensuring that 
            every item meets our exacting standards of quality and beauty.
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Uncompromising quality in every detail</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Passion</h3>
              <p className="text-gray-600 text-sm">Love for the art of jewellery making</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">Building lasting relationships with our clients</p>
            </div>
          </div>
        </section>

        {/* Craftsmanship */}
        <section className="mb-16 bg-gray-50 p-8">
          <h2 className="text-3xl font-serif font-bold mb-6">Craftsmanship</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our master craftsmen combine traditional techniques passed down through generations with modern 
            technology to create pieces that are both timeless and contemporary. Every diamond is hand-selected, 
            every setting is carefully inspected, and every piece is individually finished to perfection.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We believe that true luxury lies not just in the materials we use, but in the skill and dedication 
            that goes into every piece we create.
          </p>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="text-center">
                <div className="bg-gray-200 w-40 h-40 rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg">Team Member {i}</h3>
                <p className="text-gray-600 text-sm">Master Craftsman</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}