import { useEffect, useState } from 'react';

const ContributionGraphBackground = () => {
    const [cells, setCells] = useState<{ id: number; level: number }[]>([]);

    useEffect(() => {
        const calculateGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const cellSize = 18; // Slightly smaller for more density
            const gap = 3;
            const cols = Math.ceil(width / (cellSize + gap));
            const rows = Math.ceil(height / (cellSize + gap));
            const totalCells = cols * rows;

            // Generate realistic-looking data with clustering
            const newCells = [];
            for (let i = 0; i < totalCells; i++) {
                const col = i % cols;
                const row = Math.floor(i / cols);

                // Base random value
                let noise = Math.random();

                // Influence from "week" (row) - Weekends (0 and 6) are usually less active
                if (row % 7 === 0 || row % 7 === 6) noise -= 0.2;

                // Influence from "season" (col) - Sine wave to simulate busy periods
                noise += Math.sin(col * 0.1) * 0.2;

                // Random "bursts" of activity
                if (Math.random() > 0.95) noise += 0.5;

                // Normalize to levels 0-4
                let level = 0;
                if (noise > 0.85) level = 4;
                else if (noise > 0.70) level = 3;
                else if (noise > 0.55) level = 2;
                else if (noise > 0.40) level = 1;

                newCells.push({ id: i, level });
            }

            setCells(newCells);
        };

        calculateGrid();
        window.addEventListener('resize', calculateGrid);
        return () => window.removeEventListener('resize', calculateGrid);
    }, []);

    // GitHub Dark Mode Contribution Colors
    const getLevelColor = (level: number) => {
        switch (level) {
            case 4: return 'bg-[#39d353]'; // Brightest Green
            case 3: return 'bg-[#26a641]';
            case 2: return 'bg-[#006d32]';
            case 1: return 'bg-[#0e4429]';
            default: return 'bg-[#161b22]'; // Empty/Darkest
        }
    };

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div
                className="grid w-full h-full gap-1 opacity-40 transition-opacity duration-1000"
                style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(18px, 1fr))',
                    gridAutoRows: '18px',
                    // Rotate slightly for a "perspective" feel? No, keep it flat and clean as requested.
                }}
            >
                {cells.map((cell) => (
                    <div
                        key={cell.id}
                        className={`rounded-[2px] transition-colors duration-700 ${getLevelColor(cell.level)} ${cell.level > 0 ? 'animate-pulse-subtle' : ''}`}
                        style={{
                            // Randomize animation delay for "organic" feel
                            animationDelay: `${Math.random() * 5}s`,
                            // Fade out empty cells more
                            opacity: cell.level === 0 ? 0.3 : 1
                        }}
                    />
                ))}
            </div>

            {/* Vignette / Mask to blend into background */}
            <div className="absolute inset-0 bg-background/90"
                style={{
                    maskImage: 'radial-gradient(circle at 50% 50%, transparent 20%, black 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 20%, black 100%)'
                }}
            />
            {/* Gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/90" />
        </div>
    );
};

export default ContributionGraphBackground;
