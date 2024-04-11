const currentDate = document.querySelector(".current-date");
const dayTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const sevenDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDay();
    let lastDayOflastMonth = new Date(currYear, currMonth, 0).getDate();
    
    
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    
    let liTag = "";

    for(let i = firstDayOfMonth; i > 0; i--){
        liTag += `<li class = "inactive">${lastDayOflastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
        
    }

    for(let i = lastDayOfMonth, k = 1; i < 6; i++){
        
        liTag += `<li class="inactive">${k}</li>`;
        k = k + 1;
    }

    dayTag.innerHTML = liTag;

    
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id ==="prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11){
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }
        renderCalendar();
    });
});