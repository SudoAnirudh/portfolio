import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import ManageProjects from './ManageProjects';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] p-6">
            <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-colors"
                >
                    <LogOut size={16} /> Logout
                </button>
            </header>

            <main className="max-w-4xl mx-auto">
                <ManageProjects />
            </main>
        </div>
    );
};

export default Dashboard;
