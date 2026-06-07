"use client";
import { useState, useEffect } from 'react';

// Custom window events to communicate trash/restore state
export const updateTrashState = (trashedIds: string[]) => {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('trash-update', { detail: { trashedIds } });
        window.dispatchEvent(event);
    }
};

export function useSectionVisibility(sectionId: string) {
    const [isTrashed, setIsTrashed] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Fetch current state from localStorage if any, or read window event
        const checkState = () => {
            const trashed = JSON.parse(localStorage.getItem('trashed-sections') || '[]');
            setIsTrashed(trashed.includes(sectionId));
        };

        checkState(); // initial sync

        const handleTrash = (e: Event) => {
            const trashedIds = (e as CustomEvent).detail.trashedIds;
            setIsTrashed(trashedIds.includes(sectionId));
        };

        window.addEventListener('trash-update', handleTrash);
        return () => window.removeEventListener('trash-update', handleTrash);
    }, [sectionId]);

    return isTrashed;
}
