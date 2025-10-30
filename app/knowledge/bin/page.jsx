import { promises as fs } from 'fs';
import path from 'path';
import RecycleBin from './RecycleBin';

export default async function Topics() {
    const filePath = path.join(process.cwd(), 'saved-json', 'knowledge-data.json');
    const knowledgeList = await fs.readFile(filePath, 'utf8');
    const knowledgeData = JSON.parse(knowledgeList);

    return <RecycleBin dataCategory={knowledgeData} />;
}
