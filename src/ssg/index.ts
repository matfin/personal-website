import { promises as fs } from 'fs';
import { PageProps } from 'models';
import SSGController from './SSGController';

const generateSlugs = async (base: string): Promise<string[]> => {
  let gathered: string[] = [];
  const files: string[] = await fs.readdir(base);

  await Promise.all(
    files.map(
      async (file: string): Promise<void> => {
        const isDir: boolean = (await fs.stat(`${base}/${file}`)).isDirectory();

        if (isDir) {
          const curr: string[] = await generateSlugs(`${base}/${file}`);

          gathered = [...gathered, ...curr];
        } else {
          const path = `${base}/${file}`;
          const contents: string = (await fs.readFile(path)).toString();
          const { slug }: PageProps = JSON.parse(contents);

          gathered.push(slug);
        }
      }
    )
  );

  return gathered;
};

const generateDirectories = async (): Promise<void> => {
  const path = './out';
  const slugs = await generateSlugs('./pages');
  const generator: SSGController = new SSGController();

  // recreate
  await fs.mkdir(path, { recursive: true });

  // generate HTML from slugs
  slugs.forEach(
    async (slug: string): Promise<void> => {
      const staticHtml: string = await generator.generate(slug);

      if (slug === 'index') {
        await fs.writeFile(`${path}/index.html`, staticHtml, 'utf-8');
      } else {
        await fs.mkdir(`${path}/${slug}`, { recursive: true });
        await fs.writeFile(`${path}/${slug}/index.html`, staticHtml, 'utf-8');
      }
    }
  );
};

const run = async (): Promise<void> => {
  console.info('Regenerating static content');
  await generateDirectories();
};

run();
