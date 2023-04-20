# Markdown Folder Transformer

Markdown Folder Transformer is a Node.js CLI tool to convert a folder of my Obsidian-flavored markdown files to Logseq-flavored.

## Features

- Combines multiple markdown files from the same day into a single file
- Renames files with a specific date format
- Extracts and formats the content from the source files
- Orders the output files by date and time

## Usage

1. Install dependencies:

```bash
npm install
```

2. Run the CLI tool with the source folder and destination folder as arguments:

```bash
npm start -- [sourceFolder] [destinationFolder]
```

This will transform the markdown files in the `sourceFolder` folder and output the transformed files into the `destinationFolder` folder.
