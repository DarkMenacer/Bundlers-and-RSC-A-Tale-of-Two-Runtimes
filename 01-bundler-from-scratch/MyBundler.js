import * as fs from 'node:fs';
import * as path from 'node:path';

// Match "import ... from '...js'", "import '...js'"
const IMPORT_REGEX = [/import\s+[^'"]+\s+from\s+['"]([^'"]+\.js)['"];/g, /import\s+['"]([^'"]+\.js)['"]/g];
const CODE_SOURCE = path.resolve('./src') + '/';
const ENTRY = './Cafe.js'
const BUILD_OUTPUT = './bundle.js';

function dependencyResolution(entryPath) {
	const visited = new Set();
	const stack = [];
	const topologicalOrder = [];

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

	function generateDependencyGraph(entry) {
		entry = CODE_SOURCE + entry;

		if (visited.has(entry)) {
			return;
		}
		visited.add(entry);
		stack.push(entry);
		const imports = gatherImports(entry);
		imports.forEach((dependency) => generateDependencyGraph(dependency));
		stack.pop();
		topologicalOrder.push(entry);
	}

	generateDependencyGraph(entryPath);
	console.log(`topological order: ${topologicalOrder.map((x) => x.replace(CODE_SOURCE, ''))}`);
	return topologicalOrder;
}

function packing(topologicalOrder) {
	fs.truncateSync(BUILD_OUTPUT, 0);

	function stripImports(fileCode) {
		return IMPORT_REGEX.reduce((code, regex) => code.replace(regex, ''), fileCode);
	}

	topologicalOrder.forEach((filePath) => {
		let fileCode = fs.readFileSync(filePath, 'utf8');
		fileCode = stripImports(fileCode);
		fs.appendFileSync(BUILD_OUTPUT, fileCode);
	});
	console.log(`bundled ${topologicalOrder.length} files -> ${BUILD_OUTPUT}`);
}

function main() {
	const topologicalOrder = dependencyResolution(ENTRY);
	packing(topologicalOrder);
}

main();
