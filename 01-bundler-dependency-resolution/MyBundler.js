import * as fs from 'node:fs';
import * as path from 'node:path';

// Match "import ... from '...js'", "import '...js'"
const IMPORT_REGEX = [/import\s+[^'"]+\s+from\s+['"]([^'"]+\.js)['"];/g, /import\s+['"]([^'"]+\.js)['"]/g];
const CODE_SOURCE = path.resolve('./src') + '/';
const MANIFEST_OUTPUT = './manifest.json';
const depends = {};

function cleanPath(filePath) {
	return filePath.replace(CODE_SOURCE, '').replace('./', '');
}

function gatherImports(filePath) {
	const fileCode = fs.readFileSync(filePath, 'utf8');
	const imports = [];
	IMPORT_REGEX.forEach((regex) => {
		let match;
		while ((match = regex.exec(fileCode))) {
			imports.push(match[1]);
		}
	});
	return imports;
}

function dependencyResolution(entryPath) {
	const visited = new Set();
	const stack = [];
	const topologicalOrder = [];

	function generateDependencyGraph(entry) {
		entry = CODE_SOURCE + entry;
		if (visited.has(entry)) {
			return;
		}

		visited.add(entry);
		stack.push(entry);
		gatherImports(entry).forEach((dependency) => generateDependencyGraph(dependency));
		stack.pop();
		topologicalOrder.push(cleanPath(entry));
	}

	generateDependencyGraph(entryPath);
	depends[entryPath.replace('.js', '')] = topologicalOrder;
}

function main() {
	fs.readdirSync(CODE_SOURCE, { withFileTypes: true })
		.filter((file) => !file.name.includes('.swp'))
		.forEach((file) => dependencyResolution(file.name));
	console.log(depends);
	fs.writeFileSync(MANIFEST_OUTPUT, JSON.stringify(depends));
}

main();
