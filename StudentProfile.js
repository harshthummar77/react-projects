import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfiles = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get('http://localhost:5000/api/students', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setStudents(response.data);
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Student Profiles</h1>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>
                        <h3>{student.username}</h3>
                        <p>Role: {student.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentProfiles;
