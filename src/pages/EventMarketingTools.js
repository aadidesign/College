import { useState } from 'react';
import { motion } from 'framer-motion';

// Event Marketing Tools Page
export default function EventMarketingTools() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [socialPost, setSocialPost] = useState({
    platform: 'Facebook',
    content: '',
    scheduledDate: '',
  });
  const [selectedClub, setSelectedClub] = useState('');

  const clubs = [
    { id: 1, name: 'Tech Club' },
    { id: 2, name: 'Art Society' },
    { id: 3, name: 'Drama Club' },
    { id: 4, name: 'Music Club' },
  ];

  const emailTemplates = [
    {
      id: 1,
      title: 'Event Reminder',
      content: `Dear [Name],\n\nThis is a reminder for the upcoming event: [Event Name] on [Date] at [Time]. We hope to see you there!\n\nBest,\n[Your Organization]`,
    },
    {
      id: 2,
      title: 'Invitation to Event',
      content: `Hello [Name],\n\nYou are invited to our special event: [Event Name] on [Date]. Join us for an exciting experience!\n\nSincerely,\n[Your Organization]`,
    },
    {
      id: 3,
      title: 'Post-Event Thank You',
      content: `Hi [Name],\n\nThank you for attending [Event Name]! We appreciate your participation and hope you enjoyed it.\n\nBest regards,\n[Your Organization]`,
    },
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomMessage('');
  };

  const handleSocialPostSubmit = () => {
    setScheduledPosts([...scheduledPosts, socialPost]);
    alert(`Post scheduled on ${socialPost.platform}`);
    setSocialPost({ platform: 'Facebook', content: '', scheduledDate: '' });
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen py-10">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-blue-700 mb-8"
      >
        Event Marketing Tools for Clubs
      </motion.h1>

      <div className="container mx-auto mb-4 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Select Your Club</h2>
        <select
          className="border border-blue-400 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
        >
          <option value="">Choose a club...</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.name}>{club.name}</option>
          ))}
        </select>
        
        <h2 className="text-xl font-semibold mb-4">Email Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emailTemplates.map((template) => (
            <motion.div
              key={template.id}
              className={`bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-all duration-300 ${selectedTemplate?.id === template.id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => handleTemplateSelect(template)}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-semibold text-lg">{template.title}</h3>
              <p className="text-sm text-gray-600">{template.content.split('\n')[0]}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <div className="container mx-auto mb-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Customize Your Email</h2>
          <textarea
            rows="6"
            className="border border-blue-400 rounded-lg p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={customMessage || selectedTemplate.content}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => alert('Email sent!')}
          >
            Send Email
          </button>
        </div>
      )}

      <div className="container mx-auto mb-4 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Social Media Integration</h2>
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <label className="block mb-1">Select Platform</label>
          <select
            className="border border-blue-400 rounded-lg p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={socialPost.platform}
            onChange={(e) => setSocialPost({ ...socialPost, platform: e.target.value })}
          >
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
          <label className="block mb-1">Post Content</label>
          <textarea
            rows="4"
            className="border border-blue-400 rounded-lg p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={socialPost.content}
            onChange={(e) => setSocialPost({ ...socialPost, content: e.target.value })}
          />
          <label className="block mb-1">Schedule Date</label>
          <input
            type="datetime-local"
            className="border border-blue-400 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={socialPost.scheduledDate}
            onChange={(e) => setSocialPost({ ...socialPost, scheduledDate: e.target.value })}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={handleSocialPostSubmit}
          >
            Schedule Post
          </button>
        </div>

        {scheduledPosts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Scheduled Posts</h3>
            <ul className="list-disc pl-5">
              {scheduledPosts.map((post, index) => (
                <li key={index} className="mb-1">
                  {post.platform}: {post.content} on {new Date(post.scheduledDate).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <footer className="text-center mt-8">
        <p className="text-gray-600">Empowering Clubs to Promote Their Events!</p>
      </footer>
    </div>
  );
}
