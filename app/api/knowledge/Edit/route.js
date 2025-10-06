import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'saved-json', 'knowledge-data.json');

export async function GET() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return new Response(data, { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to read data' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await fs.writeFile(filePath, JSON.stringify(body, null, 4), 'utf8');
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to write data' }), { status: 500 });
    }
}
