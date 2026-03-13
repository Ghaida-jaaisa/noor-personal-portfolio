import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WorkSection } from "@/components/work-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WorkSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
