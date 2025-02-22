//user profile details
const profileDetails = () => {
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("user_id");

  fetch(`https://smart-city-management.onrender.com/authentication/user_detail_profile/${userId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("username").value = data.username;
      document.getElementById("first_name").value = data.first_name;
      document.getElementById("last_name").value = data.last_name;
      document.getElementById("email").value = data.email;
      document.getElementById("phone_number").value = data.phone_number;
      document.getElementById("age").value = data.age;
      document.getElementById("religion").value = data.religion;
      document.getElementById("gender").value = data.gender;
      document.getElementById("date_of_birth").value = data.date_of_birth;
      document.getElementById("profile_img").src = data.profile_img;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    });
};

//update profile
const updateProfile = () => {
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("user_id");

  const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    gender: document.getElementById("gender").value,
    religion: document.getElementById("religion").value,
    phone_number: document.getElementById("phone_number").value,
    age: document.getElementById("age").value,
    date_of_birth: document.getElementById("date_of_birth").value,
  };

  fetch(`https://smart-city-management.onrender.com/authentication/user_detail_profile/${userId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      alert("Profile updated successfully!");
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    });
};
//function call
profileDetails();
updateProfile();

//edit profile image
function previewImage(event) {
  const img = document.getElementById("profile_img");
  const file = event.target.files[0];

  img.src = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append("image", file);

  fetch(`https://api.imgbb.com/1/upload?key=2bc3cad9a1fb82d25c2c1bb0ab49b035`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const imageUrl = data.data.display_url;

        localStorage.setItem("profile_img", imageUrl);

        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("user_id");

        fetch(
          `https://smart-city-management.onrender.com/authentication/user_detail_profile/${userId}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
            body: JSON.stringify({ profile_img: imageUrl }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Image URL saved to backend successfully:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        console.error("ImgBB upload failed:", data);
      }
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
}
//function call
previewImage();
