const SCHEDULE_HOURS = 24;  // The number of hours to render
const HOUR_SUBSECTIONS = 4; // The number of subsections to render for each hour

var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

var today = new Date();
var hourOfDay = today.getHours();
var dayOfWeek = weekday[today.getDay()];
var day = dayOfWeek;
var date = months[today.getMonth()] + " " + today.getDate() + ", " + " " + today.getFullYear();

var tableBodyHTML = "";
var displayHour;
for (let hour = 0; hour < SCHEDULE_HOURS; hour++) {
  displayHour = hour % 12;
  if (displayHour === 0) {
    displayHour = 12;
  }
  // Add the cell spanning multiple subsections & first subsection
  tableBodyHTML += `
    <tr>
      <td class="hour${(hour === hourOfDay) ? " active" : ""}" rowspan="${HOUR_SUBSECTIONS}">
        <span>${displayHour}:00 ${(hour < 11) ? "AM": "PM"}</span>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>`;
  // Add the remaining subsections
  for (let i = 0; i < HOUR_SUBSECTIONS - 1; i++) {
    tableBodyHTML += `
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>`;
  }
}
document.getElementById("id_dailyRoutineTable_body").innerHTML = tableBodyHTML;
let activeHourQuery;
let scrollToNow;
scrollToNow = function () {
  activeHourQuery = document.getElementsByClassName("hour active");
  if (!activeHourQuery.length) {
    setTimeout(scrollToNow, 100);
    return 0;
  }
  document.getElementsByClassName("hour active")[0].scrollIntoView();
  return 1;
};
