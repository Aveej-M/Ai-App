import { writeFile, mkdir, readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { randomUUID } from 'crypto';

export async function POST(req) {
  try {
    const data = await req.json();

    // Validate incoming data
    if (
      !data.name?.trim() ||
      !data.description?.trim() ||
      !data.scope?.trim() ||
      !Array.isArray(data.instructions) ||
      data.instructions.some(ins => !ins.trim())
    ) {
      return new Response(JSON.stringify({ error: 'Invalid or empty form data' }), {
        status: 400,
      });
    }

    const dir = path.join(process.cwd(), 'saved-json');
    const filePath = path.join(dir, 'saved-actions.json');

    // Ensure directory exists
    await mkdir(dir, { recursive: true });

    // Load existing data if file exists
    let existingData = [];
    if (existsSync(filePath)) {
      const fileContent = await readFile(filePath, 'utf-8');
      existingData = JSON.parse(fileContent || '[]');
    }

    // Check for duplicate by name (case-insensitive)
    const isDuplicate = existingData.some(
      (item) => item.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isDuplicate) {
      return new Response(JSON.stringify({ error: 'Name already exists' }), {
        status: 400,
      });
    }

    // Create new entry (optional: add timestamp)
    const newEntry = {
      id: randomUUID(),
      ...data,
      savedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: '2-digit'
      }),
      createdBy: ''
    };

    // Save updated array
    existingData.push(newEntry);
    await writeFile(filePath, JSON.stringify(existingData, null, 2));

    return new Response(JSON.stringify({ message: 'Saved successfully!' }), {
      status: 200,
    });

  } catch (error) {
    console.error('Save error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save file' }), {
      status: 500,
    });
  }
}
