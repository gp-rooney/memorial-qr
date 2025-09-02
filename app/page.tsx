// Purpose: Redesigned homepage with a modern, heartfelt aesthetic.
import Link from "next/link";
import { HeartIcon, PencilIcon, QrCodeIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="text-center py-24 sm:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
            Remembered, Always.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a beautiful, lasting online memorial for your loved ones, linked by a simple QR code. A space to share stories, photos, and videos, keeping their memory alive for generations to come.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/dashboard" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition-colors">
              Create a Memorial
            </Link>
            <Link href="/m/jane-doe" className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors">
              View a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-semibold">A Lasting Tribute in Three Simple Steps</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            We've made it easy to create a beautiful and enduring memorial that can be visited by anyone, anywhere.
          </p>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <HowItWorksStep
              icon={<QrCodeIcon className="w-10 h-10 text-primary" />}
              title="1. Receive Your QR Code"
              description="You'll get a unique, durable QR code to place on a headstone, urn, or a special place of remembrance."
            />
            <HowItWorksStep
              icon={<PencilIcon className="w-10 h-10 text-primary" />}
              title="2. Create the Memorial"
              description="Build a beautiful tribute page with photos, stories, and videos. Our tools make it simple and intuitive."
            />
            <HowItWorksStep
              icon={<HeartIcon className="w-10 h-10 text-primary" />}
              title="3. Share Their Legacy"
              description="Share the page with family and friends, creating a collective space for remembrance and healing."
            />
          </div>
        </div>
      </section>

      {/* Featured Memorials Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-semibold">Featured Memorials</h2>
          <p className="mt-4 text-muted-foreground">Celebrating lives and legacies.</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <MemorialCard
              imageUrl="https://images.unsplash.com/photo-1548535345-8c342f53cf08?q=80&w=400"
              name="Johnathan Doe"
              quote="A loving father, a devoted husband, and a friend to all. His laughter echoes in our hearts forever."
            />
            <MemorialCard
              imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
              name="Jane Smith"
              quote="Her kindness was a beacon of light. She found beauty in everything and taught us to do the same."
            />
            <MemorialCard
              imageUrl="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=400"
              name="Eleanor Vance"
              quote="An avid reader and traveler, her stories and wisdom enriched the lives of everyone she met."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary/10">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
           <h2 className="text-4xl font-serif font-semibold">Preserve a Life Story Today</h2>
           <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
             Join thousands of others in creating a beautiful, lasting tribute to the people who have touched your life.
           </p>
          <div className="mt-8">
             <Link href="/dashboard" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition-colors">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable component for the "How It Works" steps
function HowItWorksStep({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-secondary p-4 rounded-full border border-border">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

// Reusable component for the memorial cards
function MemorialCard({ imageUrl, name, quote }: { imageUrl: string; name: string; quote: string }) {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden border border-border transform transition-transform hover:-translate-y-2">
      <img src={imageUrl} alt={name} className="w-full h-64 object-cover"/>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="mt-2 text-muted-foreground italic">"{quote}"</p>
      </div>
    </div>
  );
}