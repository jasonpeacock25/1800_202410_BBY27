const table = document.querySelector('#time-table');
const daysCol = document.querySelector('#days');
const classes = [];

const times = [830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, "night"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function retrieveSchedule() {
    fetch("./default-schedule.json").then(res => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("404");
        }

    }).then(data => {
        // console.log(data);
        data.forEach(each => { // monday tuesday .. 
            console.log(each);
            Object.keys(each).forEach(key => {
                classes.push(each[key])
            })

        })
        // console.log(classes);
        populateTime(times)
        populateData()

    })

}
retrieveSchedule()


function populateTime(times) {
    let div = `<div class="table"></div>` // empty slot


    for (let i = 0; i < times.length; i++) {
        div += `<div class="table times">${times[i]}</div>`
    }
    table.innerHTML += div
}





function populateData(){

    for (let j = 0; j < classes.length; j++) {
        let div = document.createElement('div');
        div.classList.add('table');

        let data = classes[j];

        div.innerText = data; // if innerText value is null, nothing will appear 
        if(data) {
            div.classList.add('school');
        }
        

        table.appendChild(div);
    }
}



function populateDays() {
    let div = ""
    days.forEach(day => {
        div += `<div class="table">${day}</div>`
    })
    console.log(div);
    daysCol.innerHTML = div
    // console.log("ddf");
}
populateDays()