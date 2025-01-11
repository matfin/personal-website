import fs from 'node:fs/promises';

import type { Page } from '@models/interfaces';

export const loadPage = async (
  slug: string,
  basePath: string,
): Promise<Page | null> => {
  try {
    const contents: string = (
      await fs.readFile(`${basePath}/${slug}.json`)
    ).toString();
    const page: Page = JSON.parse(contents);

    return page;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const generateSlugs = async (base: string): Promise<string[] | null> => {
  let gathered: string[] = [];

  try {
    const files: string[] = await fs.readdir(base);

    await Promise.all(
      files.map(async (file: string): Promise<void> => {
        const isDir: boolean = (await fs.stat(`${base}/${file}`)).isDirectory();

        if (isDir) {
          const curr: string[] | null = await generateSlugs(`${base}/${file}`);

          gathered = [...gathered, ...(curr ? curr : [])];
        } else {
          const path = `${base}/${file}`;
          const contents: string = (await fs.readFile(path)).toString();
          const { slug }: Page = JSON.parse(contents);

          gathered.push(slug);
        }
      }),
    );
  } catch (e) {
    console.error(e);
    return null;
  }

  return gathered;
};
