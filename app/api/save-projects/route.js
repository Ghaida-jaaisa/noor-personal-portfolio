import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const repo = process.env.GITHUB_REPO
const token = process.env.GITHUB_TOKEN
const filePath = "data/projects.json"

const getFile = async () => {
  const fileRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return fileRes.json()
}

export async function GET() {
  try {
    const file = await getFile()

    if (!file.content) {
      return NextResponse.json([])
    }

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

    let file = await getFile()

    if (!file.sha) {
      return NextResponse.json({
        error: "Unable to read file from GitHub",
        github: file,
      })
    }

    let existingProjects = []
    try {
      const decodedContent = Buffer.from(file.content, "base64").toString("utf-8")
      existingProjects = JSON.parse(decodedContent)
      if (!Array.isArray(existingProjects)) existingProjects = []
    } catch (e) {
      console.log("Could not parse existing projects, starting fresh")
      existingProjects = []
    }

    const mergedProjects = Array.isArray(incomingProjects)
      ? [...existingProjects, ...incomingProjects]
      : [...existingProjects, incomingProjects]

    const updatedContent = Buffer.from(
      JSON.stringify(mergedProjects, null, 2)
    ).toString("base64")

    const putToGithub = async (sha) => {
      return fetch(
        `https://api.github.com/repos/${repo}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "feat: add new portfolio project - automatic commit",
            content: updatedContent,
            sha,
          }),
        }
      )
    }

    let updateRes = await putToGithub(file.sha)

    if (updateRes.status === 409 || updateRes.status === 422) {
      console.log("SHA conflict, retrying with fresh SHA...")
      file = await getFile()
      updateRes = await putToGithub(file.sha)
    }

    const result = await updateRes.json()
    return NextResponse.json(result)

  } catch (error) {
    return NextResponse.json({ error: error.message })
  }
}