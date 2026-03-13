"use client"

import Image from "next/image"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    image: "/portfolio/work-2.jpg",
    alt: "Coffee branding design",
  },
  {
    id: 2,
    image: "/portfolio/work-3.jpg",
    alt: "Smoothie product design",
  },
  {
    id: 3,
    image: "/portfolio/work-4.jpg",
    alt: "Restaurant menu design",
  },
  {
    id: 4,
    image: "/portfolio/work-5.jpg",
    alt: "Healthcare branding",
  },
  {
    id: 5,
    image: "/portfolio/work-6.jpg",
    alt: "Creative social media design",
  },
  {
    id: 6,
    image: "/portfolio/work-7.jpg",
    alt: "Fashion branding",
  },
  {
    id: 7,
    image: "/portfolio/work-8.jpg",
    alt: "Tech startup branding",
  },
  {
    id: 8,
    image: "/portfolio/work-2.jpg",
    alt: "Brand identity design",
  },
]

function WorkCard({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5">
      {/* Card Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center">
                  <img 
                    src="/portfolio/logo.jpeg" 
                    alt="Designer profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
          <span className="text-xs text-muted-foreground">Noorly Design</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="More options">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Card Footer - Social Actions */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-red-500 hover:scale-110 transition-transform" aria-label="Like">
            <Heart className="w-5 h-5 fill-current" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Comment">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Share">
            <Send className="w-5 h-5" />
          </button>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Save">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A collection of my recent design projects and creative works.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
            <WorkCard key={item.id} image={item.image} alt={item.alt} />
          ))}
        </div>
      </div>
    </section>
  )
}
