import path from 'path';
import fs from 'fs-extra'
import { Command } from 'commander';
import { ModuleOptions } from './types';
import { capitalizeFirstLetter, delay, helloProgram } from './utils';
import { configuration, CRUD_SCAFFOLD_FILES, MODULE_SCAFFOLD_FILES, SERVICE_BY_INFRA } from './config';

type ScaffoldType = 'module' | 'crud';
export default class Program {
  program: Command;

  constructor() {
    this.program = new Command();
    this.initialize();
    this.commandModule();
    this.commandCrud();
    this.program.parse(process.argv);
  }

  private initialize() {
    this.program
      .name(configuration.name)
      .version(configuration.version)
      .description(configuration.description);
  }

  private commandModule() {
    this.program.command('module <name>')
      .description('Create a new module')
      .option('-i, --infra <source>', 'Specify the infrastructure template (default: firebase)', 'firebase')
      .action(async (name, options: ModuleOptions) => {
        const moduleName = name.toLowerCase();
        helloProgram('module', moduleName, options);

        const scaffoldFiles = this.findScaffoldFiles('module', options);
        await this.writeScaffoldFiles(scaffoldFiles, moduleName, 'module', 'modules'),
        
        console.log('\n✅ CRUD created successfully! 🥳🎉');
      });
  }

  private commandCrud() {
    this.program.command('crud <name>')
      .description('Create a new CRUD module')
      .option('-i, --infra <infrastructure>', 'Specify the infrastructure template (default: firebase)', 'firebase')
      .option('-n, --nav <navigation>', 'Specify the navigation template (default: stack)', 'stack')
      .action(async (name, options: ModuleOptions) => {
        const moduleName = name.toLowerCase();
        helloProgram('crud', moduleName, options);

        const scaffoldFilesUI = this.findScaffoldFiles('crud', options);
        await this.writeScaffoldFiles(scaffoldFilesUI, moduleName, 'screen', 'screens');
        delay(369);
        const scaffoldFilesModule = this.findScaffoldFiles('module', options);
        await this.writeScaffoldFiles(scaffoldFilesModule, moduleName, 'module', 'modules');

        console.log('\n✅ CRUD created successfully! 🥳🎉');

      });
  }

  private async writeScaffoldFiles(files: string[], moduleName: string, template: string, dest: string) {
    try {
      const urlTemplate = path.join(__dirname, 'templates', template); // -> Url donde estan los templates (archivos de ejemplo)
      const urlDest = path.join(process.cwd(), 'src', dest, moduleName); // -> Url donde se crearan los archivos (carpeta destino)
      for (const file of files) {
        const destinationFile = path.join(urlDest, path.relative(urlTemplate, file));
        await this.copyAndModifyFile(file, destinationFile, moduleName);
      }
    } catch (error) {
      console.error('💥 Error processing files:', error);
    }
  }

  private findScaffoldFiles(type: ScaffoldType, options: ModuleOptions) {
    const dic = {
      module: {
        files: MODULE_SCAFFOLD_FILES,
        folder: 'module'
      },
      crud: {
        files: CRUD_SCAFFOLD_FILES,
        folder: 'screen'
      },
    }
    const { files, folder } = dic[type];
    //  Obtener los archivos template
    const urlTemplate = path.join(__dirname, 'templates', folder);
    const scaffoldFiles = files.map(file => path.join(urlTemplate, file));

    if (type === 'module') {
      // Obtener el archivo de infraestructura
      const infraFile = SERVICE_BY_INFRA[options.infra];
      infraFile && scaffoldFiles.push(path.join(urlTemplate, 'infrastructure', infraFile));
    }

    return scaffoldFiles;
  }

  private async copyAndModifyFile(source: string, destination: string, moduleName: string) {
    let capitalReplaced = '';
    try {
      const fileContent = await fs.readFile(source, 'utf8');
      capitalReplaced = fileContent.replace(/Scaffold/g, capitalizeFirstLetter(moduleName));
    } catch (error) {
      console.log('💥 Read file: ', source);
      console.log('💥 Error reading file:', error);
    }
    try {
      if (source.includes('/app/')) {
        const lowerReplaced = capitalReplaced.replace(/scaffold/g, moduleName.toLowerCase());
        const upperReplace = lowerReplaced.replace(/SCAFFOLD/g, moduleName.toUpperCase());
        await fs.outputFile(destination, upperReplace);
      } else {
        await fs.outputFile(destination, capitalReplaced);
      }
      const paths = destination.split('/');
      const index = paths.findIndex((value) => value === 'src');
      console.log('   -> 📝 File created:', paths.slice(index).join('/'));

    } catch (error) {
      console.log('💥 Write file: ', destination);
      console.log('💥 Error writing file:', error);
    }
  }
}
