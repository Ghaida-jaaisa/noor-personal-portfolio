import Link from "next/link"
import { Instagram, Linkedin, MessageCircle, ArrowUpRight } from "lucide-react"

const contactLinks = [
  {
    icon: MessageCircle,
    name: "WhatsApp",
    description: "Chat with me directly",
    href: "https://wa.me/+970569619210",
    color: "bg-green-500/10 text-green-400 hover:bg-green-500/20",
  },
  {
    icon: Instagram,
    name: "Instagram",
    description: "Follow my work",
    href: "https://instagram.com/noorly.design",
    color: "bg-pink-500/10 text-pink-400 hover:bg-pink-500/20",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    description: "Connect professionally",
    href: "https://www.linkedin.com/in/noor-nabeel",
    color: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {"Let's"} work together on your next project.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {contactLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${link.color} flex items-center justify-center transition-all`}
              >
                <link.icon className="w-8 h-8" />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="font-semibold">{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
