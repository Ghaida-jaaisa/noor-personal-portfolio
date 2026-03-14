import Image from "next/image"
import fs from "fs/promises"
import path from "path"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react"

export const dynamic = "force-dynamic"

type PortfolioItem = {
  title?: string
  description?: string
  image: string
  category?: string
}

async function loadProjects(): Promise<PortfolioItem[]> {
  const filePath = path.join(process.cwd(), "data/projects.json")
  try {
    const content = await fs.readFile(filePath, "utf-8")
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch (error) {
    console.error("Unable to read projects.json", error)
    return []
  }
}

function WorkCard({ image, alt, description, category }: { image: string; alt: string; description: string; category?: string }) {
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

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{category || ""}</span>
          <div className="flex items-center gap-3">
            <button className="text-red-500 hover:scale-110 transition-transform" aria-label="Like">
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Comment">
              <MessageCircle className="w-4 h-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Share">
              <Send className="w-4 h-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Save">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-1">{alt}</h3>
          <p className="text-sm text-muted-foreground leading-snug">{description}</p>
        </div>
      </div>
    </div>
  )
}

export async function WorkSection() {
  const portfolioItems = await loadProjects()

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
          {portfolioItems.map((item, idx) => (
            <WorkCard key={idx} image={item.image} alt={item.title} description={item.description} category={item.category} />
          ))}
          {!portfolioItems.length && (
            <p className="col-span-full text-center text-muted-foreground">No projects found. أضف أول مشروع من صفحة الإدارة.</p>
          )}
        </div>
      </div>
    </section>
  )
}
