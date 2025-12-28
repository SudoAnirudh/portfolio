import React, { useEffect, useRef } from 'react';

const NeuralBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width, height;
        let nodes = [];
        let connections = [];
        const nodeCount = 60;
        const maxDistance = 150;
        const mouse = { x: null, y: null, radius: 150 };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        class Node {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.pulse = 0;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    this.pulse = Math.min(this.pulse + 0.1, 1);
                } else {
                    this.pulse = Math.max(this.pulse - 0.02, 0);
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius + (this.pulse * 2), 0, Math.PI * 2);
                const alpha = 0.2 + (this.pulse * 0.5);
                ctx.fillStyle = `rgba(0, 210, 255, ${alpha})`;
                ctx.fill();

                if (this.pulse > 0.1) {
                    ctx.shadowBlur = 10 * this.pulse;
                    ctx.shadowColor = 'rgba(0, 210, 255, 0.8)';
                } else {
                    ctx.shadowBlur = 0;
                }
            }
        }

        const init = () => {
            nodes = [];
            for (let i = 0; i < nodeCount; i++) {
                nodes.push(new Node());
            }
        };

        const drawConnections = () => {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const alpha = (1 - distance / maxDistance) * 0.15;
                        const pulseBonus = Math.max(nodes[i].pulse, nodes[j].pulse) * 0.4;

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0, 210, 255, ${alpha + pulseBonus})`;
                        ctx.lineWidth = 0.5 + (pulseBonus * 2);
                        ctx.stroke();

                        // Signal "firing"
                        if (nodes[i].pulse > 0.5 || nodes[j].pulse > 0.5) {
                            const time = Date.now() * 0.002;
                            const signalPos = (time % 1);
                            const sx = nodes[i].x + (nodes[j].x - nodes[i].x) * signalPos;
                            const sy = nodes[i].y + (nodes[j].y - nodes[i].y) * signalPos;

                            ctx.beginPath();
                            ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                            ctx.fillStyle = 'rgba(0, 210, 255, 0.8)';
                            ctx.fill();
                        }
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            drawConnections();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'var(--bg-color)',
                opacity: 0.6
            }}
        />
    );
};

export default NeuralBackground;
