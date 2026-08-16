import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ── Simple in-memory sliding-window rate limiter ──────────────────────────────
// Edge runtime; map is per-isolate so it resets on cold starts. For a portfolio
// contact form this is more than sufficient — no external KV needed.

const WINDOW_MS = 60_000;   // 1 minute
const MAX_HITS  = 5;        // max submissions per window per IP

interface WindowEntry {
    count: number;
    windowStart: number;
}

// globalThis persists across requests inside the same Edge isolate
declare global {
    // eslint-disable-next-line no-var
    var __rateMap: Map<string, WindowEntry> | undefined;
}

function getRateMap(): Map<string, WindowEntry> {
    if (!globalThis.__rateMap) {
        globalThis.__rateMap = new Map();
    }
    return globalThis.__rateMap;
}

function isRateLimited(ip: string): boolean {
    const map  = getRateMap();
    const now  = Date.now();
    const entry = map.get(ip);

    if (!entry || now - entry.windowStart > WINDOW_MS) {
        // New window
        map.set(ip, { count: 1, windowStart: now });
        return false;
    }

    if (entry.count >= MAX_HITS) {
        return true;
    }

    entry.count++;
    return false;
}

// ── Middleware ─────────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
    // Only guard the Server Action endpoint
    if (request.method === 'POST' && request.nextUrl.pathname.startsWith('/_next/server/app/')) {
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
            request.headers.get('x-real-ip') ??
            '0.0.0.0';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { success: false, error: 'Too many requests. Please wait a minute before trying again.' },
                { status: 429 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    // Run only on the Next.js Server Action internal route
    matcher: ['/_next/server/app/(.*)'],
};
