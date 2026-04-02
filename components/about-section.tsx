import { Users, Target, Lightbulb, Award } from "lucide-react"
import { Card } from "@/components/ui/card"

const aboutData = {
  bio: "I'm Noor Nabeel, a passionate Graphic and Visual Designer with over 1+ years of experience creating compelling digital experiences. My journey in design started with a curiosity about visual storytelling, and it has evolved into a career dedicated to helping brands and businesses communicate their message effectively.",
  values: [
    {
      icon: Lightbulb,
      title: "Creative Innovation",
      description: "I believe in pushing creative boundaries and exploring new design paradigms to deliver unique solutions.",
    },
    {
      icon: Users,
      title: "User-Centric Approach",
      description: "Every design decision is made with the user in mind, ensuring both beauty and functionality work in harmony.",
    },
    {
      icon: Target,
      title: "Strategic Thinking",
      description: "Design is not just about aesthetics; it's about solving problems and achieving meaningful business goals.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "I'm committed to delivering high-quality work that exceeds expectations and stands the test of time.",
    },
  ],
  highlights: [
    { label: "Years Active", value: "1+" },
    { label: "Projects Completed", value: "40+" },
    { label: "Happy Clients", value: "5+" },
    { label: "Design Tools", value: "8+" },
  ],
}

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my design journey and what drives my passion for creating meaningful visual experiences.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Biography */}
          <div className="lg:col-span-2">
            <Card className="p-8 border border-border bg-card">
              <h3 className="text-2xl font-bold mb-4">My Story</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {aboutData.bio}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in brand identity design, social media content creation, and digital marketing materials.
                My design philosophy centers on simplicity, clarity, and emotional connection. I work closely with clients
                to understand their vision and translate it into visually compelling designs that resonate with their audiences.
              </p>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {aboutData.highlights.map((item) => (
              <Card
                key={item.label}
                className="p-6 border border-border bg-card flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors"
              >
                <p className="text-3xl font-bold text-primary mb-2">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Values/Approach */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">My Design Philosophy</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((value) => (
              <Card
                key={value.title}
                className="p-6 border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
