import Link from "next/link"
import { Instagram, Linkedin, MessageCircle } from "lucide-react"

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/+970569619210", label: "WhatsApp" },
  { icon: Instagram, href: "https://instagram.com/noorly.design", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/noor-nabeel/", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Noorly Design. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
