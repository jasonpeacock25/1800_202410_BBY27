const table = document.querySelector('#time-table');
const classes = [];
function retrieveSchedule() {
    fetch("./default-schedule.json").then(res => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("404");
        }

    }).then(data => {
        data.forEach(each => { // monday tuesday .. 
            Object.keys(each).forEach(key => {
                console.log(`${key} : ${each[key]}`);
                classes.push(each[key])
            })
            
        })
        console.log(classes);
    })

}
retrieveSchedule()
const times = [830, 930, 1030, 1130, 1230, 1330, 1430, 1530, 1630, "night"];

function populateTime(times) {
    let div = `<div class="table"></div>` // empty slot

    console.log(times.length);

    for(let i = 0; i < times.length; i++) {
        console.log(times[i]);
        div += `<div class="table">${times[i]}</div>`
    }
    table.innerHTML += div
}

populateTime(times)

function populateData(key, value) {
    populateTime(key)
}


