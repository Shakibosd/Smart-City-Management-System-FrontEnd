const profileDetails = () => {
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("user_id");

  console.log(token, userId);

  fetch(`http://127.0.0.1:8000/authentication/user_detail_profile/${userId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
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
      document.getElementById("id").textContent = data.id;
      document.getElementById("username").value = data.username;
      document.getElementById("first_name").value = data.first_name;
      document.getElementById("last_name").value = data.last_name;
      document.getElementById("email").value = data.email;
      document.getElementById("phone_number").value = data.phone_number;
      document.getElementById("age").value = data.age;
      document.getElementById("religion").value = data.religion;
      document.getElementById("gender").value = data.gender;
      document.getElementById("date_of_birth").value = data.date_of_birth;

      document.getElementById("img_logo").src =
        data.profile_img;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    });
};

profileDetails();