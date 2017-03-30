 // Initialize Firebase
var config = {
    apiKey: "AIzaSyAm-cpKzq3v6g4UGoml6siA0x_f-beohA0",
    authDomain: "train-scheduler-6a011.firebaseapp.com",
    databaseURL: "https://train-scheduler-6a011.firebaseio.com",
    storageBucket: "train-scheduler-6a011.appspot.com",
    messagingSenderId: "900627385501"
};

firebase.initializeApp(config);

var database = firebase.database();

var refresh;

function refreshTable() {
    refresh = setInterval(1000);
}

$("#addTrain").on("click", function() {
    event.preventDefault();


    var trainFrequency;
    var train = $("#train").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#time").val().trim();
    var frequency = $("#frequency").val().trim();
    // var minAway;
    // var nextTrain;

    database.ref().push({
        train: train,
        destination: destination,
        time: time,
        frequency: frequency

    });

    console.log("Train Name: ", train);
    console.log("Destination: ", destination);
    console.log("First Train Time: ", time);
    console.log("Frequency: ", frequency);


    $(".form-control").val("");
});

database.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();

    var firstTrain = moment(sv.time, "hh:mm");
    console.log("firstTrain: ", firstTrain);

    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));


    var diffTime = moment().diff(moment(firstTrain), "minutes");
    console.log("Difference in time: " + diffTime);

    var tRemainder = diffTime % sv.frequency;
    console.log("tRemainder: ", tRemainder);

    var tMinutesTillTrain = sv.frequency - tRemainder;
    console.log("Minutes till train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));


    var tableRow = $("<tr>");

    tableRow.append("<th>" + sv.train + "</th>");
    tableRow.append("<th>" + sv.destination + "</th>");
    tableRow.append("<th>" + sv.frequency + "</th>");
    tableRow.append("<th>" + moment(nextTrain).format('hh:mm') + "</th>");
    tableRow.append("<th>" + tMinutesTillTrain + "</th>");

    $("#trainInfo").append(tableRow);

    // var boardingNow;

    if (currentTime = nextTrain) {

        time = "Boarding Now";

    }

},function(errorObject){
  console.log('Error Handled: '+ errorObject.code);

});
