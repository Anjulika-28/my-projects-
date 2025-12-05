const temperatureField = document.querySelector(".temperature p");
const locationField = document.querySelector(".time_location p:first-child");
const dateField = document.querySelector(".time_location p:last-child");
const weatherField = document.querySelector(".condition p:last-child");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let target = "lucknow";

const fetchResult = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=e6a5f3634ad34b73ba1153245250412&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    // Extract values
    let locationName = data.location.name;
    let temperature = data.current.temp_c;
    let conditionText = data.current.condition.text;
    let localTime = data.location.localtime;

    // Update UI
    temperatureField.textContent = temperature + "°C";
    locationField.textContent = locationName;
    
    // FIXED: splitDate, splitTime, currentDay must be created before use
    let splitDate = localTime.split(" ")[0];
    let splitTime = localTime.split(" ")[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    dateField.textContent = `${splitDate} ${currentDay} ${splitTime}`;
    weatherField.textContent = conditionText;
};


function updateDetails(temperature, locationName, time_location, condition) {

    // FIXED: spelling mistake "spilt" → "split"
    let splitDate = time_location.split(" ")[0];
    let splitTime = time_location.split(" ")[1];

    // FIXED: get day number
    let currentDay = new Date(splitDate).getDay();

    temperatureField.innerText = temperature;
    locationField.innerText = locationName;
    dateField.innerText = time_location;

    // FIXED: conditionText,innerText = condition  → weatherField.innerText
    weatherField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResult(target);
}

fetchResult(target);

function getDayName(number) {

    switch (number) {
        case 0:
            return 'sunday'
        case 1:
            return 'monday'
        case 2:
            return 'tuesday'
        case 3:
            return 'wednesday'
        case 4:
            return 'thursday'
        case 5:
            return 'friday'
        case 6:
            return 'saturday'
    }
}
