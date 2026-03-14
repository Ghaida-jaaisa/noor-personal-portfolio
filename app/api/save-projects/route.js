export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"

const repo = process.env.GITHUB_REPO
const token = process.env.GITHUB_TOKEN
const path = "data/projects.json"

export async function GET() {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const file = await res.json()

  const content = JSON.parse(
    Buffer.from(file.content, "base64").toString()
  )

  return NextResponse.json(content)
}

export async function POST(req) {
  const projects = await req.json()

  const fileRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const file = await fileRes.json()

  const updatedContent = Buffer.from(
    JSON.stringify(projects, null, 2)
  ).toString("base64")

  await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "update projects from admin panel",
        content: updatedContent,
        sha: file.sha,
      }),
    }
  )

  return NextResponse.json({ success: true })
}