import Link from "next/link"
import { Instagram, Linkedin, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/+970569619210", label: "WhatsApp" },
  { icon: Instagram, href: "https://instagram.com/noorly.design", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/noor-nabeel/", label: "LinkedIn" },
]

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 pb-16"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium">
                Available for freelance work
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Creative
                <br />
                <span className="text-primary">Designer</span>
              </h1>
            </div>

            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Crafting beautiful and functional digital experiences through
              thoughtful design and user-centered solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
              >
                <Link href="#work">
                  View Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 border-border text-foreground hover:bg-secondary"
              >
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Card */}
          <div className="relative hidden lg:block">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center">
                  <img 
                    src="/portfolio/logo.jpeg" 
                    alt="Designer profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Noor Nabeel</h3>
                  <p className="text-sm text-muted-foreground">Graphic & Visual Designer</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-border">
                <div>
                  <p className="text-2xl font-bold text-foreground">40+</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1+</p>
                  <p className="text-xs text-muted-foreground">Years Exp</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">5+</p>
                  <p className="text-xs text-muted-foreground">Clients</p>
                </div>
              </div>

              {/* Recent Work Preview */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Recent Work</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-primary/20">
                    <img 
                      src="/portfolio/work-2.jpg" 
                      alt="Recent work 1" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-primary/20">
                    <img 
                      src="/portfolio/work-3.jpg" 
                      alt="Recent work 2" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
