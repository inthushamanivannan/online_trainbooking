// =================================
// 1. GET HTML ELEMENTS
// =================================

const searchForm = document.getElementById("train-search-form");

const fromStation = document.getElementById("from");

const toStation = document.getElementById("to");

const travelDate = document.getElementById("travel-date");

const passengers = document.getElementById("passengers");


// =================================
// 2. SET MINIMUM TRAVEL DATE
// =================================

const today = new Date().toISOString().split("T")[0];

travelDate.min = today;


// =================================
// 3. TRAIN SEARCH FORM
// =================================

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const from = fromStation.value;

    const to = toStation.value;

    const date = travelDate.value;

    const passengerCount = passengers.value;


    // Check departure station

    if (from === "") {
        alert("Please select your departure station.");
        return;
    }


    // Check destination station

    if (to === "") {
        alert("Please select your destination.");
        return;
    }


    // Check same stations

    if (from === to) {
        alert("Departure and destination cannot be the same.");
        return;
    }


    // Check travel date

    if (date === "") {
        alert("Please select your travel date.");
        return;
    }


    // Collect search details

    const searchDetails = {
        from: from,
        to: to,
        date: date,
        passengers: passengerCount
    };


    console.log("Train Search Details:", searchDetails);


    // Save search information

    localStorage.setItem(
        "trainSearch",
        JSON.stringify(searchDetails)
    );


    // Navigate to train results page

    window.location.href = "pages/trains.html";

});