//Filter and Transport List
const API_BASE_URL = "http://127.0.0.1:8000/public_transport/";

async function fetchTransportList() {
  const searchValue = document.getElementById("searchInput").value;

  try {
    const response = await fetch(
      `${API_BASE_URL}transport_filter/?search=${searchValue}`
    );
    const data = await response.json();

    const transportList = document.getElementById("transportList");
    transportList.innerHTML = "";
    data.results.forEach((transport) => {
      const transportCard = `
         <div class="col-md-4 mb-4">
            <div class="card bg-dark text-light hovers" style="border-radius: 15px;">
              <img src="${transport.bus_img}" class="card-img-top" alt="${transport.route_name} Image" style="border-radius: 15px 15px 0 0; height: 200px; object-fit: cover;">
              <div class="card-body">
                <h6 class="card-title"><b>Route Name >> ${transport.route_name}</b></h6>
                <p class="card-text">Bus Number >> ${transport.bus_number}</p>
                <p class="card-text">Available Seats >> ${transport.available_seats}</p>
                <a href="./bus_details.html?id=${transport.id}" class="gradient-btn" style="text-decoration: none;">Details</a>
              </div>
            </div>
         </div>`;
      transportList.innerHTML += transportCard;
    });

    if (data.results.length === 0) {
      transportList.innerHTML = `<p class="text-center">No transport found matching "${searchValue}".</p>`;
    }
  } catch (error) {
    console.error("Error fetching transport data:", error);
  }
}

//function call
fetchTransportList();

//bas location update
async function updateLocation() {
  const busNumber = document.getElementById("busNumber").value;
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `${API_BASE_URL}update_location/${busNumber}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      document.getElementById("updateStatus").innerText = data.status;
      const successId = document.getElementById("updateStatus");
      successId.style =
        "background-color: green; color: white; padding: 10px; border-radius: 10px; text-align: center; width: 50%;";
    } else {
      document.getElementById("updateStatus").innerText =
        data.error || "Failed to update location.";
      const errorId = document.getElementById("updateStatus");
      errorId.style =
        "background-color:red; color: white; padding: 10px; border-radius: 10px; text-align: center; width: 50%;";
    }
  } catch (error) {
    console.error("Error updating location:", error);
    document.getElementById("updateStatus").innerText =
      "Error updating location.";
  }
}

//bus live location tracking
let map;
let busMarker;

function initMap() {
  const defaultLocation = { lat: 23.8103, lng: 90.4125 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: defaultLocation,
  });

  const socket = new WebSocket("ws://your-websocket-url/ws/live_tracking/");

  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    updateBusLocation(data.location);
  };
}

function updateBusLocation(location) {
  const { latitude, longitude } = location;

  if (!busMarker) {
    busMarker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: "Bus Location",
    });
  } else {
    busMarker.setPosition({ lat: latitude, lng: longitude });
  }

  map.setCenter({ lat: latitude, lng: longitude });
}

//public safty services
function fetchEmergencyServices() {
  fetch("http://127.0.0.1:8000/public_safety/safety/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        const data = res.json();
        console.log(data);
      }
      return res.json();
    })

    .then((data) => {
      console.log(data);
      const emergencyServicesContainer =
        document.getElementById("emergencyServices");
      emergencyServicesContainer.innerHTML = "";
      const serviceCards = data
        .map(
          (service) => `
        <div class="col-md-4 p-2">
          <div class="card bg-dark hovers text-light" style="border-radius: 15px;">
            <div class="card-body">
              <h5 class="card-title"> Name >> ${service.name}</h5>
              <p class="card-text">Phone Number >> ${service.phone_number}</p>
              <p class="card-text">Available >> ${service.times_dates}</p>
            </div>
          </div>
        </div>
      `
        )
        .join("");
      emergencyServicesContainer.innerHTML = serviceCards;
    })
    .catch((error) => {
      console.error("Error fetching emergency services data:", error);
    });
}
//function call
fetchEmergencyServices();

//traffic management
function fetchTrafficStatus() {
  fetch("http://127.0.0.1:8000/traffic_management/traffic_status/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      const trafficStatusContainer = document.getElementById("trafficList");
      trafficStatusContainer.innerHTML = "";

      const statusCards = data
        .map((status) => {
          let color;

          if (status.status === "Clear") {
            color = "green";
          } else if (status.status === "Moderate Traffic") {
            color = "orange";
          } else if (status.status === "Heavy Traffic") {
            color = "red";
          }
          return `
          <div class="col-md-4 p-2">
            <div class="card text-light hovers bg-dark" style="border-radius: 15px;">
              <div class="card-body">
                <h5 class="card-title">Location >> ${status.location}</h5>
                <p class="card-text">Status >> <span  style="background-color: ${color}; padding: 5px; border-radius: 5px;">${status.status}</span></p>
                <p class="card-text">Last Update >> ${status.last_update}</p>
                <a class="gradient-btn" href="#help" style="text-decoration: none;">Help</a>
              </div>
            </div>
          </div>
        `;
        })
        .join("");
      trafficStatusContainer.innerHTML = statusCards;
    })
    .catch((error) => {
      console.error("Error fetching traffic status data:", error);
    });
}
//function call
fetchTrafficStatus();

//report system
function fetchIncidentReports() {
  fetch("http://127.0.0.1:8000/reporting_system/reports/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        const data = res.json();
        console.log(data);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const incidentReportsContainer =
        document.getElementById("incidentReports");
      incidentReportsContainer.innerHTML = "";

      const reportCards = data
        .map(
          (report) => `
        <div class="col-md-4 p-2">
          <div class="card bg-dark hovers text-light" style="border-radius: 15px;">
            <div class="card-body">
              <h5 class="card-title">Incident Type >> ${report.incident_type
            }</h5>
              <p class="card-text">Description >> ${report.description.slice(
              0,
              110
            )}</p>
              <p class="card-text">Reported By >> ${report.reported_by}</p>
              <p class="card-text">Location >> ${report.location}</p>
              <p class="card-text">Report Date >> ${report.report_date}</p>
              <a href="#help" class="gradient-btn-1" style="text-decoration: none;">Help</a>
            </div>
          </div>
        </div>
      `
        )
        .join("");

      incidentReportsContainer.innerHTML = reportCards;
    })
    .catch((error) => {
      console.error("Error fetching incident reports data:", error);
    });
}

// function call
fetchIncidentReports();