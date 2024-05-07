#!/usr/bin/env node
import path from 'path';
import { Command } from 'commander';
import { configuration, SERVICE_BY_INFRA } from './src/config';
import { copyAndModifyFile } from './src/utils';

// ----------------------------------------------------------

const program = new Command();
program
  .name(configuration.name)
  .version(configuration.version)
  .description(configuration.description);

program.command('module <name>')
  .description('Create a new module')
  .option('-i, --infra <source>', 'Specify the infrastructure template (default: firebase)', 'firebase')
  .action(async (name, options) => {
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
