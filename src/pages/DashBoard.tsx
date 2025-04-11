import React from 'react';
import Dashboard from '../features/dashboard/Dashboard';

const DashBoard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-4">
                <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard page</h1>
                <Dashboard />
            </div>
        </div>
    );
};

export default DashBoard;