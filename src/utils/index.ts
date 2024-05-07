import fs from 'fs-extra'

// Utility Functions
function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createDirectory(directoryPath: string): void {
  fs.ensureDirSync(directoryPath);
}

export async function copyAndModifyFile(source: string, destination: string, moduleName: string): Promise<void> {
  const fileContent = await fs.readFile(source, 'utf8');
  const capitalReplaced = fileContent.replace(/Scaffold/g, capitalizeFirstLetter(moduleName));
  if (source.includes('/app/')) {
    const lowerReplaced = capitalReplaced.replace(/scaffold/g, moduleName.toLowerCase());
    const upperReplace = lowerReplaced.replace(/SCAFFOLD/g, moduleName.toUpperCase());
    await fs.outputFile(destination, upperReplace);
  } else {
    await fs.outputFile(destination, capitalReplaced);
  }
}

// Mapping from infrastructure to filename