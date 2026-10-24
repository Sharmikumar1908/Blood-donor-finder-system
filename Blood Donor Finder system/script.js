
let donors = JSON.parse(localStorage.getItem("donors")) || [];

const donorForm = document.getElementById("donorForm");
const message = document.getElementById("message");
const donorList = document.getElementById("donorList");

// Register a new donor
donorForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let blood = document.getElementById("blood").value;
    let city = document.getElementById("city").value.trim();
    let phone = document.getElementById("phone").value.trim();

    let donor = {
        name: name,
        blood: blood,
        city: city,
        phone: phone
    };

    donors.push(donor);

    localStorage.setItem("donors", JSON.stringify(donors));

    message.textContent = "Donor registered successfully!";

    donorForm.reset();
});

// Search donors
document.getElementById("searchButton").addEventListener(
    "click", function() {

        let blood = document.getElementById("searchBlood").value;
        let city = document.getElementById("searchCity").value
            .trim().toLowerCase();

        donorList.innerHTML = "";

        let results = donors.filter(function(donor) {
            return (blood === "" || donor.blood === blood) &&
                   (city === "" ||
                    donor.city.toLowerCase() === city);
        });

        if (results.length === 0) {
            donorList.textContent = "No donors found.";
            return;
        }

        results.forEach(function(donor) {
            let card = document.createElement("div");
            card.className = "donor";

            let name = document.createElement("h3");
            name.textContent = donor.name;

            let group = document.createElement("p");
            group.textContent = "Blood Group: " + donor.blood;

            let location = document.createElement("p");
            location.textContent = "City: " + donor.city;

            let phone = document.createElement("p");
            phone.textContent = "Phone: " + donor.phone;

            card.append(name, group, location, phone);
            donorList.appendChild(card);
        });
    }
);
