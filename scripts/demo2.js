const table = document.querySelector('#time-table');
const daysCol = document.querySelector('#days');
const timeSlots = 9;
const studyHours = 3;
const classes = [];

const times = [830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, "Night"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


function retrieveScheduleFromFirebase() {
    // Reference to the Firestore collection where your schedule data is stored
    const scheduleRef = firebase.firestore().collection("schedules");

    // Clear the classes array before adding new data
    // classes = [];

    // Create an array to store promises for each asynchronous get() call
    const promises = [];

    // Iterate over each day of the week (Monday to Friday)
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach(day => {
        // Get the schedule data for the current day from Firestore
        const promise = scheduleRef.doc(day).get().then(doc => {
            if (doc.exists) {
                const schedule = doc.data();

                // Iterate over each time slot in the schedule
                Object.values(schedule).forEach(classInfo => {
                    // Add the class information to the classes array
                    classes.push(classInfo);
                });
            } else {
                console.log(`No schedule data found for ${day}.`);
            }
        }).catch(error => {
            console.error(`Error fetching schedule data for ${day}:`, error);
        });

        promises.push(promise);
    });

    // Use Promise.all() to execute code after all promises are resolved
    Promise.all(promises).then(() => {
        // Code here will be executed after all asynchronous operations are completed
        // console.log("All schedule data retrieved:", classes);
        populateTime(times);
        populateData();
    });
}

retrieveScheduleFromFirebase();



function populateTime(times) {
    let div = `<div class="custom-table-cell"></div>` // empty slot


    for (let i = 0; i < times.length; i++) {
        div += `<div class="custom-table-cell times">${times[i]}</div>`
    }
    table.innerHTML += div
}





function populateData() {
    // console.log(classes);
    // console.log(classes[2]);
    let countBlocks = 0;
    let countEmptyBlocks = 0;
    for (let j = 0; j < classes.length; j++) {
        let div = document.createElement('div');
        div.classList.add('custom-table-cell');
        div.setAttribute('id', 'tableElement' + j);
        div.setAttribute('data-index', j);

        let data = classes[j];
        // console.log(data);
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
        // console.log(div);
        table.appendChild(div);
        document.querySelector('#tableElement' + j).addEventListener("click", displayClickMessage);
    }
}

function displayClickMessage(event) {
    let index = event.target.getAttribute('data-index');
    let content = event.target.innerHTML;
    let studyClass = event.target.getAttribute('class');
    // console.log(studyClass);
    if (studyClass.includes('studyDone')) {
        event.target.classList.remove('studyDone');
        event.target.classList.add('study');
        // console.log("Changed from studyDone");
    } else if (studyClass.includes('study')) {
        event.target.classList.remove('study');
        event.target.classList.add('studyDone');
        // console.log("Changed from studyDone");
    }
    // console.log('#tableElement' + index);
    // console.log(content);
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