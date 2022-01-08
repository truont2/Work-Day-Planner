// jQuery selectors for time, reset button, text areas, and current hour
var currentDay = $("#currentDay").text(moment().format("dddd, MMM do"));;
var textInputs = $("textarea");
var currentTime = parseInt(moment().format("HH"));
var resetBtn = $("#reset");

// objects to store saved tasks
var taskObj = {}

// object used to compare time for text are background
var time = {
    "text-9am" : 9,
    "text-10am" : 10,
    "text-11am" : 11,
    "text-12pm" : 12,
    "text-1pm" : 13,
    "text-2pm" : 14,
    "text-3pm" : 15,
    "text-4pm" : 16,
    "text-5pm" : 17

}

// function initates when page is loaded
// it displays any stored tasks for the day at certain hours
function init() {
    var storedText = JSON.parse(localStorage.getItem("tasks"));

    if (storedText !== null) {
        taskObj = storedText;
    }

    for(let i = 0; i < textInputs.length; i++) {
        if (taskObj[i + 1]) {
            textInputs.eq(i).val(taskObj[`${i + 1}`]);
        }
    }
}

init();
// function: save the text on the page
var saveBtn = $(".saveBtn");

// fucntion stores text if the save button is clicked
// only saves if both button and text area have the same data index
saveBtn.on("click", function() {
    var btnIndex = $(this).attr("data-index");
    for (let i = 0; i < textInputs.length; i++) {
        if(textInputs.eq(i).attr("data-index") === btnIndex) {
            taskObj[btnIndex] = textInputs.eq(i).val().trim();
            
            storeText();
        }
    }
    
});

// function resets taskobj if it is the next day
var timer = setInterval(function() {
    currentTime = parseInt(moment().format("HH"));
    if(currentTime === 0) {
        resetPage();
    }
}, 600000)



// based on time, change background of each input text area.
$.each(textInputs, function() {
    var textAreaId = $(this).attr("id");
    if(time[textAreaId] < currentTime) {
        $(this).addClass("past");
    } else if( time[textAreaId] == currentTime) {
        $(this).addClass("present");
    } else {
        $(this).addClass("future");
    }

});

// function resets the page content 
function resetPage() {
    taskObj = {};
    storeText();
    window.location.reload();
}

// activates the reset function to reset the page if the rest button is clicked
resetBtn.click(resetPage);

// function stores any saved tasks for the hour into the localStorage
function storeText() {
    localStorage.setItem("tasks", JSON.stringify(taskObj));
}