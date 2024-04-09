const table = document.querySelector('#time-table');
const daysCol = document.querySelector('#days');
const timeSlots = 9;
const studyHours = 3;
const classes = [];

const times = [830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, "Night"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function retrieveSchedule() {
    fetch("./default-schedule.json").then(res => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("404");
        }

    }).then(data => {
        //console.log(data);
        data.forEach(each => { // monday tuesday .. 
            //console.log(each);
            Object.keys(each).forEach(key => {
                //console.log(each[key]);
                classes.push(each[key])
            })

        })
        //console.log(classes);
        populateTime(times)
        populateData()

    })
}
retrieveSchedule()


function populateTime(times) {
    let div = `<div class="custom-table-cell"></div>` // empty slot


    for (let i = 0; i < times.length; i++) {
        div += `<div class="custom-table-cell times">${times[i]}</div>`
    }
    table.innerHTML += div
}





function populateData() {
    let countBlocks = 0;
    let countEmptyBlocks = 0;
    for (let j = 0; j < classes.length; j++) {
        let div = document.createElement('div');
        div.classList.add('custom-table-cell');
        div.setAttribute('id', 'tableElement' + j);
        div.setAttribute('data-index', j);

        let data = classes[j];

        div.innerText = data; // if innerText value is null, nothing will appear 
        if (data) {
            div.classList.add('school');
        } else if (countEmptyBlocks < studyHours && countBlocks != timeSlots) {
            countEmptyBlocks++;
            div.innerText = "Study Block " + countEmptyBlocks;
            div.classList.add('study');
        }

        if (countBlocks == timeSlots && countEmptyBlocks < studyHours) {
            let hoursRequired = studyHours - countEmptyBlocks;
            div.classList.add('nightExceed');
            div.setAttribute('data-hoursRequired', hoursRequired);
            div.innerText = "Hours Required: " + hoursRequired;
            countBlocks = 0;
            countEmptyBlocks = 0;
        } else if (countBlocks == timeSlots) {
            div.classList.add('night');
            div.setAttribute('data-hoursRequired', 0);
            div.innerText = "Hours Required: " + (studyHours - countEmptyBlocks);
            countBlocks = 0;
            countEmptyBlocks = 0;
        } else {
            countBlocks++;
        }

        table.appendChild(div);
        document.querySelector('#tableElement' + j).addEventListener("click", displayClickMessage);
    }
}

function displayClickMessage(event) {
    let index = event.target.getAttribute('data-index');
    let content = event.target.innerHTML;
    let studyClass = event.target.getAttribute('class');
    console.log(studyClass);
    if (studyClass.includes('studyDone')) {
        event.target.classList.remove('studyDone');
        event.target.classList.add('study');
        console.log("Changed from studyDone");
    } else if (studyClass.includes('study')) {
        event.target.classList.remove('study');
        event.target.classList.add('studyDone');
        console.log("Changed from studyDone");
    }
    console.log('#tableElement' + index);
    console.log(content);
}


function populateDays() {
    let div = ""
    days.forEach(day => {
        div += `<div class="custom-table-cell">${day}</div>`
    })
    //console.log(div);
    daysCol.innerHTML = div
    // console.log("ddf");
}
populateDays()