import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
    try {
        const form = await req.formData();
        const file = form.get("image");

        if (!file) {
            return new Response(JSON.stringify({ success: 0, message: "No file uploaded" }), { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        // Save the file
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        // Return JSON response with URL
        const imageUrl = `/uploads/${fileName}`;

        return new Response(
            JSON.stringify({
                success: 1,
                url: imageUrl,
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error) {
        console.error("Upload route error:", error);
        return new Response(
            JSON.stringify({ success: 0, message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
