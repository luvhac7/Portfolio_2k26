import { useEffect, useRef, useState } from 'react';
import './EyeTracker.css';

const EyeTracker = () => {
    const leftContainerRef = useRef<HTMLDivElement>(null);
    const rightContainerRef = useRef<HTMLDivElement>(null);

    const [leftPosition, setLeftPosition] = useState({ x: 0, y: 0 });
    const [rightPosition, setRightPosition] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);

    const maxMovement = 8; // Constrained for smaller eyes

    useEffect(() => {
        let leftCurrentX = 0;
        let leftCurrentY = 0;
        let rightCurrentX = 0;
        let rightCurrentY = 0;
        let leftTargetX = 0;
        let leftTargetY = 0;
        let rightTargetX = 0;
        let rightTargetY = 0;
        let animationFrameId: number;

        const handleMouseMove = (event: MouseEvent) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Left eye calculation
            if (leftContainerRef.current) {
                const rect = leftContainerRef.current.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2;
                const eyeCenterY = rect.top + rect.height / 2;

                const deltaX = mouseX - eyeCenterX;
                const deltaY = mouseY - eyeCenterY;
                const angle = Math.atan2(deltaY, deltaX);
                const distance = Math.min(
                    Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 15,
                    maxMovement
                );

                leftTargetX = Math.cos(angle) * distance;
                leftTargetY = Math.sin(angle) * distance;
            }

            // Right eye calculation
            if (rightContainerRef.current) {
                const rect = rightContainerRef.current.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2;
                const eyeCenterY = rect.top + rect.height / 2;

                const deltaX = mouseX - eyeCenterX;
                const deltaY = mouseY - eyeCenterY;
                const angle = Math.atan2(deltaY, deltaX);
                const distance = Math.min(
                    Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 15,
                    maxMovement
                );

                rightTargetX = Math.cos(angle) * distance;
                rightTargetY = Math.sin(angle) * distance;
            }
        };

        const animate = () => {
            // Smooth interpolation
            leftCurrentX += (leftTargetX - leftCurrentX) * 0.1;
            leftCurrentY += (leftTargetY - leftCurrentY) * 0.1;
            rightCurrentX += (rightTargetX - rightCurrentX) * 0.1;
            rightCurrentY += (rightTargetY - rightCurrentY) * 0.1;

            setLeftPosition({ x: leftCurrentX, y: leftCurrentY });
            setRightPosition({ x: rightCurrentX, y: rightCurrentY });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationFrameId = requestAnimationFrame(animate);

        // Blinking interval
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200);
        }, 4000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            clearInterval(blinkInterval);
        };
    }, []);

    return (
        <div className="character-container animate-enter" style={{ animationDelay: "1.5s" }}>
            <img src="/character.png" alt="Character" className="character-image" />
            <div ref={leftContainerRef} className="eye-container left-eye">
                <div className={`eye-white ${isBlinking ? 'blinking' : ''}`}>
                    <div
                        className="eye-pupil"
                        style={{
                            transform: `translate(calc(-50% + ${leftPosition.x}px), calc(-50% + ${leftPosition.y}px))`
                        }}
                    />
                </div>
            </div>

            <div ref={rightContainerRef} className="eye-container right-eye">
                <div className={`eye-white ${isBlinking ? 'blinking' : ''}`}>
                    <div
                        className="eye-pupil"
                        style={{
                            transform: `translate(calc(-50% + ${rightPosition.x}px), calc(-50% + ${rightPosition.y}px))`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EyeTracker;
