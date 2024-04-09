const month = document.getElementById("month");
const date = document.getElementById("date");
const year = document.getElementById("year");
const day = document.getElementById("day");

const today = new Date();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

month.innerHTML = months[today.getMonth()];
date.innerHTML = today.getDate();
year.innerHTML = today.getFullYear();
day.innerHTML = days[today.getDay()];
console.log(today.getDay());