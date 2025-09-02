// Purpose: Redesigned homepage inspired by a clean, heartfelt aesthetic.
import Link from "next/link";
import {
  HeartIcon,
  PencilIcon,
  QrCodeIcon,
} from "@/components/icons";

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-br from-blue-50 to-gray-50 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-serif font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Lora', serif" }}>
            Eternal Legacies, One Scan at a Time
          </h1>
          <p className="mt-4 text-lg text-gray-600" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
            Create a beautiful, lasting online memorial for your loved ones, linked by a simple QR code.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/dashboard" className="px-6 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-lg hover:bg-rose-600 transition-colors">
              Create a Memorial
            </Link>
            <Link href="/m/jane-doe" className="px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition-colors">
              View a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold text-gray-900" style={{ fontFamily: "'Lora', serif" }}>How It Works</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <QrCodeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">1. Get Your QR Code</h3>
              <p className="mt-2 text-gray-600">Receive a unique QR code to place on a headstone, urn, or memorial plaque.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-rose-100 p-4 rounded-full">
                <PencilIcon className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">2. Create the Memorial Page</h3>
              <p className="mt-2 text-gray-600">Easily build a beautiful tribute with photos, stories, and videos.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full">
                <HeartIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">3. Share Their Story</h3>
              <p className="mt-2 text-gray-600">Share the page with family and friends, creating a collective space for remembrance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Memorials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold text-gray-900" style={{ fontFamily: "'Lora', serif" }}>Featured Memorials</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Example Memorial 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform">
              <img src="https://images.unsplash.com/photo-1548535345-8c342f53cf08?q=80&w=200" alt="John Doe" className="w-full h-56 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Johnathan Doe</h3>
                <p className="mt-2 text-gray-600 italic">"A loving father, a devoted husband, and a friend to all. His laughter echoes in our hearts forever."</p>
              </div>
            </div>
            {/* Example Memorial 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200" alt="Jane Smith" className="w-full h-56 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
                <p className="mt-2 text-gray-600 italic">"Her kindness was a beacon of light. She found beauty in everything and taught us to do the same."</p>
              </div>
            </div>
            {/* Example Memorial 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform">
              <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=200" alt="Eleanor Vance" className="w-full h-56 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Eleanor Vance</h3>
                <p className="mt-2 text-gray-600 italic">"An avid reader and traveler, her stories and wisdom enriched the lives of everyone she met."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Place for Every Memory - Features Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold text-gray-900 text-center" style={{ fontFamily: "'Lora', serif" }}>A Place for Every Memory</h2>
          {/* This section can be built out with features when ready */}
        </div>
      </section>

      {/* A Gentle Call to Action */}
      <section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
           <h2 className="text-3xl font-serif font-semibold text-gray-900" style={{ fontFamily: "'Lora', serif" }}>Preserve a Life Story Today</h2>
          <div className="mt-6">
             <Link href="/dashboard" className="px-6 py-3 rounded-full bg-rose-500 text-white font-semibold shadow-lg hover:bg-rose-600 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// A simple reusable component for the features section
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center p-6 border border-gray-200 rounded-lg">
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}