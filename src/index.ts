import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';

type MarkdownFile = {
	title: string;
	content: string;
};

type MarkdownFiles = { [date: string]: MarkdownFile[] };

async function transformMarkdownFiles(
	sourceFolder: string,
	destinationFolder: string
) {
	const sourceFiles = await glob(`${sourceFolder}/*.md`);

	const parsedFiles: MarkdownFiles = {};

	for (const filePath of sourceFiles) {
		const fileName = path.basename(filePath);

		const matchResult = fileName.match(/^(\d{8})(\d{4})\s(.+)\.md$/);

		if (!matchResult) {
			console.error(`Invalid file name format: ${fileName}`);
			continue;
		}

		const [, date, , title] = matchResult;

		if (!date || !title) {
			console.error(`Invalid file name format: ${fileName}`);
			continue;
		}

		const formattedDate = `${date.slice(0, 4)}_${date.slice(4, 6)}_${date.slice(
			6,
			8
		)}`;

		const files: MarkdownFile[] = parsedFiles[formattedDate] || [];
		if (!parsedFiles[formattedDate]) {
			parsedFiles[formattedDate] = files;
		}

		const content = fs.readFileSync(filePath, 'utf8');
		files.push({ title, content });
	}

	await fs.ensureDir(destinationFolder);

	console.group(`Migrating ${Object.keys(parsedFiles).length} files:`);
	for (const date in parsedFiles) {
		console.log(`${date}`);

		const files = parsedFiles[date];
		if (files) {
			for (const { title } of files) {
				console.log(`- ${title}`);
			}

			const outputPath = path.join(destinationFolder, `${date}.md`);
			const fileContent = files
				.map(({ title, content }) => `- ## ${title}\n\t- ${content}\n`)
				.join('\n');
			await fs.writeFile(outputPath, fileContent);
		}
	}
	console.groupEnd();
}

// eslint-disable-next-line unicorn/no-unreadable-array-destructuring
const [, , sourceFolder, destinationFolder] = process.argv;

if (!sourceFolder || !destinationFolder) {
	console.error('Please provide source and destination folder paths');
	process.exit(1);
}

transformMarkdownFiles(sourceFolder, destinationFolder)
	.then(() => console.log('Markdown transformation completed'))
	.catch((error) => console.error('Error during transformation:', error));
