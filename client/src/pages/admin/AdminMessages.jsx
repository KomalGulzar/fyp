import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/admin/messages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setMessages(data);
        } else {
          setError(data.error || 'Failed to fetch messages.');
        }
      } catch (error) {
        setError('Something went wrong. Please try again later.');
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <MainLayout>
      <div className="p-5 max-w-5xl mx-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0056B3] mb-6  pb-2">
            📬 Admin Messages
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          {messages.length === 0 ? (
            <div className="text-[#333333] bg-white p-6 rounded-lg shadow-md">
              No messages to display.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className="bg-white border border-[#C0C0C0] rounded-xl shadow-lg p-5 hover:shadow-xl transition duration-300"
                >
                  <h2 className="text-xl font-semibold text-[#0056B3] mb-2">
                    {message.subject}
                  </h2>
                  <p className="text-[#333333] mb-3">{message.message}</p>
                  <div className="text-sm text-gray-600 border-t pt-2">
                    From: <span className="font-medium">{message.name}</span> ({message.email})
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminMessages;
