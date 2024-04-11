const table = document.querySelector('#time-table');
const daysCol = document.querySelector('#days');
const timeSlots = 9;
let studyHours = 3;
const classes = [];

const times = [830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, "Night"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const varDays = ["active_monday", "active_tuesday", "active_wednesday", "active_thursday", "active_friday"];
const sevenDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



function retrieveScheduleFromFirebase() {
    firebase.auth().onAuthStateChanged(user => {
        // Create an array to store promises for each asynchronous get() call
        const promises = [];
        if (user) {
            //reference to users document in firestore
            const currentUser = db.collection("users").doc(user.uid);
            // Iterate over each day of the week (Monday to Friday)
            for (let x = 0; x < days.length; x++) {
                //console.log(varDays[x]);
                // Get the schedule data for the current day from Firestore
                const promise = currentUser.get().then(userDoc => {
                    studyHours = userDoc.data().studyHour;
                    let schedule;
                    if (userDoc.exists) {
                        switch (x) {
                            case 0: schedule = userDoc.data().active_monday;
                                break;
                            case 1: schedule = userDoc.data().active_tuesday;
                                break;
                            case 2: schedule = userDoc.data().active_wednesday;
                                break;
                            case 3: schedule = userDoc.data().active_thursday;
                                break;
                            case 4: schedule = userDoc.data().active_friday;
                                break;
                        }

                        // Iterate over each time slot in the schedule
                        Object.values(schedule).forEach(classInfo => {
                            // Add the class information to the classes array
                            classes.push(classInfo);
                        });
                    } else {
                        console.log("No schedule data found.");
                    }
                }).catch(error => {
                    console.error("Error fetching schedule data:", error);
                });
                promises.push(promise);
            }
        };

        // Use Promise.all() to execute code after all promises are resolved
        Promise.all(promises).then(() => {
            // Code here will be executed after all asynchronous operations are completed
            // console.log("All schedule data retrieved:", classes);
            populateTime(times);
            populateData();
            //console.log(classes);
        });
    })
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
    let today = returnToday()
    // console.log(today);
    let startIndex
    let endIndex
    switch (today) {
        case "Monday":
            startIndex = 0
            endIndex = 9
            break
        case "Tuesday":
            startIndex = 10
            endIndex = 19
            break
        case "Wednesday":
            startIndex = 20
            endIndex = 29
            break
        case "Thursday":
            startIndex = 30
            endIndex = 39
            break
        case "Friday":
            startIndex = 40
            endIndex = 49
            break
        default:
            startIndex = null
            endIndex = null

    }

    // console.log(startIndex);
    // console.log(endIndex);

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
            // console.log('evecuted');
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

        if (startIndex <= j && j <= endIndex) {
            div.classList.remove('school')
            div.classList.add('today-highlight')
            if (data) {
                div.classList.add('today-school')
            } else if (!data) {
                div.classList.remove('study')
                div.classList.add('today-study')
            }

        }
        table.appendChild(div);
        document.querySelector('#tableElement' + j).addEventListener("click", displayClickMessage);
    }


}

function displayClickMessage(event) {
    let index = event.target.getAttribute('data-index');
    let content = event.target.innerHTML;
    let studyClass = event.target.getAttribute('class');
    //console.log(studyClass);
    // console.log(index);
    if (studyClass.includes('studyDone')) {
        event.target.classList.remove('studyDone');
        event.target.classList.add('today-study');
        // console.log("Changed from studyDone");
    } else if (studyClass.includes('today-study')) {
        event.target.classList.remove('today-study');
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

// 0 - 9 10 - 19 ... all give overlay and those rmove overlay and add clickable class 

function returnToday() {
    let date = new Date()
    return sevenDays[date.getDay()]
}

const doneToday = document.querySelector('#done-today');
function done() {
    doneToday.addEventListener('click', () => {
        
    })
}
done()
