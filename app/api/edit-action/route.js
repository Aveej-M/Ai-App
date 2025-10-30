import { writeFile, readFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(req) {
  try {
    const data = await req.json();

    const { id, name, description, scope, instructions } = data;

    // Basic validation
    if (
      !id?.trim() ||
      !name?.trim() ||
      !description?.trim() ||
      !scope?.trim() ||
      !Array.isArray(instructions) ||
      instructions.some(ins => !ins?.trim())
    ) {
      return new Response(JSON.stringify({ error: 'Invalid or empty form data' }), {
        status: 400
      });
    }

    const dir = path.join(process.cwd(), 'saved-json');
    const filePath = path.join(dir, 'saved-actions.json');

    let existingData = [];
    if (existsSync(filePath)) {
      const fileContent = await readFile(filePath, 'utf-8');
      existingData = JSON.parse(fileContent || '[]');
    }

    // Find the item by id
    const index = existingData.findIndex(
      (item) => item.id?.toLowerCase() === id.toLowerCase()
    );

    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Item not found for update' }), {
        status: 404
      });
    }

    // Update the item
    existingData[index] = {
      ...existingData[index],
      name,
      description,
      scope,
      instructions,
      savedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: '2-digit'
      })

    };

    // Save back to file
    await writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    return new Response(JSON.stringify({ message: 'Data updated successfully' }), {
      status: 200
    });

  } catch (error) {
    console.error('Update error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update file' }), {
      status: 500
    });
  }
}
