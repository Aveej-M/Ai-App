import { promises as fs } from "fs";
import path from "path";

export default async function SearchTopics() {
    const filePath = path.join(process.pwd(), 'saved-json', 'saved-action.json');
    const topicList = await fs.readFile(filePath, 'utf-8');
    const topicData = JSON.parse(topicList);
  return (
    <div>SearchTopics</div>
  )
}

