var currentDay = $("#currentDay").text(moment().format("dddd, MMM do"));;
var textInputs = $("textarea");
var currentTime = parseInt(moment().format("HH"));
console.log(textInputs)

var taskObj = {}
var time = {
    "text1" : 9,
    "text2" : 10,
    "text3" : 11,
    "text4" : 12,
    "text5" : 13,
    "text6" : 14,
    "text7" : 15,
    "text8" : 16,
    "text9" : 17

}

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


saveBtn.on("click", function() {
    var btnIndex = $(this).attr("data-index");
    for (let i = 0; i < textInputs.length; i++) {
        if(textInputs.eq(i).attr("data-index") === btnIndex) {
            taskObj[btnIndex] = textInputs.eq(i).val().trim();
            
            localStorage.setItem("tasks", JSON.stringify(taskObj));
        }
    }
    
});

// function resets taskobj if it is the next day

var timer = setInterval(function() {
    currentTime = parseInt(moment().format("HH"));
    if(currentTime === 0) {
        $.each(textInputs, () => {
            $(this).val("");
        })
    }
}, 600000)



// based on time, change background of input text area.
$.each(textInputs, function() {
    var textAreaId = $(this).attr("id");
    console.log(textAreaId);
    if(time[textAreaId] < currentTime) {
        $(this).addClass("past");
    } else if( time[textAreaId] == currentTime) {
        $(this).addClass("present");
    } else {
        $(this).addClass("future");
    }

});