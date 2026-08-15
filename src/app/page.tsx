'use client';

import { useEffect, useRef, useState } from 'react';

import ThemeToggle from '@/components/ThemeToggle';

type Heart = { id: number; x: number };

const DOG_FACTS = [
    'Dogs can learn over 100 words and gestures.',
    "A dog's nose print is unique, much like a human fingerprint.",
    'Dogs can smell about 10,000 to 100,000 times better than humans.',
    "A wagging tail doesn't always mean a happy dog — direction matters.",
    'Puppies are born deaf and blind, but their sense of smell works right away.',
    'Dogs dream just like humans do, and puppies dream more than adults.',
    "The Basenji is known as the 'barkless dog' — it yodels instead.",
    'Dogs have three eyelids, including one that keeps their eyes moist.',
    "A greyhound can reach speeds of up to 45 miles per hour.",
    'Dogs curl up when they sleep to protect their vital organs — an instinct from their ancestors.',
    "Dogs' noses are wet to help absorb scent chemicals.",
    'Petting a dog can lower your blood pressure — and theirs too.',
];

export default function Page() {
    const [petIntensity, setPetIntensity] = useState(0);
    const [isHappy, setIsHappy] = useState(false);
    const [twitchingEar, setTwitchingEar] = useState<'left' | 'right' | null>(null);
    const [hearts, setHearts] = useState<Heart[]>([]);
    const [bark, setBark] = useState<string | null>(null);
    const [fact, setFact] = useState<string | null>(null);

    const happyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const heartId = useRef(0);
    const cachedBark = useRef<string | null>(null);

    // Pick the fact after mount to avoid a server/client hydration mismatch
    useEffect(() => {
        setFact(DOG_FACTS[Math.floor(Math.random() * DOG_FACTS.length)]);
    }, []);

    // Random ear twitch every few seconds
    useEffect(() => {
        let twitchEnd: ReturnType<typeof setTimeout>;
        let nextTwitch: ReturnType<typeof setTimeout>;
        const schedule = () => {
            nextTwitch = setTimeout(
                () => {
                    setTwitchingEar(Math.random() < 0.5 ? 'left' : 'right');
                    twitchEnd = setTimeout(() => {
                        setTwitchingEar(null);
                        schedule();
                    }, 450);
                },
                3000 + Math.random() * 4000,
            );
        };
        schedule();
        return () => {
            clearTimeout(nextTwitch);
            clearTimeout(twitchEnd);
        };
    }, []);

    // Petting excitement decays back to a calm idle wag
    useEffect(() => {
        const decay = setInterval(() => {
            setPetIntensity((p) => Math.max(0, p - 1));
        }, 1000);
        return () => clearInterval(decay);
    }, []);

    useEffect(() => {
        return () => {
            if (happyTimer.current) clearTimeout(happyTimer.current);
        };
    }, []);

    const pet = () => {
        setPetIntensity((p) => Math.min(10, p + 1));
        setIsHappy(true);
        if (happyTimer.current) clearTimeout(happyTimer.current);
        happyTimer.current = setTimeout(() => setIsHappy(false), 1500);

        const newHearts = Array.from({ length: 2 + Math.floor(Math.random() * 2) }, () => ({
            id: heartId.current++,
            x: 80 + Math.random() * 440,
        }));
        setHearts((current) => [...current, ...newHearts]);
        newHearts.forEach((heart) => {
            setTimeout(() => {
                setHearts((current) => current.filter((other) => other.id !== heart.id));
            }, 1200);
        });

        if (cachedBark.current) {
            setBark(cachedBark.current);
        } else {
            fetch('/api/woof')
                .then((res) => res.json())
                .then((data: { sound?: string }) => {
                    cachedBark.current = data.sound ?? 'woof';
                    setBark(cachedBark.current);
                })
                .catch(() => setBark('woof'));
        }
    };

    const wagClass =
        petIntensity >= 6
            ? 'motion-safe:animate-wag-fast'
            : petIntensity >= 3
              ? 'motion-safe:animate-wag-med'
              : 'motion-safe:animate-wag-slow';

    return (
        <div
            className="relative w-screen h-screen flex justify-center items-center select-none"
            data-oid="b2jyvuu"
        >
            <ThemeToggle />
            <div className="relative" data-oid="dog-wrap">
                {/* Tail */}
                <div
                    className={`absolute -right-28 bottom-[90px] w-[160px] h-[45px] rounded-full bg-[#D4012D] origin-left ${wagClass}`}
                    data-oid="dog-tail"
                ></div>
                {/* Speech bubble */}
                {isHappy && bark && (
                    <div
                        className="absolute -top-24 -right-16 z-20 bg-white text-black dark:bg-neutral-800 dark:text-white text-3xl font-bold px-6 py-3 rounded-2xl shadow-lg motion-safe:animate-pop-in"
                        data-oid="dog-bubble"
                    >
                        {bark}!
                        <div className="absolute -bottom-2 left-8 w-5 h-5 bg-white dark:bg-neutral-800 rotate-45"></div>
                    </div>
                )}
                {/* Floating hearts */}
                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className="absolute -top-10 z-20 text-4xl pointer-events-none motion-safe:animate-float-heart motion-reduce:hidden"
                        style={{ left: heart.x }}
                        data-oid="dog-heart"
                    >
                        ❤️
                    </div>
                ))}
                {/* Dog's head */}
                <div
                    onClick={pet}
                    aria-label="Pet the dog"
                    className="relative z-10 w-[600px] h-[500px] rounded-[50px] bg-[#D4012D] hover:scale-[1.02] transition-all duration-300 cursor-pointer group motion-safe:animate-breathe"
                    data-oid="ixlnyk-"
                >
                    {/* Left ear */}
                    <div
                        className={`absolute -top-20 left-10 w-[150px] h-[200px] ${
                            twitchingEar === 'left'
                                ? 'motion-safe:animate-ear-twitch'
                                : 'motion-safe:animate-[wiggle_1s_ease-in-out_infinite]'
                        }`}
                        data-oid="4roy:-x"
                    >
                        <div
                            className={`w-full h-full rounded-t-[100px] transform transition-transform bg-[#D4002E] ${
                                isHappy ? '-rotate-2 -translate-y-3' : '-rotate-12'
                            }`}
                        ></div>
                    </div>
                    {/* Right ear */}
                    <div
                        className={`absolute -top-20 right-10 w-[150px] h-[200px] ${
                            twitchingEar === 'right'
                                ? 'motion-safe:animate-ear-twitch'
                                : 'motion-safe:animate-[wiggle_1s_ease-in-out_infinite]'
                        }`}
                        data-oid="6ktgfp2"
                    >
                        <div
                            className={`w-full h-full rounded-t-[100px] transform transition-transform bg-[#D4002E] ${
                                isHappy ? 'rotate-2 -translate-y-3' : 'rotate-12'
                            }`}
                        ></div>
                    </div>
                    {/* Left eye */}
                    <div
                        className={`absolute top-[140px] left-[140px] w-[80px] h-[85px] bg-black rounded-full transform -rotate-6 hover:scale-110 transition-transform group-hover:scale-105 ${
                            isHappy ? 'scale-y-[0.35]' : ''
                        }`}
                        data-oid="p4btq.y"
                    >
                        <div
                            className={`absolute top-[15px] left-[15px] w-[35px] h-[35px] bg-white rounded-full transition-opacity motion-safe:animate-[blink_4s_ease-in-out_infinite] ${
                                isHappy ? 'opacity-0' : ''
                            }`}
                            data-oid="vbl4498"
                        ></div>
                        <div
                            className="absolute bottom-[15px] right-[20px] w-[15px] h-[15px] bg-white rounded-full opacity-70"
                            data-oid="8framq6"
                        ></div>
                    </div>
                    {/* Left blush */}
                    <div
                        className={`absolute top-[220px] left-[120px] w-[60px] h-[25px] bg-[#FF4D6D] rounded-full hover:opacity-60 group-hover:animate-pulse transition-opacity ${
                            isHappy ? 'opacity-70' : 'opacity-40'
                        }`}
                        data-oid="0mg_pbv"
                    ></div>
                    {/* Right eye */}
                    <div
                        className={`absolute top-[140px] right-[140px] w-[80px] h-[85px] bg-black rounded-full transform rotate-6 hover:scale-110 transition-transform group-hover:scale-105 ${
                            isHappy ? 'scale-y-[0.35]' : ''
                        }`}
                        data-oid="k.42ybr"
                    >
                        <div
                            className={`absolute top-[15px] left-[15px] w-[35px] h-[35px] bg-white rounded-full transition-opacity motion-safe:animate-[blink_4s_ease-in-out_infinite] ${
                                isHappy ? 'opacity-0' : ''
                            }`}
                            data-oid="0lq.1fc"
                        ></div>
                        <div
                            className="absolute bottom-[15px] right-[20px] w-[15px] h-[15px] bg-white rounded-full opacity-70"
                            data-oid="_m7tl_7"
                        ></div>
                    </div>
                    {/* Right blush */}
                    <div
                        className={`absolute top-[220px] right-[120px] w-[60px] h-[25px] bg-[#FF4D6D] rounded-full hover:opacity-60 group-hover:animate-pulse transition-opacity ${
                            isHappy ? 'opacity-70' : 'opacity-40'
                        }`}
                        data-oid="fpq8yfj"
                    ></div>
                    {/* Snout */}
                    <div
                        className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 w-[180px] h-[140px] bg-[#FFA5B5] rounded-[60px] hover:scale-105 transition-transform group-hover:bg-[#FFB8C5]"
                        data-oid="qc3cp0v"
                    >
                        {/* Nose */}
                        <div
                            className="absolute top-[20px] left-1/2 transform -translate-x-1/2 w-[50px] h-[35px] bg-black rounded-[25px] hover:scale-95 transition-transform"
                            data-oid="3nzl_jc"
                        ></div>
                        {/* Mouth */}
                        <div
                            className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 w-[100px] h-[40px] border-b-8 border-black rounded-b-[50px] hover:border-b-[10px] transition-all group-hover:border-b-[12px]"
                            data-oid="um25-jm"
                        >
                            {/* Tongue */}
                            <div
                                className={`absolute bottom-[-45px] left-1/2 -ml-[20px] w-[40px] rounded-b-full motion-safe:animate-bounce hover:bg-[#FF4D6D] motion-safe:group-hover:animate-[bounce_0.5s_infinite] transition-all ${
                                    isHappy ? 'h-[60px] bg-[#FF4D6D]' : 'h-[40px] bg-[#FF597D]'
                                }`}
                                data-oid=".vadvic"
                            ></div>
                        </div>
                    </div>
                </div>
                {/* Random dog fact */}
                {fact && (
                    <p
                        className="mt-8 max-w-[600px] text-center text-lg italic text-neutral-500 dark:text-neutral-400 motion-safe:animate-pop-in"
                        data-oid="dog-fact"
                    >
                        {fact}
                    </p>
                )}
            </div>
        </div>
    );
}
