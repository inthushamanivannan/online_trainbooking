// =====================================
// 1. HOMEPAGE - TRAIN SEARCH FORM
// =====================================

const searchForm = document.getElementById("train-search-form");

if (searchForm) {

    const fromStation = document.getElementById("from");
    const toStation = document.getElementById("to");
    const travelDate = document.getElementById("travel-date");
    const passengers = document.getElementById("passengers");

    // Prevent selecting past dates
    const today = new Date().toISOString().split("T")[0];
    travelDate.min = today;

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const from = fromStation.value;
        const to = toStation.value;
        const date = travelDate.value;
        const passengerCount = passengers.value;

        if (from === "") {
            alert("Please select your departure station.");
            return;
        }

        if (to === "") {
            alert("Please select your destination.");
            return;
        }

        if (from === to) {
            alert("Departure and destination cannot be the same.");
            return;
        }

        if (date === "") {
            alert("Please select your travel date.");
            return;
        }

        const searchDetails = {
            from: from,
            to: to,
            date: date,
            passengers: passengerCount
        };

        localStorage.setItem(
            "trainSearch",
            JSON.stringify(searchDetails)
        );

        window.location.href = "pages/trains.html";

    });

}


// =====================================
// 2. DISPLAY JOURNEY DETAILS
// =====================================

const journeyDetails = document.getElementById("journey-details");

if (journeyDetails) {

    const savedSearch = localStorage.getItem("trainSearch");

    if (savedSearch) {

        const search = JSON.parse(savedSearch);

        journeyDetails.innerHTML = `
            <strong>From:</strong> ${search.from}<br>
            <strong>To:</strong> ${search.to}<br>
            <strong>Travel Date:</strong> ${search.date}<br>
            <strong>Passengers:</strong> ${search.passengers}
        `;

    } else {

        journeyDetails.textContent = "No journey details found.";

    }

}


// =====================================
// 3. SAMPLE TRAIN DATA
// =====================================

const trains = [

    {
        name: "Yal Devi Express",
        departure: "05:45 AM",
        arrival: "01:30 PM",
        price: 1500
    },

    {
        name: "Uttara Devi Express",
        departure: "06:10 AM",
        arrival: "02:00 PM",
        price: 1800
    },

    {
        name: "Intercity Express",
        departure: "08:00 AM",
        arrival: "03:45 PM",
        price: 2000
    }

];


// =====================================
// 4. DISPLAY AVAILABLE TRAIN CARDS
// =====================================

const trainList = document.getElementById("train-list");

if (trainList) {

    trainList.innerHTML = "";

    trains.forEach(function (train) {

        trainList.innerHTML += `

            <div class="train-card">

                <h2>${train.name}</h2>

                <p>
                    <strong>Departure:</strong>
                    ${train.departure}
                </p>

                <p>
                    <strong>Arrival:</strong>
                    ${train.arrival}
                </p>

                <p>
                    <strong>Price:</strong>
                    Rs. ${train.price}
                </p>

                <button onclick="bookTrain('${train.name}', ${train.price})">
                    Book Now
                </button>

            </div>

        `;

    });

}


// =====================================
// 5. BOOK NOW BUTTON FUNCTION
// =====================================

function bookTrain(trainName, price) {

    const selectedTrain = {
        name: trainName,
        price: price
    };

    localStorage.setItem(
        "selectedTrain",
        JSON.stringify(selectedTrain)
    );

    window.location.href = "booking.html";

}


// =====================================
// 6. DISPLAY SELECTED TRAIN DETAILS
// =====================================

const selectedTrainElement = document.getElementById("selected-train");

if (selectedTrainElement) {

    const savedTrain = localStorage.getItem("selectedTrain");

    if (savedTrain) {

        const train = JSON.parse(savedTrain);

        selectedTrainElement.textContent = train.name;

        document.getElementById("selected-price").textContent =
            "Ticket Price: Rs. " + train.price;

        const seatCount = document.getElementById("seat-count");

        const totalPrice = document.getElementById("total-price");

        function calculateTotal() {

            const seats = Number(seatCount.value);

            if (seats < 1 || seats > 5) {

                totalPrice.textContent = "Maximum 5 seats allowed";

                return;

            }

            totalPrice.textContent =
                "Rs. " + (train.price * seats);

        }

        seatCount.addEventListener("input", calculateTotal);

        calculateTotal();

    } else {

        selectedTrainElement.textContent = "No train selected.";

    }

}


// =====================================
// 7. CONFIRM BOOKING FUNCTION
// =====================================

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get passenger details

        const passengerName =
            document.getElementById("passenger-name").value.trim();

        const nic =
            document.getElementById("nic").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const seatCount =
            Number(document.getElementById("seat-count").value);


        // Validate seat count

        if (seatCount < 1 || seatCount > 5) {

            alert("Please select between 1 and 5 seats.");

            return;

        }


        // Get selected train

        const savedTrain = localStorage.getItem("selectedTrain");

        if (!savedTrain) {

            alert("Please select a train first.");

            return;

        }

        const train = JSON.parse(savedTrain);


        // Calculate total price

        const totalPrice = train.price * seatCount;


        // Create booking details

        const bookingDetails = {

            bookingId: "RB" + Date.now(),

            passengerName: passengerName,

            nic: nic,

            phone: phone,

            email: email,

            trainName: train.name,

            ticketPrice: train.price,

            seats: seatCount,

            totalPrice: totalPrice,

            bookingDate: new Date().toLocaleDateString()

        };


        // Save booking details

        // Get existing bookings
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Add new booking
bookings.push(bookingDetails);

// Save all bookings
localStorage.setItem("bookings", JSON.stringify(bookings));

// Save latest booking for confirmation page
localStorage.setItem(
    "bookingDetails",
    JSON.stringify(bookingDetails)
);

        // Navigate to confirmation page

        window.location.href = "confirmation.html";

    });

}


// =====================================
// 8. DISPLAY BOOKING CONFIRMATION
// =====================================

const confirmationSection = document.querySelector(
    ".confirmation-section"
);

if (confirmationSection) {

    const savedBooking = localStorage.getItem("bookingDetails");

    if (savedBooking) {

        const booking = JSON.parse(savedBooking);

        document.getElementById("booking-id").textContent =
            booking.bookingId;

        document.getElementById("confirm-name").textContent =
            booking.passengerName;

        document.getElementById("confirm-train").textContent =
            booking.trainName;

        document.getElementById("confirm-seats").textContent =
            booking.seats;

        document.getElementById("confirm-price").textContent =
            "Rs. " + booking.ticketPrice;

        document.getElementById("confirm-total").textContent =
            "Rs. " + booking.totalPrice;

        document.getElementById("confirm-date").textContent =
            booking.bookingDate;

    } else {

        confirmationSection.innerHTML = `
            <h1>No booking details found.</h1>
            <a href="../index.html">Back to Home</a>
        `;
    }
}

// =====================================
// 9. MY BOOKINGS PAGE
// =====================================

const myBookingsList = document.getElementById("my-bookings-list");

if (myBookingsList) {

    // Get all saved bookings
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (bookings.length > 0) {

        myBookingsList.innerHTML = "";

        bookings.forEach(function (booking) {

            myBookingsList.innerHTML += `

                <div class="my-booking-card">

                    <h2>${booking.trainName}</h2>

                    <p>
                        <strong>Booking ID:</strong>
                        ${booking.bookingId}
                    </p>

                    <p>
                        <strong>Passenger:</strong>
                        ${booking.passengerName}
                    </p>

                    <p>
                        <strong>Seats:</strong>
                        ${booking.seats}
                    </p>

                    <p>
                        <strong>Ticket Price:</strong>
                        Rs. ${booking.ticketPrice}
                    </p>

                    <p>
                        <strong>Total Price:</strong>
                        Rs. ${booking.totalPrice}
                    </p>

                    <p>
                        <strong>Booking Date:</strong>
                        ${booking.bookingDate}
                    </p>

                </div>

            `;

        });

    } else {

        myBookingsList.innerHTML = `
            <div class="no-bookings">
                <h3>No Bookings Found</h3>
                <p>You haven't booked any tickets yet.</p>
            </div>
        `;

    }

}
