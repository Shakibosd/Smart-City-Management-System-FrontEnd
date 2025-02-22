//user list
const fetchUserList = () => {
    const token = localStorage.getItem("authToken");
    fetch("http://127.0.0.1:8000/authentication/user_list_profile/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
        },
    })
        .then(async (res) => {
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.detail || "Failed to fetch user list");
            }
            return res.json();
        })
        .then((users) => {
            console.log("User List: ", users);
            displayUsers(users);
        })
        .catch((error) => {
            console.log("Fetch Error", error.message);
        });
};

const displayUsers = (users) => {
    const userCardsContainer = document.getElementById("user-cards");

    userCardsContainer.innerHTML = "";

    users.forEach((user) => {
        const userCard = `
        <div class="mx-auto w-100 p-4">
          <div class="card bg-dark text-light p-5 hovers">
              <img src="${user.profile_img}" class="img-fluid mx-auto"  style="width: 450px; height: 400px; border-radius: 50%;">
              <br/>
              <h3 class="card-text">Id >> ${user.id}</h3>
              <p class="card-text">Date Of Birth >> ${user.date_of_birth}</p>
              <h5 class="card-title">Username >> ${user.username}</h5>
              <p class="card-text">Name >> ${user.first_name} ${user.last_name}</p>
              <p class="card-text">Email: ${user.email}</p>
              <p class="card-text">Age >> ${user.age}</p>
              <p class="card-text">Phone Number >> ${user.phone_number}</p>
              <p class="card-text">Gender >> ${user.gender}</p>
              <p class="card-text">Religion >> ${user.religion}</p>
          </div>
        </div>
      `;
        userCardsContainer.insertAdjacentHTML("beforeend", userCard);
    });
};

fetchUserList();