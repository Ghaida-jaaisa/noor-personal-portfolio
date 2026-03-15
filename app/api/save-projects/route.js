import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const repo = process.env.GITHUB_REPO
const token = process.env.GITHUB_TOKEN
const filePath = "data/projects.json"

export async function POST(req) {
  try {
    const projects = await req.json()

    // get current file
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

    // Decode existing projects from GitHub
    const decodedContent = Buffer.from(file.content, "base64").toString("utf-8")
    const existingProjects = JSON.parse(decodedContent)

    // Concatenate new project with existing projects
    const allProjects = Array.isArray(existingProjects) 
      ? [...existingProjects, ...(Array.isArray(projects) ? projects : [projects])]
      : Array.isArray(projects) ? projects : [projects]

    const updatedContent = Buffer.from(
      JSON.stringify(allProjects, null, 2)
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