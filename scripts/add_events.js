/* When the user clicks on the button, 
     toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function selectType(event) {
    console.log(event);
    var dropdowns = document.querySelector(".dropbtn");
    console.log(event.target.innerHTML, dropdowns);
    dropdowns.innerHTML = event.target.innerHTML;
}

function addDropdownHandler() {
    const dropdown = document.querySelector("#myDropdown");
    dropdown.onclick = selectType;
}

addDropdownHandler();

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

