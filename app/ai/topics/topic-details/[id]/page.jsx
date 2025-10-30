import { promises as fs } from 'fs';
import path from 'path';
import TopicsEditPage from '../../../../compenents/Topics/TopicsEditPage';

export default async function TopicDetails({ params }) {
  const { id } = params;

  // const [name, setName] = useState('')

  const filePath = path.join(process.cwd(), 'saved-json', 'saved-actions.json');
  const fileData = await fs.readFile(filePath, 'utf8');
  const topicData = JSON.parse(fileData);

  // Match slug (e.g., "send-email") to "Send Email" in JSON
  const matchedTopic = topicData.find(
    (topic) => topic.id === id
  );

  if (!matchedTopic) {
    return <div className="p-6 text-red-500">Topic not found: {id}</div>;
  }


  return (
    <>
      <TopicsEditPage topic={matchedTopic} />
    </>
  );
}
