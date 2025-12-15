import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const Terminal = ({ onComplete }) => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'Initializing Anirudh Portfolio Sequence...' },
        { type: 'output', content: 'Loading modules... [OK]' },
        { type: 'output', content: 'Welcome guest@anirudh-portfolio:~$ type "help" to see commands or "enter" to view the full site.' }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    const commands = {
        help: "Available commands: enter, about, skills, contact, clear",
        about: "Anirudh S | AI & ML Engineering Student | Passionate about Neural Networks & Open Source.",
        skills: "Stack: Python, C, Java, React, TensorFlow, PyTorch, MongoDB.",
        contact: "Email: anirudhsudheer@gmail.com",
        clear: "clear",
        enter: "opening...",
        ls: "home  about  experience  projects  contact",
        whoami: "guest"
    };

    const errorMessages = [
        "404: Wisdom not found.",
        "I'm sorry, Dave. I'm afraid I can't do that.",
        "The command you seek is in another castle.",
        "To define recursion, you must first define 'recursion'.",
        "Error: Success is not final, failure is not fatal.",
        "Have you tried turning it off and on again?",
        "I speak binary, not... whatever that was.",
        "Calculating the meaning of life... 42.",
        "Command rejected. The AI overlords are displeased.",
        "Not all those who wander are lost, but you certainly are.",
        "Nice try, human.",
        "Does not compute."
    ];

    const handleCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase();

        if (cleanCmd === 'clear') {
            setHistory([]);
            return;
        }

        if (cleanCmd === 'enter' || cleanCmd === 'open' || cleanCmd === 'exit') {
            setHistory(prev => [...prev, { type: 'input', content: cmd }, { type: 'output', content: 'Accessing main mainframe...' }]);
            setTimeout(() => {
                onComplete();
            }, 800);
            return;
        }

        let response = commands[cleanCmd];

        if (!response) {
            const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            response = `UNKNOWN_CMD: "${cleanCmd}". ${randomError}`;
        }

        setHistory(prev => [
            ...prev,
            { type: 'input', content: cmd },
            { type: 'output', content: response }
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommand(input);
        setInput('');
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#0a0a0a',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Fira Code", monospace',
            padding: '1rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '800px',
                height: '80vh',
                background: '#1e1e1e',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid #333',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{
                    background: '#2d2d2d',
                    padding: '12px 15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #333'
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                    </div>
                    <div style={{ color: '#888', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <TerminalIcon size={14} /> guest@anirudh-portfolio
                    </div>
                </div>

                {/* Body */}
                <div style={{
                    flex: 1,
                    padding: '20px',
                    overflowY: 'auto',
                    color: '#d4d4d4',
                    fontSize: '1rem'
                }} onClick={() => document.getElementById('terminal-input').focus()}>
                    {history.map((line, i) => (
                        <div key={i} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
                            {line.type === 'input' ? (
                                <span style={{ color: '#6a9955' }}>➜ ~ {line.content}</span>
                            ) : (
                                <span style={{ color: '#dadada' }}>{line.content}</span>
                            )}
                        </div>
                    ))}
                    <div ref={bottomRef}></div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <span style={{ color: '#6a9955', marginRight: '10px' }}>➜ ~</span>
                        <input
                            id="terminal-input"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus
                            autoComplete="off"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#d4d4d4',
                                outline: 'none',
                                flex: 1,
                                fontFamily: 'inherit',
                                fontSize: 'inherit'
                            }}
                        />
                    </form>
                </div>
                <div style={{
                    padding: '10px',
                    borderTop: '1px solid #333',
                    textAlign: 'center'
                }}>
                    <button
                        onClick={onComplete}
                        style={{
                            background: 'transparent',
                            border: '1px solid #4ade80',
                            color: '#4ade80',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontFamily: 'inherit',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.target.style.background = '#4ade80'; e.target.style.color = '#000'; }}
                        onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#4ade80'; }}
                    >
                        Skip to Full Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
