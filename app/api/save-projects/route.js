import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const repo = process.env.GITHUB_REPO
const token = process.env.GITHUB_TOKEN
const filePath = "data/projects.json"

export async function GET() {
  try {
    // GET: Fetch existing projects from GitHub
    const fileRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const file = await fileRes.json()

    if (!file.content) {
      return NextResponse.json([])
    }

    // Decode and return the projects
    const decodedContent = Buffer.from(file.content, "base64").toString("utf-8")
    const projects = JSON.parse(decodedContent)
    
    return NextResponse.json(Array.isArray(projects) ? projects : [])
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json([])
  }
}

export async function POST(req) {
  try {
    const incomingProjects = await req.json()

    // Fetch current file to get existing projects
    const fileRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const file = await fileRes.json()

    if (!file.sha) {
      return NextResponse.json({
        error: "Unable to read file from GitHub",
        github: file,
      })
    }

    // Decode existing projects
    let existingProjects = []
    try {
      const decodedContent = Buffer.from(file.content, "base64").toString("utf-8")
      existingProjects = JSON.parse(decodedContent)
      if (!Array.isArray(existingProjects)) existingProjects = []
    } catch (e) {
      console.log("Could not parse existing projects, starting fresh")
      existingProjects = []
    }

    // Merge: Append the new project to existing ones
    const mergedProjects = Array.isArray(incomingProjects) 
      ? [...existingProjects, ...incomingProjects]
      : [...existingProjects, incomingProjects]

    const updatedContent = Buffer.from(
      JSON.stringify(mergedProjects, null, 2)
    ).toString("base64")

    const updateRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "feat: add new portfolio project - automatic commit ",
          content: updatedContent,
          sha: file.sha,
        }),
      }
    )

    const result = await updateRes.json()

    return NextResponse.json(result)

  } catch (error) {
    return NextResponse.json({
      error: error.message,
    })
  }
}