import { getChildProcessUtils } from "@zoodogood/utils/nodejs";
const {run} = getChildProcessUtils({root: process.cwd()});
const isWindowsBased = process.platform === 'win32';


	

export async function openFileDialog(){
	
	const result = isWindowsBased ? 
		// to-do: correct launch for windows
		run("explorer.exe", ["select/,", process.cwd()]) :
		run("zenity", ["--file-selection", "--directory"]);
	
	const plain = await result.whenEnd as string;
	const path = plain.trim();
	return path || null;
}