#!/usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer')
const path = require("path")
const childProcess = require("child_process")
const fuzzy = require('fuzzy');

inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));

const configs = ['babel', 'typescript', 'eslint', 'router'];

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
      },
      {
        type: 'checkbox-plus',
        name: 'configs',
        message: 'Enter configs',
        pageSize: 10,
        highlight: true,
        searchable: true,
        default: ['babel', 'router'],
        source: function(answersSoFar, input) {
          input = input || '';
    
          return new Promise(function(resolve) {
    
            var fuzzyResult = fuzzy.filter(input, configs);
    
            var data = fuzzyResult.map(function(element) {
              return element.original;
            });
    
            resolve(data);
            
          });
    
        }
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