import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM = 'https://github-contributions-api.deno.dev';
const CACHE_TTL = 3600; // 1 hour in seconds

export const runtime = 'edge';

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;

    // Strict allowlist — only alphanumeric + hyphen, max 39 chars (GitHub username rules)
    if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
        return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
    }

    try {
        const upstreamRes = await fetch(`${UPSTREAM}/${username}.json`, {
            // Respect upstream cache headers but cap our own at 1 hour
            next: { revalidate: CACHE_TTL },
        });

        if (!upstreamRes.ok) {
            return NextResponse.json(
                { error: 'Upstream API error' },
                { status: upstreamRes.status }
            );
        }

        const data = await upstreamRes.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=86400`,
            },
        });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 502 });
    }
}
