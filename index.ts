#!/usr/bin/env node
import fs from 'fs-extra'
import path from 'path';
import { Command } from 'commander';
import { configuration } from './src/config';

// ----------------------------------------------------------
// Utility Functions
function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createDirectory(directoryPath: string): void {
  fs.ensureDirSync(directoryPath);
}

async function copyAndModifyFile(source: string, destination: string, moduleName: string): Promise<void> {
  const fileContent = await fs.readFile(source, 'utf8');
  const newFileContent = fileContent.replace(/Scaffold/g, capitalizeFirstLetter(moduleName));
  await fs.outputFile(destination, newFileContent);
}

// Mapping from infrastructure to filename
const SERVICE_BY_INFRA = {
  firebase: 'firebase.repository.ts',
  postgre: 'postgre.repository.ts',
  local: 'local.repository.ts',
};

// Program
const program = new Command();
program
  .name(configuration.name)
  .version(configuration.version)
  .description(configuration.description);

program.command('module <name>')
  .description('Create a new module')
  .option('-i, --infra <source>', 'Specify the infrastructure template (default: firebase)', 'firebase')
  .action(async (name, options) => {
    // console.log('Creating a new module... ', name, options.infra);
    // const moduleName = name.toLowerCase();

    // const baseUrl = `${__dirname}/src/templates/module`;
    // const baseDestUrl = `${process.cwd()}/src/modules/${moduleName}`;

    // const infraFile = SERVICE_BY_INFRA[options.infra as keyof typeof SERVICE_BY_INFRA];
    // const scaffoldFiles = [
    //   `${baseUrl}/app/queries.ts`,
    //   `${baseUrl}/app/mutations.ts`,
    //   `${baseUrl}/domain/model.ts`,
    //   `${baseUrl}/domain/repository.ts`,
    //   `${baseUrl}/infrastructure/repository.ts`,
    //   `${baseUrl}/infrastructure/${infraFile}`,
    // ];

    // try {
    //   for (const file of scaffoldFiles) {
    //     // Leer archivo y reemplazar Scaffold por el nombre del módulo
    //     const fileContent = fs.readFileSync(file, 'utf8');
    //     const newFileContent = fileContent.replace(/Scaffold/g, capitalizeFirstLetter(moduleName));

    //     const parts = file.split('/').length;
    //     const routeAndName = file.split('/').slice(parts - 2).join('/'); // ultimas dos rutas -> /domain/model.ts

    //     const fileName = `${baseDestUrl}/${routeAndName}`;
    //     console.log('Dest URL: ', fileName);

    //     // Verificar si la ruta de destino existe y despues escribir el archivo
    //     const destLength = fileName.split('/').length;
    //     const destFolder = fileName.split('/').slice(0, destLength - 1).join('/')
        
    //     fs.ensureDirSync(destFolder);
    //     fs.writeFileSync(fileName, newFileContent);
    //   }
    // } catch (error) {
    //   console.log('!Error leyendo archivos: ', error);
    // }


    const moduleName = name.toLowerCase();
    const baseDestUrl = path.join(process.cwd(), 'src', 'modules', moduleName);
    console.log('Creating a new module:', baseDestUrl, '\n -> using infrastructure:', options.infra);
    
    const baseUrl = path.join(__dirname, 'src', 'templates', 'module');
    const infraFile = SERVICE_BY_INFRA[options.infra as keyof typeof SERVICE_BY_INFRA];
    const scaffoldFiles = [
      'app/queries.ts',
      'app/mutations.ts',
      'domain/model.ts',
      'domain/repository.ts',
      'infrastructure/repository.ts',
      `infrastructure/${infraFile}`,
    ].map(file => path.join(baseUrl, file));

    try {
      for (const file of scaffoldFiles) {
        const destinationFile = path.join(baseDestUrl, path.relative(baseUrl, file));
        await copyAndModifyFile(file, destinationFile, moduleName);
        console.log('File created:', destinationFile);
      }
    } catch (error) {
      console.error('Error processing files:', error);
    }
  });

program.parse(process.argv);
