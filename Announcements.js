import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const response = await axios.get('http://localhost:5000/api/announcements', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setAnnouncements(response.data);
        };
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/announcements', { content }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setAnnouncements([...announcements, response.data]);
            setContent('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Create Announcement</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Announcement content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Post Announcement</button>
            </form>

            <h2>Announcements</h2>
            <ul>
                {announcements.map((announcement) => (
                    <li key={announcement._id}>
                        <p>{announcement.content}</p>
                        <p>{new Date(announcement.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Announcements;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const response = await axios.get('http://localhost:5000/api/announcements', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setAnnouncements(response.data);
        };
        fetchAnnouncements();
    }, []);

    return (
        <div>
            <h1>Announcements</h1>
            <ul>
                {announcements.map((announcement) => (
                    <li key={announcement._id}>
                        <p>{announcement.content}</p>
                        <p>{new Date(announcement.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
import Announcements from './Announcements';
import { CreateAnnouncement } from './Announcements';
export  {ViewAnnouncements};
