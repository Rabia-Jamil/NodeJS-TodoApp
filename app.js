const yargs = require('yargs')
const { addTask, deleteTask, listTasks, getTask } = require('./todo')

yargs.command({
    command: 'add',
    describe: 'Add Todo Task to file',
    builder: {
        title: {  //title is supporting argument (check its all conditions then perform some task)
            describe: 'Title for Todo Task',
            alias: 't',
            demandOption: true,
            type: 'string',
            //default: '...',
        },
        description: { //username is supporting argument
            describe: 'Description of the Task',
            alias: 'd',
            demandOption: true,
            type: 'string',
        },
    },

    handler ({title, description}) {
        // call add method here
        addTask(title, description)
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete Todo Task from file',
    builder: {
        title: {  //title is supporting argument (check its all conditions then perform some task)
            describe: 'Title for Todo Task',
            alias: 't',
            demandOption: true,
            type: 'string',
            //default: '...',
        },
    },

    handler ({title}) {
        // call delete method here
        deleteTask(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all the Todo Tasks',

    handler () {
        // call ListTasks method here
        listTasks()
    }
})

yargs.command({
    command: 'get',
    describe: 'Get aparticular Todo Task',
    builder: {
        title: {  //title is supporting argument (check its all conditions then perform some task)
            describe: 'Title for Todo Task',
            alias: 't',
            demandOption: true,
            type: 'string',
            //default: '...',
        },
    },

    handler ({title}) {
        // call ListTasks method here
        getTask(title)
    }
})

yargs.parse()