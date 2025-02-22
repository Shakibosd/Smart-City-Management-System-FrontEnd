//password icon
const togglePassword = (fieldId, iconElement) => {
  let passwordField = document.getElementById(fieldId);
  let icon = iconElement.querySelector("i");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.classList.remove("bxs-low-vision");
    icon.classList.add("bxs-show");
  } else {
    passwordField.type = "password";
    icon.classList.remove("bxs-show");
    icon.classList.add("bxs-low-vision");
  }
};

// register
const handleRegister = async (event) => {
  event.preventDefault();
  const form = document.getElementById("register-form");
  const formData = new FormData(form);

  console.log(formData);

  const fileInput = document.getElementById("profile_img");
  const imageFile = fileInput.files[0];

  const imageUploadFormData = new FormData();
  imageUploadFormData.append("image", imageFile);

  try {
    const imgbbResponse = await fetch(
      "https://api.imgbb.com/1/upload?key=2bc3cad9a1fb82d25c2c1bb0ab49b035",
      {
        method: "POST",
        body: imageUploadFormData,
      }
    );
    const imgbbResult = await imgbbResponse.json();

    if (imgbbResult.success) {
      const imageUrl = imgbbResult.data.url;

      const registerData = {
        username: formData.get("username"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        phone_number: formData.get("phone_number"),
        gender: formData.get("gender"),
        religion: formData.get("religion"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
        age: formData.get("age"),
        date_of_birth: formData.get("date_of_birth"),
        profile_img: imageUrl,
      };

      console.log("Register Data : ", registerData);

      const response = await fetch(
        "http://127.0.0.1:8000/authentication/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );
      if (response.ok) {
        alert(
          "Registration Successfully! Please Check Your Email For Confirmation"
        );
        window.location.href = "./login.html";
      } else {
        const errorData = await response.json();
        console.error("Register Failed : ", errorData);
        alert("Register Failed: " + errorData.message);
      }
    } else {
      console.error("Image Upload Failed : ", imgbbResult.error);
      alert("Image Upload Failed, Please Try Again.");
    }
  } catch (error) {
    console.error("Registration Error: ", error);
    alert("An Error Occurred During Registration, Please Try Again.");
  }
};

//login
const handleLogin = (event) => {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  console.log("Login Data : ", loginData);

  fetch("http://127.0.0.1:8000/authentication/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login Failed");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Auth Token Received : ", data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", loginData.username);
      alert("Logged In Successfully!!!");
      window.location.href = `./profile.html?YourUserName=${loginData.username}`;
    })
    .catch((error) => {
      console.log("Login Error", error.message);
      alert("Login Failed: " + error.message); 
    });
};

//logout
const handleLogout = () => {
  if (confirm("Are You Sure Want To Logout?")) {
    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");

    console.log(token);
    console.log(user_id);
    console.log(username);

    fetch("http://127.0.0.1:8000/authentication/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
        Authorization: `user_id ${user_id}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user_id");
          localStorage.removeItem("username");
          window.location.href = "./login.html";
        } else {
          console.log("Logout Failed");
        }
      })
      .catch((error) => {
        console.log("Logout Error : ", error);
      });
  }
};
