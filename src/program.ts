import path from 'path';
import fs from 'fs-extra'
import { Command } from 'commander';

import { capitalizeFirstLetter, delay, helloProgram } from './utils';

import { InfrastructureType, ModuleOptions, ScaffoldType } from './types';

import { configuration, CRUD_SCAFFOLD_FILES, INITIAL_SCAFFOLD_FILES, MODULE_SCAFFOLD_FILES, SERVICE_BY_INFRA } from './config';

// ----------------------------------------------------------------------------------------------------
export default class Program {
  program: Command;

  constructor() {
    this.program = new Command();
    this.initialize();
    this.commandModule();
    this.commandCrud();
    this.commandInit();
    this.program.parse(process.argv);
  }

  private initialize() {
    this.program
      .name(configuration.name)
      .version(configuration.version)
      .description(configuration.description);
  }

  private commandInit() {
    this.program.command('init [name]')
      .description('Initialize the necessary resources')
      .action(async (_, options) => {
        await helloProgram('init', '', options);
        const scaffoldFiles = this.findScaffoldFiles('init', options);
        await this.writeScaffoldFiles(scaffoldFiles, '', 'required', '');
        console.log('\n✅ Project initialized successfully! 🥳🎉');
      });
  }

  private commandModule() {
    this.program.command('module <name>')
      .description('Create a new module. Options: -i | --infra')
      .option('-i, --infra <infrastructure>', 'Infrastructure provider. Options: fetch, axios, local', 'firebase')
      .action(async (name, options: ModuleOptions) => {
        this.validateOptions(options);
        const moduleName = name.toLowerCase();
        await helloProgram('module', moduleName, options);

        // Se crean los archivos de la logica de negocio
        const scaffoldFiles = this.findScaffoldFiles('module', options);
        await this.writeScaffoldFiles(scaffoldFiles, moduleName, 'module', 'modules'),

          await this.postCreateInfrastructure('modules', moduleName, options);
        console.log('\n✅ CRUD created successfully! 🥳🎉');
      });
  }

  private commandCrud() {
    this.program.command('crud <name>')
      .description('Create a new CRUD module. Options: -i | --infra, -n | --nav')
      .option('-i, --infra <infrastructure>', 'Infrastructure provider. Options: fetch, axios, local', 'firebase')
      .option('-n, --nav <navigation>', 'Navigation template. Options: stack, tabs', 'stack')
      .action(async (name, options: ModuleOptions) => {
        this.validateOptions(options);
        const moduleName = name.toLowerCase();
        await helloProgram('crud', moduleName, options);

        // Se crean los archivos de la logica de negocio
        const scaffoldFilesModule = this.findScaffoldFiles('module', options);
        await this.writeScaffoldFiles(scaffoldFilesModule, moduleName, 'module', 'modules');
        await delay(369);

        // Se crean los archivos de la UI
        const scaffoldFilesUI = this.findScaffoldFiles('crud', options);
        await this.writeScaffoldFiles(scaffoldFilesUI, moduleName, 'screen', 'screens');

        await this.postCreateInfrastructure('modules', moduleName, options);
        console.log('\n✅ CRUD created successfully! 🥳🎉');

      });
  }

  private validateOptions(options: ModuleOptions) {
    const infra = Object.values(InfrastructureType).map((file) => file);
    if (infra.includes(options.infra)) {
      return;
    }
    this.program.error('\n💥 Invalid infrastructure option.\n🚦 Options avaiable for the option -i: fetch, axios, local\n');
  }

  private findScaffoldFiles(type: ScaffoldType, options: ModuleOptions) {
    const dic = {
      init: {
        files: INITIAL_SCAFFOLD_FILES,
        folder: 'required'
      },
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

  private async writeScaffoldFiles(files: string[], moduleName: string, template: string, dest: string) {
    try {
      const urlTemplate = path.join(__dirname, 'templates', template); // -> Url donde estan los templates (archivos de ejemplo)
      const urlDest = path.join(process.cwd(), 'src', dest, moduleName); // -> Url donde se crearan los archivos (carpeta destino)
      for (const file of files) {
        const destinationFile = path.join(urlDest, path.relative(urlTemplate, file));
        await this.copyAndModifyFile(file, destinationFile, moduleName);
      }
      console.log('\n🚀 All ' + template + ' files were created successfully! 🎉\n');
      await delay(369);
    } catch (error) {
      console.error('💥 Error processing files:', error);
    }
  }

  private async copyAndModifyFile(source: string, destination: string, moduleName: string) {
    let capitalReplaced = '';

    try {
      const fileContent = await fs.readFile(source, 'utf8');
      if (moduleName === '') {
        await fs.outputFile(destination, fileContent);
        const paths = destination.split('/');
        const index = paths.findIndex((value) => value === 'src');
        console.log('   -> 📝 File created:', paths.slice(index).join('/'));
        return;
      }
      capitalReplaced = fileContent.replace(/Scaffold/g, capitalizeFirstLetter(moduleName));
    } catch (error) {
      console.log('💥 Read file: ', source);
      console.log('💥 Error reading file:', error);
    }

    try {
      if (source.includes('/app/') || source.includes('/infrastructure/')) {
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

  private async postCreateInfrastructure(dest: string, moduleName: string, options: ModuleOptions) {
    const urlDest = path.join(process.cwd(), 'src', dest, moduleName, 'infrastructure', 'repository.ts'); // -> Url donde se crearan los archivos (carpeta destino)
    const fileContent = await fs.readFile(urlDest, 'utf8');
    if (options.infra === InfrastructureType.fetch) {
      const capitalReplaced = fileContent.replace(/Firebase/g, capitalizeFirstLetter(InfrastructureType.fetch));
      const lowerReplaced = capitalReplaced.replace(/firebase/g, InfrastructureType.fetch);
      await fs.outputFile(urlDest, lowerReplaced);
    }
    if (options.infra === InfrastructureType.axios) {
      const capitalReplaced = fileContent.replace(/Firebase/g, capitalizeFirstLetter(InfrastructureType.axios));
      const lowerReplaced = capitalReplaced.replace(/firebase/g, InfrastructureType.axios);
      await fs.outputFile(urlDest, lowerReplaced);
    }
  }
}
