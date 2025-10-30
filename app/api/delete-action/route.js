import { promises as fs } from "fs"; 
import path from "path";

export async function POST(req) {
    try {
        const { name } = await req.json();

        const filePath = path.join(process.cwd(), 'saved-json', 'saved-actions.json'); 
        const fileContent = await fs.readFile(filePath, 'utf-8');                
        const actions = JSON.parse(fileContent);

        const updatedActions = actions.filter(action => action.name !== name);
        await fs.writeFile(filePath, JSON.stringify(updatedActions, null, 2), 'utf-8');

        return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting action:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete item' }), { status: 500 });
    }
}
