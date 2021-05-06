#!/usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer')
const path = require("path")
const childProcess = require("child_process")

program
  .arguments('<dir>')
  .description('this is a directory')
  .action(dir => {
    // console.log('--dir', dir)
    return inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'which framework do u like?',
        choices: [
          'vue',
          'react',
          'uni-app'
        ]
      }
    ]).then(answer => {
      const fullDir = path.resolve(process.cwd(), dir)
      console.log({ fullDir })
      const command = `git clone https://github.com/TOMGOU/${answer.framework}-template.git ${fullDir}`
      console.log({ command })
      childProcess.execSync(command)
    })
  })

// console.log(process.argv)
program.parse(process.argv)