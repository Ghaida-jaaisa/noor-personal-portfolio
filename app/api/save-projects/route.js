import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data/projects.json");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return new Response(content, { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to read projects" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return new Response(JSON.stringify({ error: "Payload must be an array" }), { status: 400 });
    }
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    return new Response(JSON.stringify({ message: "Saved" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to save projects" }), { status: 500 });
  }
}
