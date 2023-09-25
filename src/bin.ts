#!/usr/bin/node

// Этот файл будет вызываться от npx
const args = process.argv;

const [_runtime, _binCwd, ...cliParameters] = args;
const targetCwd = process.cwd();

import { applyScene } from "./lib/collectInformationFromUser.js";




const data = await applyScene({
  targetPath: targetCwd,
})

console.log(data);
// to-do: realize data: get files from folder (data.targetPath) and open in browser
// need write function getFilesRecursive without filters - it i add


/** previev
 * const filters = rawFilters.map((plain) => new Regex(plain));
 * if (filters.some(regex => targetName.match(regex)))
 */