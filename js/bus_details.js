const API_BASE_URL = "http://127.0.0.1:8000/public_transport/";

const urlParams = new URLSearchParams(window.location.search);
const busId = urlParams.get('id');

async function fetchBusDetails() {
    try {
        const response = await fetch(`${API_BASE_URL}transport/${busId}/`);
        const transport = await response.json();

        const busDetails = document.getElementById("busDetails");
        busDetails.innerHTML = `
      <div class="card bg-dark text-light" style="border-radius: 15px;">
        <img src="${transport.bus_img}" class="card-img-top" alt="${transport.route_name} Image" style="border-radius: 15px 15px 0 0; height: 460px; object-fit: cover;">
        <div class="card-body">
            <h6 class="card-title"><b>Route Name >> ${transport.route_name}</b></h6>
            <p class="card-text">Bus Number >> ${transport.bus_number}</p>
            <p class="card-text">Available Seats >> ${transport.available_seats}</p>
            <p class="card-text">Next Arrival Time >> ${transport.next_arrival_time}</p>
            <p class="card-text">Location >> ${transport.current_latitude}, ${transport.current_longitude}</p>
            <p class="card-text">Schedules >> ${transport.schedules}</p>
            <p class="card-text">Last Update >> ${transport.last_update}</p>
            <p class="card-text">Launched Officially >> ${transport.launched_officially_dateTime}</p> 
            <div class="mob-btn">
                <small>
                    <a class="gradient-btn" style="text-decoration: none;">Review</a>
                </small>
                <small>
                    <a id="payment-button" class="gradient-btn-1" style="text-decoration: none;" href="https://sandbox.sslcommerz.com/EasyCheckOut/testcdeca8b103b53a1991b628f7798fd863774" target="_blank">Payment</a>
                </small>
            </div>
        </div>
      </div>`;
    } catch (error) {
        console.error("Error fetching bus details:", error);
    }
}
//function call
fetchBusDetails();




//payment sslcommerz
// document.getElementById('payment-button').addEventListener('click', function (event) {
//     event.preventDefault();
//     const token = localStorage.getItem("authToken");
//     fetch("http://127.0.0.1:8000/payment_system/payment/", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `token ${token}`,
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data); 

//             if (data.status === "SUCCESS" && data.GatewayPageURL) {
//                 window.location.href = data.GatewayPageURL;
//             } else {    
//                 alert("Payment initiation failed. Please try again later.");
//             }
            
//         })
//         .catch(error => {
//             console.error("Error initiating payment:", error);
//             alert("An error occurred. Please try again.");
//         });
// });