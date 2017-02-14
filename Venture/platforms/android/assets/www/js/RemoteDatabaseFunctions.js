function getAllUsers() {
    $.post("http://cs.mvnu.edu/classes/CAP/venture/database/connect.php", { function: "getAllUsers" }, function (result) {
        return result;
    }, "json");
}

//CHANGE TO JSoN IN REMOTE