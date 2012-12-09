var defaultMaximumTaskSize = 5;
var defaultNumberOfDice = 6;
var defaultNumberOfBacklog = 5;
var defaultBacklogFilled = true;

var teamCounter = 0;
var taskCounter = 0;



/*
Team Constructor
String TeamName
String TeamColour
Integer Number of Dice
Integer Number of Backlog allowed
Boolean true/false if backlog is prefilled // relevant only to first team
Integer Maximum size of Activity -> 7 means any activity can't take more than 7 days to finish
*/
function Team(teamName, teamColour, numberOfDice, numberOfBacklog, backlogFilled, maximumTaskSize) {
    this.teamName = teamName;
    this.teamColour = teamColour;

    this.numberOfDice = ((numberOfDice != null) ? numberOfDice : defaultNumberOfDice);
    this.numberOfBacklog = ((numberOfBacklog != null) ? numberOfBacklog : defaultNumberOfBacklog);
    this.backlogFilled = ((backlogFilled != null) ? backlogFilled : defaultBacklogFilled);
    this.maximumTaskSize = ((maximumTaskSize != null) ? maximumTaskSize : defaultMaximumTaskSize);

    this.teamID = "team_" + teamCounter++;
    this.tasksArray = new Array();
    this.backlogTasksArray = new Array();
    this.workInProgressTasksArray = new Array();
    this.doneTasksArray = new Array();
}

function details() {
    var localDetails = "";
    localDetails = localDetails + this.teamName + "  ";
    localDetails = localDetails + this.teamColour + "  ";
    localDetails = localDetails + this.numberOfDice + "  ";
    localDetails = localDetails + this.numberOfBacklog + "  ";
    localDetails = localDetails + this.backlogFilled + "  ";
    localDetails = localDetails + this.maximumTaskSize + "  ";

    return localDetails;
}

function addTask(taskObject) {
    this.tasksArray[this.tasksArray.length] = taskObject;
}

function getTasks() {
    return this.tasksArray;
}

function getBacklog() {

    this.backlogTasksArray = new Array();
    var counter = this.tasksArray.length;

    for (var backlogCounter = 0; backlogCounter < counter; backlogCounter++) {
        var tempTask = this.tasksArray[backlogCounter];
        if (tempTask.numberOfUnitsCompleted == 0) {
            this.backlogTasksArray[this.backlogTasksArray.length] = tempTask;
        }
    }

    return this.backlogTasksArray;
}

function getWorkInProgress() {
    this.workInProgressTasksArray = new Array();

    for (var wipCounter = 0; wipCounter < this.tasksArray.length; wipCounter++) {
        var tempTask = this.tasksArray[wipCounter];

        if (tempTask.numberOfUnitsCompleted > 0 && tempTask.numberOfUnitsCompleted < tempTask.maximumEstimatedUnits) {
            this.workInProgressTasksArray[this.workInProgressTasksArray.length] = tempTask;
        }
    }
    return this.workInProgressTasksArray;
}

function getTasksDone() {
    this.doneTasksArray = new Array();

    for (var doneCounter = 0; doneCounter < this.tasksArray.length; doneCounter++) {
        var tempTask = this.tasksArray[doneCounter];
        if (tempTask.numberOfUnitsCompleted == tempTask.maximumEstimatedUnits) {
            this.doneTasksArray[this.doneTasksArray.length] = tempTask;
        }
    }
    return this.doneTasksArray;
}

/*
function returns null if tasks is incremented but still in the same team
function returns task if tasks need to move to next team or finished List
*/

function findAndUpdateTask(taskID, nextTeamID) {
    for (var updateCounter = 0; updateCounter < this.tasksArray.length; updateCounter++) {
        var tempTask = this.tasksArray[updateCounter];
        if (tempTask.taskID == taskID) {
            //alert(nextTeamID + "    " + taskID);
            if (tempTask.numberOfUnitsCompleted != tempTask.maximumEstimatedUnits) {
                if (tempTask.numberOfUnitsCompleted < tempTask.maximumEstimatedUnits) {
                    tempTask.Increment();
                }
            } else {
                tempTask.numberOfUnitsCompleted = 0;
                // It is already done ... move to next team
                this.tasksArray.splice(updateCounter, 1);
                return tempTask;
            }
        }
    }

    return null;
}

function teamVisualObject() {
    var visualObject = "";
    this.Backlog();
    this.WorkInProgress();
    this.Done();

    visualObject = visualObject + "<table id='" + this.teamID + "'>";
    /*
    visualObject = visualObject + "<tr>";
    visualObject = visualObject + "<td>" + this.teamName + "</td>";
    visualObject = visualObject + "<td>" + this.teamColour + "</td>";
    visualObject = visualObject + "<td>" + this.numberOfDice + "</td>";
    visualObject = visualObject + "<td>" + this.numberOfBacklog + "</td>";
    visualObject = visualObject + "<td>" + this.backlogFilled + "</td>";
    visualObject = visualObject + "<td>" + this.maximumTaskSize + "</td>";
    visualObject = visualObject + "<td>" + this.tasksArray.length + "</td>";
    
    visualObject = visualObject + "<td>" + this.backlogTasksArray.length + "</td>";
    visualObject = visualObject + "<td>" + this.doneTasksArray.length + "</td>";
    visualObject = visualObject + "</tr>";
    */
    visualObject = visualObject + "<tr>";
    visualObject = visualObject + "<th>" + "Backlog" + "</th>";
    visualObject = visualObject + "<th>" + "Work In Progress" + "</th>";
    visualObject = visualObject + "<th>" + "Task Done" + "</th>";
    visualObject = visualObject + "</tr>";

    visualObject = visualObject + "<tr>";
    visualObject = visualObject + "<td>";
    visualObject = visualObject + getVisualObjectOfBacklog(this.teamID, this.backlogTasksArray, this.teamColour);
    visualObject = visualObject + "</td>";
    visualObject = visualObject + "<td>";
    visualObject = visualObject + getVisualObjectofTasksWIP(this.teamID, this.workInProgressTasksArray, this.teamColour);
    visualObject = visualObject + "</td>";
    visualObject = visualObject + "<td>";
    visualObject = visualObject + getVisualObjectofTasksDone(this.teamID, this.doneTasksArray, this.teamColour);
    visualObject = visualObject + "</td>";
    visualObject = visualObject + "</tr>";

    visualObject = visualObject + "</table>"

    return visualObject;
}

function getVisualObjectOfBacklog(teamID, backlogArray, teamColour) {
    var visualObject = "";
    var tempTDObject = "";
    visualObject = visualObject + "<table id='" + teamID + "_backlog'>";

    for (var backlogCounter = 0; backlogCounter < backlogArray.length; backlogCounter++) {
        var tempTask = backlogArray[backlogCounter];
        visualObject = visualObject + "<tr>";

        tempTDObject = "<td width='60' height='30'  align='center' bgcolor='" + teamColour + "' class='droppable' id='cell_" + teamID + "_" + tempTask.taskID + "'>" + tempTask.maximumEstimatedUnits + "</td>";
        //makeTaskDroppable(tempTDObject);
        visualObject = visualObject + tempTDObject;
        visualObject = visualObject + "</tr>";
    }
    visualObject = visualObject + "</table>"

    return visualObject;
}

function getVisualObjectofTasksWIP(teamID, doneTasksArray, teamColour) {
    var visualObject = "";
    var tempTDObject = "";
    visualObject = visualObject + "<table id='" + teamID + "_done'>";

    for (var doneCounter = 0; doneCounter < doneTasksArray.length; doneCounter++) {
        var tempTask = doneTasksArray[doneCounter];
        visualObject = visualObject + "<tr>";

        tempTDObject = "<td width='60' height='30'  align='center' bgcolor='" + teamColour + "' class='droppable' id='cell_" + teamID + "_" + tempTask.taskID + "'>(" + tempTask.numberOfUnitsCompleted + ", " + tempTask.maximumEstimatedUnits + ")</td>";

        visualObject = visualObject +  tempTDObject;
        visualObject = visualObject + "</tr>";
    }
    visualObject = visualObject + "</table>"

    return visualObject;
}

function getVisualObjectofTasksDone(teamID, doneTasksArray, teamColour) {
    var visualObject = "";
    var tempTDObject = "";
    visualObject = visualObject + "<table id='" + teamID + "_done'>";

    for (var doneCounter = 0; doneCounter < doneTasksArray.length; doneCounter++) {
        var tempTask = doneTasksArray[doneCounter];
        visualObject = visualObject + "<tr>";

        tempTDObject = "<td width='60' height='30'  align='center' bgcolor='" + teamColour + "' class='droppable' id='cell_" + teamID + "_" + tempTask.taskID + "'>" + tempTask.maximumEstimatedUnits + "</td>";

        visualObject = visualObject  + tempTDObject;
        visualObject = visualObject + "</tr>";
    }
    visualObject = visualObject + "</table>"

    return visualObject;
}


Team.prototype.TeamDetails = details;
Team.prototype.Visual = teamVisualObject;
Team.prototype.AddTask = addTask;
Team.prototype.Backlog = getBacklog;
Team.prototype.WorkInProgress = getWorkInProgress;
Team.prototype.Done = getTasksDone;
Team.prototype.Tasks = getTasks;
Team.prototype.FindAndTask = findAndUpdateTask;

/*
Object Task
Task is the atomic Unit in Ones Game
*/
function Task(maximumEstimatedUnits) {
    this.maximumEstimatedUnits = ((maximumEstimatedUnits != null) ? maximumEstimatedUnits : defaultMaximumTaskSize);
    this.numberOfUnitsCompleted = 0;
    this.teamName = "";

    this.taskID = "task-" + taskCounter++;
}

function incrementTask() {
    var temp = this.numberOfUnitsCompleted;
    this.numberOfUnitsCompleted++;
    //alert(temp + "  " + this.numberOfUnitsCompleted);
}

function setTaskTeam(teamName) {
    this.teamName = teamName;
}

Task.prototype.Increment = incrementTask;

/*
Object for whole Game
*/
function OnesGame() {
    this.teamsArray = new Array();
    this.finishedTasksArray = new Array();

    this.lastTeamActivityInCurrentSprint = 0;
    this.currentSprintVelocity = null;
    this.velocityArray = new Array();
}

function addTeam(teamToAdd) {
    this.teamsArray[this.teamsArray.length] = teamToAdd;
}

function getTeams() {
    return this.teamsArray;
}

function gameVisualObject() {
    var visualObject = "";
    for (i = 0; i < this.teamsArray.length; i++) {
        var tempTeam = this.teamsArray[i];
        visualObject = visualObject + tempTeam.Visual() + "<br/>";
    }

    return visualObject;
}

function finishedTasksVisualObject() {
    var visualObject = "";
    var tempTDObject = "";
    visualObject = visualObject + "<table id='tasks_finished' border='1'>";

    for (var ftCounter = 0; ftCounter < this.finishedTasksArray.length; ftCounter++) {
        var tempTask = this.finishedTasksArray[ftCounter];
        visualObject = visualObject + "<tr>";

        tempTDObject = "<td width='90' height='20'  align='center' bgcolor='white' id='cell_finished_" + tempTask.taskID + "'>" + tempTask.maximumEstimatedUnits + "</td>";

        visualObject = visualObject + tempTDObject;
        visualObject = visualObject + "</tr>";
    }
    visualObject = visualObject + "</table>"

    return visualObject;
}

function velocityVisualObject() {
    var visualObject = "";
    var tempTDObject = "";
    visualObject = visualObject + "<table width='80' id='sprint_velocity' border='1'>";

    for (var velocityCounter = 0; velocityCounter < this.velocityArray.length; velocityCounter++) {
        var tempVelocity = this.velocityArray[velocityCounter];
        visualObject = visualObject + "<tr>";

        tempTDObject = "<td width='90' height='20'  align='center' bgcolor='white'>" + tempVelocity.sprintNumber + " ==> " + tempVelocity.taskFinished + "</td>";

        visualObject = visualObject + tempTDObject;
        visualObject = visualObject + "</tr>";
    }
    visualObject = visualObject + "</table>"

    return visualObject;
}

function updateTeamTask(teamID, taskID) {
   

    for (i = 0; i < this.teamsArray.length; i++) {
        var tempTeam = this.teamsArray[i];
        if (tempTeam.teamID == teamID) {

            /*  FindAndTask needs to be changed in prototype to FindAndUpdateTask
            FindAndTask returns null, if task is moved within the team
            FindAndTask returns task itself when task should be moved to next team
            */
            if (i != this.teamsArray.length - 1) {
                var taskReturn = tempTeam.FindAndTask(taskID, this.teamsArray[i + 1]);
                if (taskReturn != null) {
                    this.teamsArray[i + 1].AddTask(taskReturn);
                }
            } else {
                
                // Activity is done in the last team
                var taskReturn = tempTeam.FindAndTask(taskID, null);

               
                // activity was on "Done" task so move it to finsih array
                if (taskReturn != null && taskReturn.taskID == taskID) {
                    //alert(teamID + "  " + taskID);
                    // No matter which activity it is in current sprint
                    this.currentSprintVelocity.UpdateTaskFinished(taskReturn.maximumEstimatedUnits);

                    this.finishedTasksArray[this.finishedTasksArray.length] = taskReturn;

                    // Velocity Logic will go here ...!
                    // moved to lastTeamActivityCounter()                   
                }
            }
        }
    }

    /*
    This checks if the first team i.e. team at index 0
    has less than 3 tasks in its backlog then add new tasks
    */
    if (this.teamsArray[0].Backlog().length < 3) {
        counter = Math.floor(Math.random() * 3) + 1;
        for (var ii = 0; ii < counter; ii++) {
            var newTask = new Task(Math.floor(Math.random() * 5) + 1);
            this.teamsArray[0].AddTask(newTask);
        }
    }
}

function lastTeamActivityCounter() {
    /**/

    if (this.lastTeamActivityInCurrentSprint == 0) {
        this.currentSprintVelocity = new Velocity((this.velocityArray.length + 1), 0);
        //this.currentSprintVelocity = velocityTemp;
        //alert("lastTeamActivityCounter(): " + this.currentSprintVelocity.sprintNumber);
    }

    if (this.lastTeamActivityInCurrentSprint == 5) {
        this.velocityArray[this.velocityArray.length] = this.currentSprintVelocity;
        this.lastTeamActivityInCurrentSprint = 0;
        //alert("5 Activities Done");
        return;
    }

    this.lastTeamActivityInCurrentSprint = this.lastTeamActivityInCurrentSprint + 1;
    
}

OnesGame.prototype.Teams = getTeams;
OnesGame.prototype.AddTeam = addTeam;
OnesGame.prototype.Visual = gameVisualObject;
OnesGame.prototype.UpdateTeamTask = updateTeamTask;
OnesGame.prototype.FinishedTasks = finishedTasksVisualObject;
OnesGame.prototype.Velocity = velocityVisualObject;
OnesGame.prototype.LastTeamActivityCounter = lastTeamActivityCounter;

function Velocity(sprintNumberValue, taskFinishedValue) {
    this.sprintNumber = sprintNumberValue;
    this.taskFinished = taskFinishedValue;
}

function updateTaskFinished(newUnitOfTasksFinished) {
    this.taskFinished = this.taskFinished + newUnitOfTasksFinished;
}

Velocity.prototype.UpdateTaskFinished = updateTaskFinished;