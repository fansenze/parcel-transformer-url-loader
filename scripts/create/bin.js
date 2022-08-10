const chalk = require('chalk');
const inquirer = require('inquirer');
const _ = require('lodash');
const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');

const destRoot = path.join(__dirname, '..', '..', 'packages');
const tpl = path.join(__dirname, 'tpl');

(async () => {
  const { package } = await inquirer.prompt([
    {
      type: 'input',
      name: 'package',
      message: 'Package Name',
      validate(input) {
        return !!input && !!input.trim();
      },
    },
  ]);

  const dest = path.join(destRoot, package);

  const exists = await fse.exists(dest);

  if (exists) {
    console.log(chalk.red(`module "${package}" exists！`));
    return;
  }

  const files = glob.sync(path.join(tpl, '**', '*'), {
    nodir: true,
  });
  const templateOptions = {
    package,
  };

  for (const file of files) {
    const content = await fse.readFile(file, 'utf-8');
    const relativeName = path.relative(tpl, file);
    const filepath = path.join(dest, relativeName);

    const compiled = _.template(content)(templateOptions);
    await fse.ensureFile(filepath);
    await fse.writeFile(filepath, compiled);
  }

  console.log(chalk.green(`"${package}" create successful！`));
})();
