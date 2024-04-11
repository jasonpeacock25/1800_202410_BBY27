const data = [3, 1, 4, 1, 2];
let goal = 3;

// data for display report
(async function () {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get().then(userDoc => {
                //get the data fields of the user
                goal = userDoc.data().studyHour;
                console.log(userDoc.data().studyHour)
                // The bar chart
                new Chart(
                    document.getElementById('report'),
                    {
                        type: 'bar',
                        data: {
                            datasets: [{
                                type: 'bar',
                                label: 'Actual hours',
                                data: data,
                                backgroundColor: data.map(hours => {
                                    return (hours >= goal) ? 'rgba(75, 192, 192, 0.5)' : "red"
                                }),
                                order: 2
                            }, {
                                type: 'line',
                                label: 'Study goal',
                                data: [goal, goal, goal, goal, goal],
                                borderColor: 'green',
                                order: 1
                            }],
                            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', "Friday"]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            scales: {
                                y: {
                                    suggestedMax: 5,
                                    beginAtZero: true,
                                }
                            }
                        }
                    }
                );
                console.log(goal);
            })
        }
    })
})();