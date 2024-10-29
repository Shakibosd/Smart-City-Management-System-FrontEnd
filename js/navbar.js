// fetch("navbar.html")
//   .then((res) => res.text())
//   .then((data) => {
//     document.getElementById("navbar").innerHTML = data;

//     const navElement = document.getElementById("nav-element");
//     const token = localStorage.getItem("authToken");

//     if (token) {
//       fetch("http://127.0.0.1:8000/admins/admins/", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `token ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((result) => {
//           if (result.is_admin) {
//             navElement.innerHTML += `
//                 <li class="nav-item">
//                     <a class="nav-link text-light" href=""><b>Home</b></a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link text-light" href=""><b>Profile</b></a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link text-light" href=""><b>Admin Deshboard</b></a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link text-light" href=""><b>Logout</b></a>
//                 </li>
//             `;
//           } else {
//             navElement.innerHTML += `
//                 <li class="nav-item">
//                     <a class="nav-link text-light" href=""><b>Home</b></a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link text-light" href=""><b>Profile</b></a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link text-light" href=""><b>Logout</b></a>
//                 </li>
//             `;
//           }
//         });
//     } else {
//       navElement.innerHTML += `
//         <li class="nav-item">
//             <a class="nav-link text-light" href=""><b>Home</b></a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link text-light" href=""><b>Contact</b></a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link text-light" href=""><b>About</b></a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link text-light" href=""><b>Register</b></a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link text-light" href=""><b>Login</b></a>
//         </li>
//       `;
//     }
//   });

fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;

        // Assign Auth Element
        const navElement = document.getElementById("nav-element");

        const token = localStorage.getItem("authToken");

        if (token) {
            navElement.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-light" href="./auth_home.html"><b>Home</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="./profile.html"><b>Profile</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-danger" onclick="handleLogout()"><b>Logout</b></a>
                </li>
            `;
        }
        else {
            navElement.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link text-light" href="./index.html"><b>Home</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="./contact.html"><b>Contact</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="./abouts.html"><b>About</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="./signup.html"><b>SignUp</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="./login.html"><b>Login</b></a>
                </li>
            `;
        }
    });
