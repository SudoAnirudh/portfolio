import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../data';
import { Play } from 'lucide-react';

const JupyterAbout = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const pythonCode = `class AnirudhS:
    def __init__(self):
        self.role = "AI & ML Engineering Student"
        self.location = "Kozhikode, Kerala, India"
        self.passions = ["Neural Networks", "Open-source", "Intelligent Systems"]
    
    def get_about(self):
        return "${profile.about}"

# Instantiate profile
me = AnirudhS()
print(me.get_about())`;

    const handleRun = () => {
        if (isRunning) return;
        setIsRunning(true);
        setIsFinished(false);
        setProgress(0);
    };

    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setTimeout(() => {
                            setIsRunning(false);
                            setIsFinished(true);
                        }, 300);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 50);
            return () => clearInterval(timer);
        }
    }, [isRunning]);

    return (
        <div className="jupyter-notebook">
            {/* Input Cell */}
            <div className="jupyter-cell input-cell">
                <div className="cell-counter">[In 1]:</div>
                <div className="cell-content">
                    <div className="code-header">
                        <span className="lang-label">Python 3 (ipykernel)</span>
                        <button
                            className={`run-button ${isRunning ? 'running' : ''}`}
                            onClick={handleRun}
                            disabled={isRunning}
                        >
                            <Play size={14} fill={isRunning ? 'currentColor' : 'none'} />
                            {isRunning ? 'Running...' : 'Run'}
                        </button>
                    </div>
                    <pre className="code-block">
                        <code>
                            <span className="keyword">class</span> <span className="class-name">AnirudhS</span>:
                            {'\n    '}<span className="keyword">def</span> <span className="function">__init__</span>(<span className="variable">self</span>):
                            {'\n        '}<span className="variable">self</span>.role = <span className="string">"AI & ML Engineering Student"</span>
                            {'\n        '}<span className="variable">self</span>.location = <span className="string">"Kozhikode, Kerala, India"</span>
                            {'\n        '}<span className="variable">self</span>.passions = [<span className="string">"Neural Networks"</span>, <span className="string">"Open-source"</span>, <span className="string">"Intelligent Systems"</span>]
                            {'\n\n    '}<span className="keyword">def</span> <span className="function">get_about</span>(<span className="variable">self</span>):
                            {'\n        '}<span className="keyword">return</span> <span className="string">"{profile.about}"</span>
                            {'\n\n'}<span className="comment"># Instantiate profile</span>
                            {'\n'}me = <span className="class-name">AnirudhS</span>()
                            {'\n'}print(me.<span className="function">get_about</span>())
                        </code>
                    </pre>
                    {isRunning && (
                        <div className="execution-progress">
                            <motion.div
                                className="progress-bar"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Output Cell */}
            <AnimatePresence>
                {isFinished && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="jupyter-cell output-cell"
                    >
                        <div className="cell-counter">[Out 1]:</div>
                        <div className="cell-content output-content">
                            <p>{profile.about}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JupyterAbout;
