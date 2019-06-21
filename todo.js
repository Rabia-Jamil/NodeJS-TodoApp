const fs = require('fs')
const chalk = require('chalk')

const addTask = (title, description) => {
    const data = loadData()

    const isDuplicate = checkDuplicate(title, data)
    if(isDuplicate){
        console.log(chalk.red.bold("Task already exists in database!"))
    }
    else{
        //saveToDatabase
        const newTask = {
            title,
            description,
        }
        const tempData = [...data, newTask]
        saveToDatabase(tempData, title)
    }
}

const saveToDatabase = (dataToAdd, title) => {
    const jsonData = JSON.stringify(dataToAdd)
    fs.writeFileSync("data.txt", jsonData)
    console.log(chalk.green(`Todo task with title ${chalk.italic.underline.magenta("'",title,"'")} has been added in to database`))
}

const checkDuplicate = (title, data) => {
   const datafound = data.filter( d => d.title === title) //will make an array of matched titles
   return (datafound.length)
}

const loadData = () => {
    try{
        const receivedRawData = fs.readFileSync("data.txt")
        const parsedData = JSON.parse(receivedRawData)
        return parsedData
    }
    catch(e){
        return []
    }
}

const deleteTask = (title) => {
    const data = loadData()
 
    const filteredData = data.filter( d => d.title !== title)
    const taskFound = filteredData.length !== data.length

    if(taskFound) {
        saveTask(filteredData) 
        console.log(chalk.green(`Todo task ${chalk.italic.underline.magenta("'",title,"'")} has been deleted!`))
    }
    else{
        console.log(chalk.red.bold("Sorry! the task you entered to delete was not found"))
    }
}

const saveTask= (filteredData) => {
    const jsonData = JSON.stringify(filteredData)
    fs.writeFileSync("data.txt", jsonData)

}

const listTasks = () => {
    const data = loadData()

    if(data.length === 0){
        console.log(chalk.red.bold("No task to display. Please make sure you first add a task!"))
    }
    else{
        console.log(chalk.bgYellow.bold.italic.underline.black("List of all Todo Tasks!"))
        console.log(" ")
        data.map( (d, index) => {
         console.log((index + 1)+" " + chalk.blue.bgWhite.bold(""," Title ","" ) + chalk.white.bgBlue.bold( "",d.title,"" ) + " , " + chalk.blue.bgWhite.bold(""," Description ","" ) + chalk.white.bgBlue.bold( "",d.description,"" ))
         console.log("")
     })
    }

}

const getTask = (title) => {
    const data = loadData()
    const taskFound = data.find((d) => d.title === title)
    if(taskFound){
        console.log(chalk.bgYellow.bold.italic.underline.black("","Task",""))
        console.log(chalk.blue.bgWhite.bold(""," Title ","" ) + chalk.white.bgBlue.bold( "",taskFound.title,"" ) + " , " + chalk.blue.bgWhite.bold(""," Description ","" ) + chalk.white.bgBlue.bold( "",taskFound.description,"" ))
    }
    else{
        console.log(chalk.red.bold("Task title does not match! Please make sure you enter correct task title."))
    }

}

module.exports = {
    addTask,
    deleteTask,
    listTasks,
    getTask,
}