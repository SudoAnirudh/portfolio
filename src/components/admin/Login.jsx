import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Failed to login: ' + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--bg-primary)]">
            <div className="w-full max-w-md p-8 space-y-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl">
                <div className="flex flex-col items-center">
                    <div className="p-3 mb-4 rounded-full bg-[var(--accent)] bg-opacity-10 text-[var(--accent)]">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">Admin Access</h2>
                    <p className="text-[var(--text-secondary)]">Enter your credentials to continue</p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition-opacity"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
