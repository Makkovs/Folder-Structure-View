import readline from "readline";

export { default as cliSelectCreatePrompt } from "cli-select";

export function cliCreatePrompt(query: string = "Enter value..."): Promise<string> {
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    _interface.question(
      `${ query }\n`,
      answer => (_interface.close(), resolve(answer))
    );
  });
}

export const saycow = 123;