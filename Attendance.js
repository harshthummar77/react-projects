import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        // Fetch students from the API
        const fetchStudents = async () => {
            const response = await axios.get('http://localhost:5000/api/students');
            setStudents(response.data);
        };
        fetchStudents();
    }, []);

    const handleAttendanceChange = (studentId, status) => {
        setAttendance({ ...attendance, [studentId]: status });
    };

    const handleSubmit = async () => {
        try {
            for (const studentId in attendance) {
                await axios.post('http://localhost:5000/api/attendance', {
                    studentId,
                    status: attendance[studentId],
                });
            }
            alert('Attendance marked!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Mark Attendance</h1>
            <form onSubmit={handleSubmit}>
                {students.map((student) => (
                    <div key={student._id}>
                        <span>{student.username}</span>
                        <select onChange={(e) => handleAttendanceChange(student._id, e.target.value)}>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                        </select>
                    </div>
                ))}
                <button type="submit">Submit Attendance</button>
            </form>
        </div>
    );
};

export default Attendance;
