import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export const VisitCounter = () => {
    const [count, setCount] = useState<number>(177);

    useEffect(() => {
        // Check if we already counted this user session
        const hasVisited = sessionStorage.getItem('has_visited_session');

        // Get stored global-like count from local storage (simulating a database)
        const storedCount = localStorage.getItem('app_visit_count');

        let currentCount = storedCount ? parseInt(storedCount) : 177;

        if (!hasVisited) {
            // It's a new session, increment the count
            currentCount += 1;
            localStorage.setItem('app_visit_count', currentCount.toString());
            sessionStorage.setItem('has_visited_session', 'true');
        }

        setCount(currentCount);
    }, []);

    return (
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 shadow-sm">
            <Users className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold text-slate-600">
                {count.toLocaleString()} Visitas
            </span>
        </div>
    );
};
