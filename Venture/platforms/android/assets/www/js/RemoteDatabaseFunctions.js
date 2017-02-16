var host = "http://cs.mvnu.edu/classes/CAP/venture/database/connect.php";

function getAdventures(callback) {    // calls the callback function and passes all adventure's data as a javascript object
    $.post(host, { query: "getAdventures" }, function(result, status) {
        if (status == "success") {
            callback(result);
        }
        else {
            callback("Post error: " + status);
        }
    }, "json");
}

function getSteps(callback, firstStepId) {    // calls the callback function and passes all steps' data as a javascript object
    $.post(host, { query: "getSteps", firstStepId: firstStepId }, function (result, status) {
        if (status == "success") {
            callback(result);
        }
        else {
            callback("Post error: " + status);
        }
    }, "json");
}