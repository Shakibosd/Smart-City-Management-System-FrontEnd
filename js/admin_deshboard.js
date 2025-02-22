async function fetchTransportData() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/public_transport/transport/"
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        displayTransportCards(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayTransportCards(data) {
    const container = document.getElementById("transport-container");
    container.innerHTML = "";

    data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mt-4";

        card.innerHTML = `
            <div class="card bg-dark text-light hovers" style="border-radius: 15px;">
                <img src="${item.bus_img}" class="card-img-top" alt="${item.route_name} Image" style="border-radius: 15px 15px 0 0; height: 260px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title"><b>Route Name >> ${item.route_name}</b></h6>
                    <p class="card-text">Bus Number >> ${item.bus_number}</p>
                    <p class="card-text">Available Seats >> ${item.available_seats}</p>
                    <p class="card-text">Next Arrival Time >> ${item.next_arrival_time}</p>
                    <p class="card-text">Location >> ${item.current_latitude}, ${item.current_longitude}</p>
                    <p class="card-text">Schedules >> ${item.schedules}</p>
                    <p class="card-text">Last Update >> ${item.last_update}</p>
                    <p class="card-text">Launched Officially >> ${item.launched_officially_dateTime}</p> 
                    <div class="mob-btn">
                        <small>
                            <a class="gradient-btn" style="text-decoration: none;" onclick="openEditModal(${item.id})">Edit</a>
                        </small>
                        <small>
                            <a class="gradient-btn-1" style="text-decoration: none;" onclick="deleteTransport(${item.id})">Delete</a>
                        </small>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function openEditModal(transportId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/public_transport/transport/${transportId}/`);
        if (!response.ok) {
            throw new Error('Transport not found');
        }
        const transportData = await response.json();

        document.getElementById("edit-transport-id").value = transportData.id;
        document.getElementById("edit-route_name").value = transportData.route_name;
        document.getElementById("edit-bus_number").value = transportData.bus_number;
        document.getElementById("edit-available_seats").value = transportData.available_seats;
        document.getElementById("edit-next_arrival_time").value = transportData.next_arrival_time;
        document.getElementById("edit-current_latitude").value = transportData.current_latitude;
        document.getElementById("edit-current_longitude").value = transportData.current_longitude;
        document.getElementById("edit-last_update").value = transportData.last_update;
        document.getElementById("edit-schedules").value = transportData.schedules;
        document.getElementById("edit-launched_officially_dateTime").value = transportData.launched_officially_dateTime;

        // Show the modal
        document.getElementById("edit-transport-modal").style.display = "block";
    } catch (error) {
        console.error('Error fetching transport data:', error);
        alert('Error fetching transport data: ' + error.message);
    }
}

function closeEditModal() {
    document.getElementById("edit-transport-modal").style.display = "none";
}

async function uploadImageToImageBB(file) {
    const apiKey = "2bc3cad9a1fb82d25c2c1bb0ab49b035"; 
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Image upload failed");
        }

        const data = await response.json();
        return data.data.url; 
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

async function updateTransport(event) {
    event.preventDefault();

    const transportId = document.getElementById("edit-transport-id").value;
    const routeName = document.getElementById("edit-route_name").value;
    const busNumber = document.getElementById("edit-bus_number").value;
    const availableSeats = document.getElementById("edit-available_seats").value;
    const nextArrivalTime = document.getElementById("edit-next_arrival_time").value;
    const currentLatitude = document.getElementById("edit-current_latitude").value;
    const currentLongitude = document.getElementById("edit-current_longitude").value;
    const lastUpdate = document.getElementById("edit-last_update").value;
    const schedules = document.getElementById("edit-schedules").value;
    const launchedOfficiallyDateTime = document.getElementById("edit-launched_officially_dateTime").value;
    const busImageInput = document.getElementById("edit-bus_img");

    const formData = new FormData();
    formData.append("route_name", routeName);
    formData.append("bus_number", busNumber);
    formData.append("available_seats", availableSeats);
    formData.append("next_arrival_time", nextArrivalTime);
    formData.append("current_latitude", currentLatitude);
    formData.append("current_longitude", currentLongitude);
    formData.append("last_update", lastUpdate);
    formData.append("schedules", schedules);
    formData.append("launched_officially_dateTime", launchedOfficiallyDateTime);

    if (busImageInput.files.length > 0) {
        try {
            const imageUrl = await uploadImageToImageBB(busImageInput.files[0]);
            formData.append("bus_img", imageUrl); 
        } catch (error) {
            console.error("Failed to upload image:", error);
            return;
        }
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/public_transport/transport/${transportId}/`, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to update transport");
        }

        const result = await response.json();
        console.log("Transport updated successfully:", result);
    } catch (error) {
        console.error("Error updating transport:", error);
    }
}



async function deleteTransport(transportId) {
    if (confirm("Are you sure you want to delete this transport?")) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/public_transport/transport/${transportId}/`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete transport');
            }
            alert('Transport deleted successfully');
            fetchTransportData(); 
        } catch (error) {
            console.error('Error deleting transport:', error);
            alert('Error deleting transport: ' + error.message);
        }
    }
}


fetchTransportData();

//add new trasport
document
    .getElementById("transport-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const imageFile = document.getElementById("bus_img").files[0];
        let imageUrl = "";

        if (imageFile) {
            const imgFormData = new FormData();
            imgFormData.append("image", imageFile);

            try {
                const imgResponse = await fetch(
                    "https://api.imgbb.com/1/upload?key=2bc3cad9a1fb82d25c2c1bb0ab49b035",
                    {
                        method: "POST",
                        body: imgFormData,
                    }
                );
                const imgData = await imgResponse.json();

                if (!imgData.success) {
                    throw new Error("Image upload failed");
                }

                imageUrl = imgData.data.url;
            } catch (error) {
                console.error("Image upload error:", error);
                alert("Failed to upload image. Please try again.");
                return;
            }
        }

        const formData = {
            route_name: document.getElementById("route_name").value,
            bus_number: document.getElementById("bus_number").value,
            available_seats: document.getElementById("available_seats").value,
            next_arrival_time: document.getElementById("next_arrival_time").value,
            current_latitude: document.getElementById("current_latitude").value,
            current_longitude: document.getElementById("current_longitude").value,
            last_update: document.getElementById("last_update").value,
            schedules: document.getElementById("schedules").value,
            bus_img: imageUrl,
        };

        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/public_transport/transport/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            alert("Transport added successfully!");
            document.getElementById("transport-form").reset();
        } catch (error) {
            console.error("Error adding transport:", error);
            alert("Failed to add transport. Please try again.");
        }
    });

