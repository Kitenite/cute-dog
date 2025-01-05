console.log('API_KEY', process.env.API_KEY);

import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

async function deployWebProject(
    dir: string,
    projectId: string,
    entrypoint?: string,
): Promise<void> {
    const files: Record<string, string> = {};

    function readFilesRecursively(currentDir: string, basePath: string = '') {
        for (const entry of readdirSync(currentDir)) {
            const entryPath = join(currentDir, entry);
            if (entryPath.includes('node_modules')) continue;

            const stats = statSync(entryPath);
            if (stats.isDirectory()) {
                readFilesRecursively(entryPath, `${basePath}${entry}/`);
            } else if (stats.isFile()) {
                files[`${basePath}${entry}`] = readFileSync(entryPath, 'utf-8');
            }
        }
    }

    readFilesRecursively(dir);

    console.log('Files:', Object.keys(files));

    const response = await fetch('https://api.freestyle.sh/web/v1/deploy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
            files,
            config: {
                projectId,
                entrypoint,
            },
        }),
    });

    if (!response.ok) {
        console.error(await response.text());
        throw new Error('Failed to deploy');
    }

    console.log(await response.text());
}

deployWebProject('.next/standalone', 'testnext2.style.dev', 'server.js');
