import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homework = () => {
    const [homeworks, setHomeworks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const fetchHomeworks = async () => {
            const response = await axios.get('http://localhost:5000/api/homework', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setHomeworks(response.data);
        };
        fetchHomeworks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/homework', { title, description, dueDate }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setHomeworks([...homeworks, response.data]);
            setTitle('');
            setDescription('');
            setDueDate('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Create Homework</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit">Assign Homework</button>
            </form>

            <h2>Assigned Homeworks</h2>
            <ul>
                {homeworks.map((homework) => (
                    <li key={homework._id}>
                        <h3>{homework.title}</h3>
                        <p>{homework.description}</p>
                        <p>Due: {new Date(homework.dueDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Homework;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeworkSubmission = () => {
    const [homeworks, setHomeworks] = useState([]);
    const [submission, setSubmission] = useState('');

    useEffect(() => {
        const fetchHomeworks = async () => {
            const response = await axios.get('http://localhost:5000/api/homework/student', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setHomeworks(response.data);
        };
        fetchHomeworks();
    }, []);

    const handleSubmit = async (homeworkId) => {
        try {
            await axios.post(`http://localhost:5000/api/homework/${homeworkId}/submit`, {
                content: submission,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            alert('Homework submitted!');
            setSubmission('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Submit Homework</h1>
            <ul>
                {homeworks.map((homework) => (
                    <li key={homework._id}>
                        <h3>{homework.title}</h3>
                        <textarea
                            placeholder="Your submission"
                            value={submission}
                            onChange={(e) => setSubmission(e.target.value)}
                        />
                        <button onClick={() => handleSubmit(homework._id)}>Submit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export { HomeworkSubmission };
export  {Homework};