function Data4Plot() {

    this.numberOfDiceRoll;

    this.wastedDice4SetOfFiveRollsArray = new Array();

    this.unitCompleted4SetOfFiveRollsArray = new Array();
}

function initializeTwoDimensionalArray(numberOfTeams) {
    for (var counter = 0; counter < numberOfTeams; counter++) {
        this.wastedDice4SetOfFiveRollsArray[counter] = new Array();
        this.unitCompleted4SetOfFiveRollsArray[counter] = new Array();
    } 
}

function updateNumberOfDiceRoll() {
    this.numberOfDiceRoll++;
}

function updateWastedDice(teamCounter, setNumber) {
    var tempValue = wastedDice4SetOfFiveRollsArray[teamCounter][setNumber];
    wastedDice4SetOfFiveRollsArray[teamCounter][setNumber] = tempValue + 1;
}

function updateUnitOfCompletedTask(teamCounter, setNumber, value) {
}


Data4Plot.prototype.UpdateWastedDice = updateWastedDice;
Data4Plot.prototype.UpdateUnitCompleted = updateUnitOfCompletedTask;
Data4Plot.prototype.Initialize = initializeTwoDimensionalArray;

//Data4Plot.prototype.TeamDetails = details;
//Data4Plot.prototype.TeamDetails = details;