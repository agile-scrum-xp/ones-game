function getTeamColour(number) {
    switch (number) {
        case 0:
            return "red";
            break;
        case 1:
            return "green";
            break;
        case 2:
            return "blue";
            break;
        case 3:
            return "yellow";
            break;
        case 4:
            return "pink";
            break;
        case 5:
            return "purple";
            break;
        case 6:
            return "brown";
            break;
        case 7:
            return "LightSlateGray";
            break;
        case 8:
            return "AliceBlue";
            break;
        case 9:
            return "Aquamarine";
            break;
        case 10:
            return "Coral";
            break;
        default:
            return "IndianRed";
    }
}

function makeTaskDroppable(taskWrapperTDObject) {
    var droppableObjectID = "#" + $(taskWrapperTDObject).attr("id")
    alert(droppableObjectID);

    $(taskWrapperTDObject).droppable({
        hoverClass: "expandTD"
    });
}