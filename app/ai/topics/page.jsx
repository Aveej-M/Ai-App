// app/ai/topics/page.jsx
import { promises as fs } from 'fs';
import path from 'path';
import TopicsPage from './TopicsPage'; // Move the client component to its own file

export default async function Topics() {
  const filePath = path.join(process.cwd(), 'saved-json', 'saved-actions.json');
  const topicList = await fs.readFile(filePath, 'utf8');
  const topicData = JSON.parse(topicList);

  return <TopicsPage topicData={topicData} />;
}
