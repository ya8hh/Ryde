import { neon } from "@neondatabase/serverless";

// const posts = await sql("SELECT * FROM posts");

// See https://neon.tech/docs/serverless/serverless-driver
// for more information

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URI!);
    const { name, email, clerkId } = await request.json();
    if (!name || !email || !clerkId) {
      return Response.json({
        data: "Missing required fields",
        init: { status: 400 },
      });
    }

    const response = await sql`
            INSERT INTO users (
            name,
            email,
            clerk_id)
            VALUES (
            ${name},
            ${email},
            ${clerkId}
            );
            `;
    return new Response(JSON.stringify({ data: response }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
