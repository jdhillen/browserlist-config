#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { confirm, select } from '@inquirer/prompts';

const packagePath = join(process.cwd(), 'package.json');

const CONFIG_OPTIONS = {
  default: {
    name: 'Default',
    description: 'Balanced support for modern and legacy browsers',
    config: [
      "extends @jdhillen/browserslist-config-test"
    ]
  },
  modern: {
    name: 'Modern',
    description: 'Latest 2 versions of modern browsers only',
    config: [
      "extends @jdhillen/browserslist-config-test/modern"
    ]
  },
  legacy: {
    name: 'Legacy',
    description: 'Extended support for older browsers',
    config: [
      "extends @jdhillen/browserslist-config-test/legacy"
    ]
  }
};

async function setupBrowserslist() {
  try {
    // Read the existing package.json
    const packageData = await readFile(packagePath, 'utf8');
    const packageJson = JSON.parse(packageData);

    // Check if browserslist config already exists
    if (packageJson.browserslist) {
      const shouldOverwrite = await confirm({
        message: 'Browserslist configuration already exists. Do you want to overwrite it?',
        default: false
      });

      if (!shouldOverwrite) {
        console.log('ℹ️ Setup cancelled - existing configuration kept');
        return;
      }
    }

    // Prompt for configuration choice
    const choice = await select({
      message: 'Select a browserslist configuration:',
      choices: Object.entries(CONFIG_OPTIONS).map(([value, option]) => ({
        value,
        name: option.name,
        description: option.description
      }))
    });

    // Add selected browserslist configuration
    packageJson.browserslist = CONFIG_OPTIONS[choice].config;

    // Write the updated package.json
    await writeFile(
      packagePath,
      JSON.stringify(packageJson, null, 2) + '\n',
      'utf8'
    );

    console.log('✅ Successfully added browserslist configuration to package.json');
    console.log(`📝 Added: "${CONFIG_OPTIONS[choice].config[0]}"`);
    
    if (choice === 'modern') {
      console.log('\n⚠️  Note: Modern config only supports recent browser versions');
      console.log('   This may not work for all users - check your target audience');
    } else if (choice === 'legacy') {
      console.log('\n⚠️  Note: Legacy config includes older browser support');
      console.log('   This may increase bundle sizes - consider your performance needs');
    }
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
    process.exit(1);
  }
}

setupBrowserslist();