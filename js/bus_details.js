//transport details review and payment
const API_BASE_URL = "https://smart-city-management-system-backend.onrender.com/public_transport/";

const urlParams = new URLSearchParams(window.location.search);
const busId = urlParams.get("id");

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
                        <a class="gradient-btn" style="text-decoration: none;" data-bs-toggle="modal" data-bs-target="#reviewModal">Review</a>
                    </small>
                </div>
            </div>
        </div>
        <!-- Review Modal -->
        <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reviewModalLabel">Submit Your Review</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="reviewForm">
                            <div class="mb-3">
                                <label for="rating" class="form-label">Rating</label>
                                <select id="rating" class="form-select">
                                    <option value="⭐">⭐</option>
                                    <option value="⭐⭐">⭐⭐</option>
                                    <option value="⭐⭐⭐">⭐⭐⭐</option>
                                    <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                                    <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="comment" class="form-label">Comment</label>
                                <textarea class="form-control" id="comment" rows="3"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" onclick="submitReview()">Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Edit Review Modal -->
        <div class="modal fade" id="editReviewModal" tabindex="-1" aria-labelledby="editReviewModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editReviewModalLabel">Edit Review</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editReviewForm">
                            <div class="mb-3">
                                <label for="editRating" class="form-label">Rating</label>
                                <select id="editRating" class="form-select">
                                    <option value="⭐">⭐</option>
                                    <option value="⭐⭐">⭐⭐</option>
                                    <option value="⭐⭐⭐">⭐⭐⭐</option>
                                    <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                                    <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="editComment" class="form-label">Comment</label>
                                <textarea class="form-control" id="editComment" rows="3"></textarea>
                            </div>
                            <button type="button" id="submitEdit" class="gradient-btn">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div id="reviewsContainer" class="d-flex gap-3"></div>
        `;
        //review function call
    fetchReviews();
  } catch (error) {
    console.error("Error fetching bus details:", error);
  }
}
//function call
fetchBusDetails();

//review submit
const API_BASE_URL_REVIEW = "https://smart-city-management-system-backend.onrender.com/reviews/";

async function submitReview() {
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;
  const token = localStorage.getItem("authToken");
  console.log(busId, rating, comment);
  try {
    const response = await fetch(`${API_BASE_URL_REVIEW}reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        transport: busId,
        rating: rating,
        comment: comment,
      }),
    });

    if (response.ok) {
      alert("Review submitted successfully!");
      document.getElementById("reviewForm").reset();
      fetchReviews();
    } else {
      alert("Failed to submit review.");
    }
  } catch (error) {
    console.error("Error submitting review:", error);
  }
}

//user review frontend show
async function fetchReviews() {
  try {
    const response = await fetch(
      `${API_BASE_URL_REVIEW}reviews_list/${busId}/`
    );
    const reviews = await response.json();

    const reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = "";

    reviews.forEach((review) => {
      const reviewCard = document.createElement("div");
      reviewCard.classList.add("card", "mt-3", "bg-dark", "text-light", "w-25");
      reviewCard.innerHTML = `
                <div class="card-body">
                    <h6 class="card-title">Username >> ${review.user}</h6>
                    <p class="card-text">Rating >> ${review.rating}</p>
                    <p class="card-text">Comment >>${review.comment}</p>
                    <small class="card-text">Reviewed on >> ${review.created_at}</small>
                    <br/>
                    <br/>
                    <small>
                        <a class="gradient-btn" style="text-decoration: none;" onclick="editReview(${review.id}, '${review.rating}', '${review.comment}')">Edit</a>
                    </small>
                    <small>
                        <a class="gradient-btn-1" style="text-decoration: none;" onclick="deleteReview(${review.id})">Delete</a>
                    </small>
                </div>
            `;
      reviewsContainer.appendChild(reviewCard);
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

//edit review
async function editReview(reviewId, rating, comment) {
    // Show modal
    const editModal = new bootstrap.Modal(
      document.getElementById("editReviewModal")
    );
    document.getElementById("editRating").value = rating;
    document.getElementById("editComment").value = comment;
    document.getElementById("submitEdit").onclick = async function () {
      const updatedRating = document.getElementById("editRating").value;
      const updatedComment = document.getElementById("editComment").value;
      const token = localStorage.getItem("authToken");
  
      try {
        const response = await fetch(
          `${API_BASE_URL_REVIEW}reviews/${reviewId}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
              rating: updatedRating,
              comment: updatedComment,
            }),
          }
        );
  
        if (response.ok) {
          alert("Review updated successfully!");
          editModal.hide();
          fetchReviews();
        } else {
          alert("Failed to update review.");
        }
      } catch (error) {
        console.error("Error updating review:", error);
      }
    };
  
    editModal.show();
  }
  
  //delete review
  async function deleteReview(reviewId) {
    const token = localStorage.getItem("authToken");
  
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(
          `${API_BASE_URL_REVIEW}reviews/${reviewId}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
  
        if (response.ok) {
          alert("Review deleted successfully!");
          fetchReviews();
        } else {
          alert("Failed to delete review.");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  }
  