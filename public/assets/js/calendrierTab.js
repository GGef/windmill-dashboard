export default function calendrierTab(){

const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = today;

const calendarGrid = document.getElementById('calendar-grid');
const monthName = document.getElementById('month-name');
const yearElement = document.getElementById('year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const eventModal = document.getElementById('event-modal');
const eventTitleInput = document.getElementById('event-title');
const eventDateInput = document.getElementById('event-date');
const eventThemeSelect = document.getElementById('event-theme');
const cancelButton = document.getElementById('cancel-button');
const saveButton = document.getElementById('save-button');

function generateCalendar() {
calendarGrid.innerHTML = '';
const firstDay = new Date(currentYear, currentMonth, 1).getDay();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

for (let i = 0; i < firstDay; i++) {
const emptyCell = document.createElement('div');
emptyCell.style.width = '14.28%';
emptyCell.style.height = '120px';
emptyCell.className = 'text-center border-r border-b dark:border-gray-600 px-4 pt-2 ';
calendarGrid.appendChild(emptyCell);
}

for (let i = 1; i <= daysInMonth; i++) {
const dayCell = document.createElement('div');
dayCell.style.width = '14.28%';
dayCell.style.height = '120px';
dayCell.className = 'px-4 pt-2 border-r border-b dark:border-gray-600 relative dark:text-gray-400 cursor-pointer';
dayCell.textContent = i;

dayCell.addEventListener('click', () => showEventModal(new Date(currentYear, currentMonth, i)));
calendarGrid.appendChild(dayCell);

const eventDateStr = new Date(currentYear, currentMonth, i).toDateString();
if (events[eventDateStr]) {
  const eventsContainer = document.createElement('div');
  eventsContainer.className = 'event-container';
  events[eventDateStr].forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'event rounded-lg px-2 py-1 rounded-lg mt-1 overflow-hidden border ';
    eventElement.textContent = event.title;
    eventElement.style.backgroundColor = event.theme; 
    eventsContainer.appendChild(eventElement);
  });
  dayCell.appendChild(eventsContainer);
}
}

monthName.textContent = MONTH_NAMES[currentMonth];
yearElement.textContent = currentYear;
}

function showEventModal(date) {
selectedDate = date;
eventDateInput.value = formatDate(date); // Use the formatDate function to display the date in French
eventModal.classList.remove('hidden');
}

function toggleEventModal() {
eventModal.classList.toggle('hidden');
eventTitleInput.value = '';
eventDateInput.value = '';
eventThemeSelect.value = 'blue';
}

function formatDate(date) {
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
return date.toLocaleDateString('fr-FR', options);
}


prevMonthButton.addEventListener('click', () => {
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
  generateCalendar();
});

nextMonthButton.addEventListener('click', () => {
  currentMonth = (currentMonth + 1) % 12;
  currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
  generateCalendar();
});

cancelButton.addEventListener('click', toggleEventModal);

// Handle event saving here (not implemented in this example)

const events = {}; // Initialize an empty events object
saveButton.addEventListener('click', () => {
const eventTitle = eventTitleInput.value;
const eventTheme = eventThemeSelect.value;

const event = {
title: eventTitle,
theme: eventTheme,
};

const eventDateStr = selectedDate.toDateString();

if (!events[eventDateStr]) {
events[eventDateStr] = [];
}

events[eventDateStr].push(event);

toggleEventModal();
generateCalendar();
});


// Initialize the calendar
generateCalendar();


}