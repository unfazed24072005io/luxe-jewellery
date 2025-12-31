import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

// Fetch functions remain the same
async function getProducts() {
  try {
    // First, get products
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const products = productsSnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      slug: doc.data().slug || doc.data().name?.toLowerCase().replace(/\s+/g, '-') || doc.id
    }));
    
    // Then, get collections
    const collectionsSnapshot = await getDocs(collection(db, 'collections'));
    const collections = collectionsSnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data()
    }));
    
    return { products, collections };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { products: [], collections: [] };
  }
}



// Static data arrays remain the same
const navigationItems = [
  { icon: "/figmaAssets/frame-3.svg", label: "All Jewellery" },
  { icon: "/figmaAssets/frame-6.svg", label: "Gold" },
  { icon: "/figmaAssets/frame-7.svg", label: "Silver" },
  { icon: "/figmaAssets/frame.svg", label: "Enamel" },
  { icon: "/figmaAssets/frame-1.svg", label: "Diamantra Special" },
  { icon: "/figmaAssets/frame-4.svg", label: "Charms" },
  { icon: "/figmaAssets/frame-4.svg", label: "Lab Diamond" },
  { icon: "/figmaAssets/frame.svg", label: "More" },
];

const mensCategories = [
  { title: "Rings", subtitle: "Minimal Edge" },
  { title: "Chains", subtitle: "Urban Luxe" },
  { title: "Bracelets", subtitle: "Power Fit" },
  { title: "Studs", subtitle: "Clean Statement" },
];

const socialCards = [
  { hashtag: "#ApniKahani", caption: "From desk to dinner", rotation: "-11deg", left: "-98px", top: "381px" },
  { hashtag: "#MenOfDiamantra", caption: "Not bling. Just balance.", rotation: "-5deg", left: "232px", top: "134px" },
  { hashtag: "#DailyEdge", caption: "Silver. Sharp. Statement", rotation: "0deg", left: "calc(50% - 147px)", top: "120px" },
  { hashtag: "#LetsGetReal", caption: "Lab diamonds > mined guilt.", rotation: "5deg", left: "918px", top: "135px" },
  { hashtag: "#MenOfDiamantra", caption: "Not bling. Just balance.", rotation: "11deg", left: "1245px", top: "182px" },
];

const magazineCards = [
  {
    logo: "/figmaAssets/image-1.png",
    logoClasses: "top-[35px] left-14 w-[147px] h-[74px]",
    text: "Diamantra nails the Gen Z brief — think modern silhouettes, gender-inclusive styles, and conscious luxury designed for real life.",
    textColor: "text-[#bfbfbf]",
    borderRadius: "rounded-[20px]",
    position: "top-[303px] left-0",
  },
  {
    logo: "/figmaAssets/image-2.png",
    logoClasses: "top-10 left-2.5 w-[213px] h-[63px]",
    text: "With its blend of affordable elegance and lab-grown diamond purity, Diamantra is fast becoming the go-to brand for young Indians seeking meaningful jewellery.",
    textColor: "text-[#bfbfbf]",
    borderRadius: "rounded-[10px_20px_20px_10px]",
    position: "top-[303px] left-[328px]",
  },
  {
    logo: "/figmaAssets/image-5.png",
    logoClasses: "top-[57px] left-[19px] w-[171px] h-[45px] object-cover",
    text: "Diamantra is redefining modern luxury for a new generation blending lab-grown brilliance with sleek silver artistry that feels fresh, wearable, and unapologetically personal.",
    textColor: "text-[#606060]",
    borderRadius: "rounded-[10px_20px_20px_10px]",
    position: "top-[273px] left-[656px]",
  },
  {
    logo: "/figmaAssets/image-4.png",
    logoClasses: "top-[49px] left-[13px] w-[172px] h-[59px] object-cover",
    text: "Minimal yet expressive, Diamantra's pieces speak directly to the style-forward woman who loves her jewellery clean, conscious, and contemporary.",
    textColor: "text-[#bfbfbf]",
    borderRadius: "rounded-[10px_20px_20px_10px]",
    position: "top-[303px] left-[984px]",
  },
];

const testimonials = [
  {
    name: "ANANYA, 25",
    location: "MARKETING EXECUTIVE, BANGALORE",
    review: "The Twilight Studs are literally my everyday glow.\nI've worn them to office, brunch, and even date night — they still look brand new. I love that it's lab-grown diamonds, not mined guilt.\"",
    avatarBg: "bg-color-3",
  },
  {
    name: "RHEA, 22",
    location: "STUDENT, DELHI",
    review: "Got my first 'real' jewellery from Diamantra — and it actually feels like me. Not too flashy, just elegant. Also… silver + rose gold plating? chef's kiss 💋",
    avatarBg: "bg-color-3",
  },
  {
    name: "MITALI, 27",
    location: "ARCHITECT, MUMBAI",
    review: "It's rare to find jewellery that tells a story.\nMine says: strong, simple, sustainable.\nThe Celestial Arc hoops make me feel put together even on chaotic days.",
    avatarBg: "bg-font-color-shade-2",
  },
  {
    name: "S. BANERJEE",
    location: "ACADEMIC DIRECTOR, TECHNO GROUP INSTITUTIONS",
    review: "I never wore jewellery before this.\nThe 'Daily Edge' bracelet just fits — no noise, no flash, just vibe.\nYou know it's quality when it feels light but looks premium.",
    avatarBg: "bg-font-color-shade-2",
  },
];

const features = [
  { icon: "/figmaAssets/group-194-1.png", text: "Certified Lab Diamonds" },
  { icon: "/figmaAssets/group-194.png", text: "Lifetime Polishing" },
  { icon: "/figmaAssets/group-194-3.png", text: "925 Sterling Silver" },
  { icon: "/figmaAssets/group-194-2.png", text: "Free Shipping & Warranty" },
];

// RESPONSIVE COMPONENTS WITH ALL FEATURES

const TeamSection = () => {
  return (
    <section className="w-full bg-[#f9f5f0] py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          <div className="flex flex-col">
            <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-black text-[60px] md:text-[100px] lg:text-[148px] tracking-[-2px] md:tracking-[-6px] lg:tracking-[-8.88px] leading-[60px] md:leading-[100px] lg:leading-[146px]">
              Why
            </h2>
            <h2 className="bg-[linear-gradient(137deg,rgba(212,139,0,1)_0%,rgba(110,72,0,1)_32%,rgba(212,139,0,1)_67%,rgba(212,139,0,1)_88%,rgba(110,72,0,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Rische-Demo',Helvetica] font-normal text-transparent text-[60px] md:text-[100px] lg:text-[148px] tracking-[-2px] md:tracking-[-6px] lg:tracking-[-8.88px] leading-[60px] md:leading-[100px] lg:leading-[146px]">
              Diamantra
            </h2>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-x-12 lg:gap-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <img className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[121px] lg:h-[121px]" alt={feature.text} src={feature.icon} />
                  <p className="w-full max-w-[161px] [font-family:'Inter',Helvetica] font-medium text-black text-sm md:text-base text-center tracking-[-0.96px] leading-[30px] md:leading-[68px]">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-full bg-[#dad0c4] rounded-[2.5px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[5px] bg-[#dad0c4] rounded-[2.5px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CallToActionSection = ({ products }) => {
  return (
    <section className="w-full py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-8 lg:mb-16">
          <div className="mb-6 lg:mb-0 lg:max-w-2xl">
            <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-black text-3xl md:text-4xl lg:text-[41px] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-2.46px] leading-tight mb-4 lg:mb-6">
              Featured for you
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-0.5 h-6 md:h-8 bg-color-1/30"></div>
              <p className="[font-family:'Inter',Helvetica] font-medium text-color-1 text-base md:text-lg tracking-wide leading-relaxed">
                Handpicked sparkle from our latest drops and trending picks.
              </p>
            </div>
          </div>
          
          <Link href="/products" className="mt-4 lg:mt-0">
            <Button className="relative w-[152px] h-[42px] bg-[#d48b00] hover:bg-[#c07f00] rounded-[100px] p-0 transition-all duration-300 hover:scale-105">
              <div className="absolute top-1 left-1 w-[142px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
              <span className="left-[calc(50.00%_-_49px)] absolute top-[13px] [font-family:'Inter',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal]">
                View All
              </span>
              <div className="absolute top-[19px] left-0.5 w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
              <div className="absolute top-[19px] left-[143px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-20">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="group">
              <Link href={`/products/${product.slug}`}>
                <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    {product.image ? (
                      <img 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={product.title} 
                        src={product.image} 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
                        <div className="text-gray-400 text-sm">No Image</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 p-4 md:p-5 flex flex-col">
                    <div className="mb-4">
                      <h3 className="[font-family:'Inter',Helvetica] font-semibold text-black text-sm md:text-base tracking-tight mb-2 line-clamp-2">
                        {product.title || product.name}
                      </h3>
                      <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-4">
                        {product.originalPrice && (
                          <span className="text-gray-400 text-xs md:text-sm line-through [font-family:'Inter',Helvetica] font-medium">
                            {product.originalPrice}
                          </span>
                        )}
                        <span className="text-lg md:text-xl [font-family:'Inter',Helvetica] font-bold text-color-1">
  ₹{product.price}
</span>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full h-10 md:h-12 flex items-center justify-center gap-2 md:gap-3 rounded-xl border-2 border-black bg-transparent hover:bg-black hover:text-white transition-all duration-300"
                      >
                        <span className="[font-family:'Inter',Helvetica] font-bold text-xs md:text-sm tracking-wider">
                          BUY NOW
                        </span>
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => {
  return (
    <section className="w-full relative">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-center py-8 md:py-[59px]">
          <div className="w-full max-w-7xl px-4 flex flex-col items-start gap-8 md:gap-[45px]">
            <div className="w-full flex items-center justify-between">
              <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-black text-2xl md:text-3xl lg:text-[41px] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-2.46px] leading-tight">
                Proof That Real Looks This Good
              </h2>
            </div>
            
            <div className="flex items-center gap-4 md:gap-5 w-full overflow-x-auto pb-4">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[400px] bg-[#f9f5f0] rounded-[20px] shadow-lg border-0">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col items-start gap-4 md:gap-[26px]">
                      <div className="flex items-center gap-2.5 w-full">
                        <div className={`w-10 h-10 md:w-[52px] md:h-[52px] ${testimonial.avatarBg} rounded-full`} />
                        <div className="flex flex-col items-start gap-1 md:gap-2 flex-1">
                          <div className="[font-family:'Inter',Helvetica] font-semibold text-tertiary-colortertiary-color-shade-1 text-xs md:text-sm tracking-[0.56px] leading-[18px]">
                            {testimonial.name}
                          </div>
                          <div className="[font-family:'Inter',Helvetica] font-semibold text-tertiary-colortertiary-color-shade-3 text-[10px] tracking-[0.40px] leading-[15px]">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                      <Separator className="w-full" />
                      <p className="min-h-[95px] font-INTER-SEMI-BOLD-PARAGRAPH-1-medium-16px font-[number:var(--INTER-SEMI-BOLD-PARAGRAPH-1-medium-16px-font-weight)] text-tertiary-colortertiary-color-shade-3 text-sm md:text-[length:var(--INTER-SEMI-BOLD-PARAGRAPH-1-medium-16px-font-size)] tracking-[var(--INTER-SEMI-BOLD-PARAGRAPH-1-medium-16px-letter-spacing)] leading-[var(--INTER-SEMI-BOLD-PARAGRAPH-1-medium-16px-line-height)] whitespace-pre-line">
                        {testimonial.review}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center bg-color-3 py-8 md:py-[66px]">
          <div className="flex flex-col items-center gap-6 md:gap-[30px] w-full max-w-[491px] px-4">
            <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
              <h2 className="font-INTER-SEMI-BOLD-h2-semi-bold-34px font-[number:var(--INTER-SEMI-BOLD-h2-semi-bold-34px-font-weight)] text-neutral-colorneutral-color-shade-1 text-2xl md:text-3xl lg:text-[length:var(--INTER-SEMI-BOLD-h2-semi-bold-34px-font-size)] text-center tracking-[var(--INTER-SEMI-BOLD-h2-semi-bold-34px-letter-spacing)] leading-tight">
                Ready to Glow Up?
              </h2>
              <p className="font-INTER-SEMI-BOLD-h5-semi-bold-20px font-[number:var(--INTER-SEMI-BOLD-h5-semi-bold-20px-font-weight)] text-neutral-colorneutral-color-shade-1 text-base md:text-lg lg:text-[length:var(--INTER-SEMI-BOLD-h5-semi-bold-20px-font-size)] text-center">
                Thousands already have their sparkle. Time to get yours with Diamantra.
              </p>
            </div>
            <Link href="/products">
              <Button className="relative h-[42px] w-[165px] bg-[#d48b00] rounded-[100px] hover:bg-[#d48b00]/90">
                <div className="absolute inset-1 rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
                <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">Shop Now</span>
                <div className="absolute top-[19px] left-0.5 w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
                <div className="absolute top-[19px] left-[156px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="w-full bg-black py-12 md:py-[61px] px-4 md:px-14 relative h-500px">
      <h2 className="max-w-[864px] mx-auto [font-family:'Rische-Demo',Helvetica] font-normal text-white text-3xl md:text-5xl lg:text-[70px] text-center tracking-[-1px] md:tracking-[-3px] lg:tracking-[-4.20px] leading-tight md:leading-[66px] mb-8 md:mb-[80px] lg:mb-[242px]">
        As Seen In Leading Fashion & Lifestyle Magazines
      </h2>
      <div className="relative w-full mb-8 md:mb-[235px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {magazineCards.slice(0, 4).map((card, index) => (
            <div key={index} className="w-full h-[307px]">
              <Card className={`w-full h-full bg-[#eeeeee] border-0 ${card.borderRadius}`}>
                <CardContent className="relative w-full h-full p-0">
                  <img className={`absolute ${card.logoClasses}`} alt="Magazine logo" src={card.logo} />
                  <div className={`absolute top-44 left-[19px] w-[206px] [font-family:'Inter',Helvetica] font-semibold ${card.textColor} text-sm tracking-[-0.28px] leading-[18px]`}>
                    {card.text}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Component
export default async function Diamantra() {
  
  const { products, collections } = await getProducts();
  const categories = collections.map((collection, index) => ({
    id: collection.id,
    name: collection.name || collection.title || `Collection ${index + 1}`,
    topIcon: index === 0 || index === collections.length - 1,
    slug: collection.slug || collection.id,
    image: collection.image || collection.imageUrl || null
  }));

  return (
    <div className="bg-white w-full relative">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[350px] md:h-[500px] bg-gray-900 top-[0px] bottom-[50px] py-20">
        <div className="absolute inset-0 bg-grey/70 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0"></div>
        </div>

        <div className="relative z-10 px-4 py-12 md:py-0 md:px-0 h-full flex flex-col justify-center md:block">
          <h1 className="text-3xl md:text-4xl lg:text-[65px] [font-family:'Rische-Demo',Helvetica] font-normal text-white text-center tracking-[-1px] md:tracking-[-3.90px] leading-tight md:leading-[68px] px-4 md:px-0">
            Shine in Your Story<br />Crafted in Silver, Set in Soul.
          </h1>
          <p className="text-xs md:text-xs [font-family:'Inter',Helvetica] font-semibold text-white text-center tracking-[1px] md:tracking-[2.52px] mt-4">
            LAB-GROWN BRILLIANCE MEETS TIMELESS SILVER ELEGANCE.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/collections">
              <Button className="relative w-[152px] h-[42px] bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 cursor-pointer transition-all duration-200">
                <div className="absolute top-1 left-1 w-[142px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
                <span className="absolute top-[13px] left-[18px] [font-family:'Inter',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal]">
                  Shop the Collection
                </span>
              </Button>
            </Link>
            
            <Link href="/about">
              <Button className="relative w-[152px] h-[42px] bg-black rounded-[100px] hover:bg-[#1a1a1a] p-0 cursor-pointer transition-all duration-200 border border-gray-800">
                <div className="w-[142px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#b2b2b2] absolute top-1 left-1" />
                <span className="absolute top-[13px] left-[27px] [font-family:'Inter',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal]">
                  Watch Our Story
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-[46px]">
            <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-black text-2xl md:text-3xl lg:text-[41px] tracking-[-1px] md:tracking-[-2.46px] leading-tight mb-4 md:mb-0">
              Shop by Category
            </h2>
            <Link href="/collections">
              <Button className="relative w-[152px] h-[42px] bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 transition-all duration-300">
                <div className="absolute top-1 left-1 w-[142px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
                <span className="left-[calc(50.00%_-_49px)] absolute top-[13px] [font-family:'Inter',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal]">
                  More Categories
                </span>
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {categories.slice(0, 5).map((category) => (
              <Link key={category.id} href={`/collections/${category.slug}`} className="group">
                <div className="w-full h-[280px] md:h-[330px] rounded-[20px] overflow-hidden relative transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl">
                  <div className="absolute inset-0">
                    {category.image ? (
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  
                  <div className="relative h-full flex flex-col justify-between p-6 z-10">
                    {category.topIcon && (
                      <div className="flex justify-center -mt-4">
                        <img 
                          className="h-[20px] md:h-[25px] w-auto filter drop-shadow-lg" 
                          alt={category.name} 
                          src="/figmaAssets/vector-14.svg" 
                        />
                      </div>
                    )}
                    
                    <div className={`flex flex-col items-center ${category.topIcon ? 'mb-4' : 'mt-auto'}`}>
                      <div className="h-5 [font-family:'Rische-Demo',Helvetica] font-normal text-white text-xl md:text-2xl lg:text-[28px] tracking-[0] leading-[33px] text-center drop-shadow-lg">
                        {category.name}
                      </div>
                    </div>
                    
                    {!category.topIcon && (
                      <div className="flex justify-center pb-4">
                        <img 
                          className="h-[20px] md:h-[25px] w-auto filter drop-shadow-lg" 
                          alt={category.name} 
                          src="/figmaAssets/vector-11.svg" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. For Her & For Him Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* For Her */}
            <div className="relative h-[400px] md:h-[452px] rounded-[20px] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-pink-900/60">
                <img 
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="For Her Collection"
                  className="w-full h-full object-cover mix-blend-overlay opacity-70"
                />
              </div>
              <div className="relative h-full p-6 md:p-[60px] flex flex-col justify-end z-10">
                <div className="flex flex-col items-start gap-4 md:gap-[26px]">
                  <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-white text-4xl md:text-5xl lg:text-7xl tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4.32px] leading-tight">
                    For Her
                  </h2>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-white text-base md:text-[17px]">
                    Grace with Edge
                  </p>
                  <Link href="/products?category=women">
                    <Button className="relative w-[152px] h-[42px] bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-[100px] p-0">
                      <span className="absolute inset-1 rounded-[100px] border-[0.8px] border-solid border-pink-400 pointer-events-none" />
                      <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">
                        Shop Now
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* For Him */}
            <div className="relative h-[400px] md:h-[452px] rounded-[20px] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-gray-900/60">
                <img 
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="For Him Collection"
                  className="w-full h-full object-cover mix-blend-overlay opacity-70"
                />
              </div>
              <div className="relative h-full p-6 md:p-[60px] flex flex-col justify-end z-10">
                <div className="flex flex-col items-start gap-4 md:gap-[26px]">
                  <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-white text-4xl md:text-5xl lg:text-7xl tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4.32px] leading-tight">
                    For Him
                  </h2>
                  <p className="[font-family:'Inter',Helvetica] font-normal text-white text-base md:text-[17px]">
                    The Bold Move
                  </p>
                  <Link href="/products?category=men">
                    <Button className="relative w-[152px] h-[42px] bg-gradient-to-r from-blue-600 to-gray-800 hover:from-blue-700 hover:to-gray-900 rounded-[100px] p-0">
                      <span className="absolute inset-1 rounded-[100px] border-[0.8px] border-solid border-blue-400 pointer-events-none" />
                      <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">
                        Shop Now
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Video Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12">
  <div className="max-w-7xl mx-auto">
    <div className="relative w-full h-[300px] md:h-[470px] bg-color-3 rounded-[20px] overflow-hidden">
      {/* YouTube jewellery video embed */}
      <iframe
        className="w-full h-full object-cover"
        src="https://www.youtube.com/watch?v=bghqsXZpkGM"
        title="Luxury Jewellery Showcase - Diamond Collection"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        frameBorder="0"
        loading="lazy"
      ></iframe>
      
      {/* Optional: Overlay with play button that disappears on click */}
      <div 
        id="video-overlay"
        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent cursor-pointer transition-opacity duration-500 hover:opacity-80"
        onClick={(e) => {
          const overlay = e.currentTarget;
          overlay.style.opacity = '0';
          setTimeout(() => {
            overlay.style.display = 'none';
          }, 500);
          
          // Force play if autoplay didn't work
          const iframe = overlay.previousElementSibling;
          if (iframe) {
            const src = iframe.src;
            if (!src.includes('autoplay=1')) {
              iframe.src = src.replace('autoplay=0', 'autoplay=1');
            }
          }
        }}
      >
        <div className="mb-4">
          <img 
            className="w-[70px] h-[100px] md:w-[98px] md:h-[98px] hover:scale-110 transition-transform duration-300" 
            alt="Play button" 
            src="/figmaAssets/group-1597880478.png" 
          />
        </div>
        <p className="text-white text-lg md:text-xl font-light tracking-wide mt-2">
          Click to play
        </p>
      </div>
      
      <h2 className="absolute bottom-0 md:bottom-0 left-6 md:left-80 [font-family:'Rische-Demo',Helvetica] font-normal text-white text-xl md:text-3xl lg:text-[41px] tracking-[-1px] md:tracking-[-2.46px] drop-shadow-lg z-10">
        3D Product Video — Exclusive Collection
      </h2>
    </div>
    
    {/* Video description (optional) */}
    <div className="mt-4 text-center text-gray-600 text-sm">
      <p>Showing: Luxury Diamond Jewellery Collection 2024</p>
    </div>
  </div>
</section>

      {/* 5. Featured Products */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <CallToActionSection products={products} />
      </section>

      {/* 6. Video Cards Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Women Video */}
            <div className="relative w-full h-[300px] md:h-[470px] rounded-[25px] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-pink-800/80"></div>
              <img 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] md:w-[98px] md:h-[98px] z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 cursor-pointer" 
                alt="Play button" 
                src="/figmaAssets/group-1597880479-1.png" 
              />
              <h3 className="absolute bottom-6 md:bottom-10 left-6 md:left-10 [font-family:'Rische-Demo',Helvetica] font-normal text-white text-xl md:text-3xl lg:text-[41px] tracking-[-1px] md:tracking-[-2.46px] drop-shadow-lg z-10">
                For Women
              </h3>
            </div>

            {/* Men Video */}
            <div className="relative w-full h-[300px] md:h-[470px] rounded-[25px] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-gray-800/80"></div>
              <img 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] md:w-[98px] md:h-[98px] z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 cursor-pointer" 
                alt="Play button" 
                src="/figmaAssets/group-1597880479.png" 
              />
              <h3 className="absolute bottom-6 md:bottom-10 left-6 md:left-10 [font-family:'Rische-Demo',Helvetica] font-normal text-white text-xl md:text-3xl lg:text-[41px] tracking-[-1px] md:tracking-[-2.46px] drop-shadow-lg z-10">
                For Men
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Diamantra */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <TeamSection />
      </section>

      <section className="w-full bg-gradient-to-br from-black via-gray-900 to-black py-12 md:py-16 relative overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0">
    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#d48b00]/10 to-transparent rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-gray-800/20 to-transparent rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
      {/* Left Column - Text & CTA */}
      <div className="lg:w-1/2">
        <div className="relative">
          <div className="absolute -left-4 -top-4 w-2 h-12 bg-gradient-to-b from-[#d48b00] to-yellow-700 rounded-full"></div>
          <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-white text-4xl md:text-5xl lg:text-[70px] tracking-[-1px] md:tracking-[-3px] lg:tracking-[-4.20px] leading-tight mb-4">
            For Men Who<br />
            <span className="relative">
              <span className="bg-gradient-to-r from-[#d48b00] via-yellow-500 to-[#d48b00] bg-clip-text text-transparent animate-pulse">
                Move Different
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#d48b00] to-transparent"></span>
            </span>
          </h2>
        </div>
        
        <p className="[font-family:'Inter',Helvetica] font-medium text-gray-300 text-base md:text-lg mb-8 max-w-lg">
          Minimal. Bold. Purposeful. Jewellery that speaks without shouting.
        </p>
        
        <Link href="/products" className="inline-block group">
          <Button className="relative w-[170px] h-[48px] bg-gradient-to-r from-[#d48b00] to-yellow-700 hover:from-yellow-700 hover:to-[#d48b00] rounded-[100px] p-0 transition-all duration-500 hover:scale-105 group-hover:shadow-[0_0_30px_rgba(212,139,0,0.3)]">
            <div className="absolute inset-1 rounded-[100px] border-[1px] border-solid border-yellow-400/50 group-hover:border-yellow-400 transition-all duration-500"></div>
            <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-sm tracking-[0.5px] flex items-center gap-2">
              Explore Collection
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute top-[22px] left-3 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute top-[22px] right-3 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-75 animation-delay-200"></div>
          </Button>
        </Link>
      </div>

      {/* Right Column - Interactive Cards */}
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {mensCategories.map((category, index) => (
            <Link 
              key={index} 
              href={`/products`}
              className="group"
            >
              <div className="relative">
                {/* Animated border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#d48b00] via-gray-700 to-gray-900 rounded-[22px] blur opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:duration-200"></div>
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-[20px] p-5 transition-all duration-500 group-hover:scale-105 group-hover:border-gray-600 group-hover:shadow-2xl group-hover:shadow-[#d48b00]/10 h-[200px] md:h-[232px] flex flex-col items-center justify-center">
                  
                  {/* Icon container with glow effect */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d48b00]/20 to-transparent rounded-full blur-xl"></div>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl flex items-center justify-center group-hover:border-[#d48b00]/50 transition-all duration-500">
                      <div className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-500">
                        {index === 0}
                      </div>
                    </div>
                    
                    {/* Floating particle effect */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#d48b00] rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
                  </div>
                  
                  {/* Text content */}
                  <div className="text-center">
                    <h3 className="[font-family:'Inter',Helvetica] font-bold text-white text-base md:text-lg mb-1 group-hover:text-yellow-100 transition-colors">
                      {category.title}
                    </h3>
                    <p className="[font-family:'Inter',Helvetica] font-medium text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {category.subtitle}
                    </p>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-0.5 bg-[#d48b00] rounded-full animate-pulse"></div>
                      <div className="w-6 h-0.5 bg-[#d48b00] rounded-full"></div>
                      <div className="w-2 h-0.5 bg-[#d48b00] rounded-full animate-pulse animation-delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Stats bar */}
        
      </div>
    </div>
  </div>
</section>
      {/* 9. As Seen In */}
      <section className="w-full top-100">
        <FeaturesSection />
      </section>

      {/* 10. Social Cards Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-black text-3xl md:text-5xl lg:text-[70px] text-center tracking-[-1px] md:tracking-[-3px] lg:tracking-[-4.20px] leading-tight mb-8 md:mb-16">
            Real People. Real Shine.
          </h2>
          
          {/* Social Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 relative">
            {socialCards.map((card, index) => (
              <div 
                key={index} 
                className="relative w-full h-[350px] transform hover:scale-105 transition-transform duration-300"
                style={{ transform: `rotate(${card.rotation})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[20px] shadow-2xl overflow-hidden">
                  <div className="relative h-full p-6">
                    <p className="absolute top-8 left-1/2 transform -translate-x-1/2 [font-family:'Inter',Helvetica] font-medium text-white text-sm tracking-[-0.56px] whitespace-nowrap bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                      {card.hashtag}
                    </p>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[189px] md:h-[189px] rounded-full overflow-hidden border-4 border-white/20">
                      <div className="bg-blue">
                        
                      </div>
                    </div>
                    
                    <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center [font-family:'Inter',Helvetica] font-medium text-white text-base md:text-xl tracking-[-0.80px] leading-[25px] w-full px-4">
                      {card.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 md:mt-16">
            <Link href="https://instagram.com/yourbrand" target="_blank">
              <Button className="relative w-[165px] h-[42px] bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 transition-all duration-300 hover:scale-105">
                <div className="w-[155px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46] absolute top-1 left-1" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 [font-family:'Inter',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal]">
                  Tag us to get featured.
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Testimonials & Final CTA */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <StepsSection />
      </section>
    </div>
  );
}
