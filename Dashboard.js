import React from 'react';
import Attendance from './Attendance';
import Homework from './Homework';
import Announcements from './Announcements';

const Dashboard = ({ userRole }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            {userRole === 'teacher' && (
                <>
                    <Attendance />
                    <Homework />
                    <Announcements />
                </>
            )}
            {userRole === 'student' && (
                <>
                    {/* Show student-specific components */}
                </>
            )}
        </div>
    );
};

export default Dashboard;
