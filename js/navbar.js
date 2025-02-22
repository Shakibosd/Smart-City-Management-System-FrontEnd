//navbar daynamic append
fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    const navElement = document.getElementById("nav-element");
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token) {
      fetch("https://smart-city-management.onrender.com/admins/admins/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.is_admin) {
            navElement.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-light" href="./auth_home.html"><b>Auth Home</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="./profile.html?YourUserName=${username}"><b>Profile</b></a>
                </li>
                <h5>
                  <div class="dropdown">
                    <a style="text-decoration: none; color: white;" class="dropdown-toggle nav_border" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <b>Admin</b>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="./admin_deshboard.html"><b>Deshboard</b></a></li>
                        <li><a class="dropdown-item" href="./user.html"><b>User List</b></a></li>
                    </ul>
                  </div>
                </h5>
                <li class="">
                    <a class="nav-link text-light" onclick="handleLogout()"><b>Logout</b></a>
                </li>
            `;
          } else {
            navElement.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-light" href="./auth_home.html"><b>Auth Home</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="./profile.html?YourUserName=${username}"><b>Profile</b></a>
                </li>
                <li>
                    <a class="nav-link text-light" onclick="handleLogout()"><b>Logout</b></a>
                </li>
            `;
          }
        });
    } else {
      navElement.innerHTML += `
        <li class="nav-item">
            <a class="nav-link text-light" href="./index.html"><b>Home</b></a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-light" href="./contact.html"><b>Contact</b></a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-light" href="./signup.html"><b>Register</b></a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-light" href="./login.html"><b>Login</b></a>
        </li>
      `;
    }
  });
