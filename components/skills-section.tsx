import {
  Palette,
  Layers,
  Pen,
  Film,
  Scissors,
  Sparkles,
  Grid3X3,
  PenTool,
} from "lucide-react"

const skills = [
  { name: "Canva", icon: Grid3X3, color: "bg-cyan-500/10 text-cyan-400" },
  { name: "Adobe Photoshop", icon: Layers, color: "bg-blue-500/10 text-blue-400" },
  { name: "Adobe Illustrator", icon: Pen, color: "bg-orange-500/10 text-orange-400" },
  { name: "Adobe Premiere", icon: Film, color: "bg-purple-500/10 text-purple-400" },
  { name: "CapCut", icon: Scissors, color: "bg-pink-500/10 text-pink-400" },
  { name: "After Effects", icon: Sparkles, color: "bg-indigo-500/10 text-indigo-400" },
  { name: "Adobe Suite", icon: Palette, color: "bg-red-500/10 text-red-400" },
  { name: "Affinity", icon: PenTool, color: "bg-teal-500/10 text-teal-400" },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tools & <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The creative tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-14 h-14 rounded-xl ${skill.color} flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <skill.icon className="w-7 h-7" />
              </div>
              <span className="text-sm font-medium text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
