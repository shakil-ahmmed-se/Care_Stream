const loadDoctors = () => {
  // Show spinner before fetching data
  document.getElementById('spinner').style.display = 'block';

  fetch("https://creat-stream.onrender.com/doctor/list/")
      .then(res => res.json())
      .then(data => {
          displayDoctors(data);
          document.getElementById('spinner').style.display = 'none';
      })
      .catch(err => {
          console.log(err);
          document.getElementById('spinner').style.display = 'none';
      });
}

const displayDoctors = (services) => {
  const parent = document.getElementById('slider2');
  parent.innerHTML = ''; 

  services.forEach((service) => {
      const li = document.createElement('li');
      li.innerHTML = `
      <div class="card shadow h-100">
          <div class="ratio ratio-1x1">
              <img src=${service.image} class="card-img-top" loading="lazy" alt="...">
          </div>
          <div class="card-body ">
              <div class="flex-grow-1">
                  <strong>Dr. ${service.user}</strong>
                  <p class="card-text">${service.specialization}</p>
                  <div class="px-md-2 mb-3">Fee:${service.fee}</div>
                  <button class="btn btn-secondary hover-top rounded-pill border-0" type="submit">View Profile</button>
              </div>
          </div>
      </div>`;
      parent.appendChild(li);
  });
}




const loadReview = () => {
  const spinner = document.getElementById('spinner3');
  const reviewContainer = document.getElementById('review-container');
  
  // Show the spinner
  spinner.style.display = 'block';
  
  fetch('https://creat-stream.onrender.com/doctor/review/')
    .then(res => res.json())
    .then(data => {
      displayReview(data);
      
      // Hide the spinner after data is loaded
      spinner.style.display = 'none';
      
      // Show the review container
      reviewContainer.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching reviews:', error);
      
      // Hide the spinner if there's an error
      spinner.style.display = 'none';
    });
};

const displayReview = (reviews) => {
  const parent = document.getElementById('review-container');
  let isFirstReview = true;

  reviews.forEach((review) => {
    const div = document.createElement('div');
    div.classList.add('carousel-item');

    if (isFirstReview) {
      div.classList.add('active');
      isFirstReview = false;
    }

    div.innerHTML = `
      <div class="row h-100">
        <div class="col-sm-3 text-center">
          <img src="images/people-who-loves.png" width="100" alt="" />
          <h5 class="mt-3 fw-medium text-secondary">${review.reviewer}</h5>
          <p class="fw-normal mb-0">${review.rating}</p>
        </div>
        <div class="col-sm-9 text-center text-sm-start pt-3 pt-sm-0">
          <h2>Fantastic Response!</h2>
          <div class="my-2">
            <i class="fas fa-star me-2"></i>
            <i class="fas fa-star me-2"></i>
            <i class="fas fa-star me-2"></i>
            <i class="fas fa-star-half-alt me-2"></i>
            <i class="far fa-star"></i>
          </div>
          <p>
            This medical and health care facility distinguishes itself from the competition by providing technologically advanced medical and health care. A mobile app and a website are available via which you can easily schedule appointments, get online consultations, and see physicians, who will assist you through the whole procedure. And all of the prescriptions, medications, and other services they offer are 100% genuine, medically verified, and proved. I believe that the Livedoc staff is doing an outstanding job. Highly recommended their health care services.
          </p>
        </div>
      </div>
    `;

    parent.appendChild(div);
  });
};

// Call the function to load the reviews
// loadReview();






loadDoctors()
// displayDoctors()

loadReview()
