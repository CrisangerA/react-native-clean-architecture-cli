import fs from 'fs-extra'
import { ModuleOptions } from '../types';

// Program
export function helloProgram(type: string, name: string, options: ModuleOptions) {
  console.log(`\n   ✨ React Native Clean Architecture CLI ✨\n`);
  delay(369);
  if (type === 'module') {
    console.log(`🚧 🏗️  Creating a new module in: "./src/modules/${name}"`);
  }
  if (type === 'crud') {
    console.log('🚧 🏗️  Creating a new CRUD\n');
    console.log(` -> 📝 Business logic: src/modules/${name}`);
    console.log(` -> 🎨 User Interface: src/screens/${name}`);
  }
  delay(369);
  console.log('\n🛠️  Options:');
  
  Object.keys(options).map((key) => console.log(` -> ${key}: ${options[key as never]}`));
  delay(369);
  console.log('\n');
  delay(369);
}

// Utility Functions
export function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createDirectory(directoryPath: string): void {
  fs.ensureDirSync(directoryPath);
}

export async function delay(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}