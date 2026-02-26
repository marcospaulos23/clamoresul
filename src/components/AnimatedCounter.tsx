import { useEffect, useState, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    suffix?: string;
}

const AnimatedCounter = ({ value, duration = 1.5, suffix = "" }: AnimatedCounterProps) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: duration,
                ease: "easeOut",
                onUpdate: (latest) => setCount(Math.round(latest)),
            });
            return () => controls.stop();
        }
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
};

export default AnimatedCounter;
