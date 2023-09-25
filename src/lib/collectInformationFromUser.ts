import { openFileDialog } from "./openFileDialog.js";
import { cliCreatePrompt, cliSelectCreatePrompt } from "./cli-utils.js";
import { ViewModeEnum } from "./viewMode.js";

interface ISceneData {
	targetPath: string;
	mode: ViewModeEnum;
	fileFilters: string[]
}


const getFolder = async (data: Partial<ISceneData>): Promise<string | null> => {
	data.targetPath ?
		console.info(`Current target directory: ${ data.targetPath }`) : 
		console.info(`Default path not setted`);


	const enum SelectVariants {
		ChangeTarget = "Change target",
		LeaveSame = "Leave it the same",
		OpenFileView = "Open file view (unreliable)"
	 }

	const values = [SelectVariants.ChangeTarget, SelectVariants.LeaveSame, SelectVariants.OpenFileView];
	const { value } = await cliSelectCreatePrompt({
		values,
		defaultValue: values.indexOf(SelectVariants.LeaveSame),
	 });

	 switch (value) {
		case SelectVariants.ChangeTarget: return (async () => {
			const result = await cliCreatePrompt("Path:");
			return result;
		})();
		// @ts-ignore to-do: fix this line
		case SelectVariants.LeaveSame: return data.targetPath;
		case SelectVariants.OpenFileView: return await openFileDialog() as string;
		default: return null;
	 }
}

const getMode = async (data: Partial<ISceneData>): Promise<ViewModeEnum | null> => {
	const values = [ViewModeEnum.JSON, ViewModeEnum.ASCII, ViewModeEnum.HTML, ViewModeEnum.YML];
	const { value } = await cliSelectCreatePrompt({
		values,
		defaultValue: values.indexOf(ViewModeEnum.JSON),
	 });

	 if (!value){
		return null;
	 }

	 return value;
}

const getFilters = async (data: Partial<ISceneData>): Promise<string[] | null> => {

	const result = await cliCreatePrompt("Input regex with space separator (example: type \"node_modules/ build/\" without quotes):");
	if (result === null){
		return null;
	}

	const filters = result.split(" ");
	return filters;
}

const applyScene = async (initData: Pick<ISceneData, "targetPath">) => {
	const data: Partial<ISceneData> = initData;

	data.targetPath = await getFolder(data) as string;
	if (typeof data.targetPath !== "string"){
		throw new TypeError(`data.targetPath is not string`);
	}

	data.mode = await getMode(data) as ViewModeEnum;
	if (data.mode === null){
		throw new TypeError(`data.mode is null`);	
	}

	data.fileFilters = await getFilters(data) as string[];
	if (data.fileFilters === null){
		throw new TypeError(`data.fileFilters is null`);	
	}

	return data;
}

export { applyScene };