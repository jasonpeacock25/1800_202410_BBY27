reprer# Project Title

## 1. Project Description
Team #27 is developing a calendar web application to help students to receive value from the time spent entering data, and visualize progress and improvement over time, unlike memorizing tasks or using physical calendars.

## 2. Names of Contributors
List team members and/or short bio's here... 

* Hi, my name is Zhaoqiu! 

* Hi, I am Jason Peacock (jasonpeacock25), and I am looking forward to collaborating on this application!

* Hi my name is Seohyeon Park. I am excited to start this journey.

## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Icons https://www.flaticon.com/

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* New users that come to the web applation need to create an account on the welcome page.
* After creating an account, they will be directed to the main page, which contains a blank calendar for new users.
* The user should go to their profile page in the top right indicated by the silhouette to enter their information.
* On the profile page, the user should select the edit button to allow editing of the user fields, and enter their set information (A, B, C, D, CLEAR) and their study hours per day goal.
* The user will be returned to the main page where they will see their calendar with the set schedule. The application will fill empty blocks with study blocks to coincide with their study goals.
* The fill the rest of the calendar per their schedule, the user can go to the add event page on the top right (plus icon).
* The user can create an event by entering its title and associated day, time, and duration information. An event will overwrite an existing event in the schedule if it occurs at the same time. A blank title will clear the time indicated rather than creating an event.
* Upon returning to the main page the user schedule will reflect the added event and the existing set data with study time reccomendations based on their study goals. They can click the study goals to cross them off as well as any blank time blocks and click "done for today" to submit the data.
* The user can go to the report page by selecting the report button on the top left.
* The report page will show your tracked study hours compared to your goals over the week. For now the user goal is correct, but the user hours per day are placeholder data.

## 5. Known Bugs and Limitations
Here are some known bugs:
* Limitation: Hard coded report information. Submitting end of day data does store for report purposes.
* Limitation: Cannot provide study input for hours in night.
* Limitation: Only works for one week. Does not reset after end of the week.
* Limitation: Entering a set that doesn's exist will say saved succesfully but actually leave the set as is.
* Limitation: Allows negative values and values greater than 24 for number of hours per day.

## 6. Features for Future
What we'd like to build in the future:
* Resolve limitations.
* Provide vision and access to all days rather than a static week, like a typicaly calendar application.
* Provide productivity methods such as time blocking and pomodoro.
* Provide a search function for event inputs.
* Provide reminder options for events.
* Improve overall UI and UX. Especially on phone.
	
## 7. Contents of Folder
Content of the project folder:

```

Top level of project folder: 
│   .firebaserc                 #Firebase project configuration file
│   .gitignore                  #Git ignore file
│   404.html                    #Page for 404 errors
│   about_us.html               #About us HTML file, page displays team members
│   add_event.html              #Add event HTML file, page allows users to add individual events to their calendar
│   firebase-debug.log          #Debug log file for Firebase
│   firebase.json               #JSON file for Firebase congiguration
│   firebaseindex.html          #Default Firebase HTML hosting index page
│   firebase_welcome.html       #Default Firebase HTML welcome page
│   firestore.indexes.json      #JSON file for Firestore congiguration
│   firestore.rules             #Rules file for Firestore
│   index.html                  #welcome HTML file, for logging in or creating new user
│   main.html                   #main HTML file, displays the users calendar and study blocks.
│   profile.html                #profile HTML file, allows a user to update their personal information
│   README.md                   #The readme file you are currently reading
│   report.html                 #report HTML file, displays the report of users goal and studying

It has the following subfolders and files:
├───.firebase                   #Folder for Firebase hosting cache
│       hosting..cache          #The Firebase hosting cache
│
├───images                      #Folder for images
│       date-and-time.png       #Icon for calendar
│       ethan.png               #Image of group member Ethan
│       jason.png               #Image of group member Jason
│       plus-button_1.png       #Icon for add events
│       user1.png               #Icon for user settings
│       zhaoqiu.png             #Image of group member Zhaoqiu
│
├───public                      #Folder
│       404.html                #Page for 404 errors
│       index.html              #Default Firebase HTML hosting index page
│
├───scripts                     #Folder for JavaScript files
│       add_event.js            #JavaScipt file enabling functionality for the add_event html page. Modifies users schedule in firestore based on input
│       authentication.js       #JavaScript file that Authenticates user through Firebase
│       demo2.js                #JavaScript file that fills calendar from users infromation in Firestore, and enables most other funtions on the main page
│       firebaseAPI_BBY27.js    #JavaScript file that initializes Firebase app, and specific Firestore database
│       main.js                 #JavaScript file to insert users name in main page
│       profile.js              #JavaScript file that enables the displaying of current user data from the firestore, and altering of user data to firestore on profile page
│       report.js               #JavaScript file that generates report for report page
│       script.js               #JavaScript file that allows logout functionality
│       skeleton.js             #JavaScript file that fills header section on pages
│
├───styles                      #Folder for CSS files
│       about_us.css            #CSS file that styles the about_us.html page
│       add_event.css           #CSS file that styles the add_event.html page
│       demo2.css               #CSS file that styles the calendar on the main.html page
│       profile.css             #CSS file that styles the profile.html page
│       report.css              #CSS file that styles the report.html page
│       style.css               #CSS file that provides general default styling used across all pages
│
└───text                        #Folder for navbar html files
        nav_after_login.html    #navbar HTML file for pages where a user is logged in
        nav_before_login.html   #navbar HTML file for pages where a user is not logged in

```


