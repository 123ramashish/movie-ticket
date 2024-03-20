// // Movies List
// const moviesList = [
//     { movieName: "Flash", price: 7 },
//     { movieName: "Spiderman", price: 5 },
//     { movieName: "Batman", price: 4 },
// ];

// // Selected elements
// const selectmovie = document.querySelector('#selectMovie');
// const movieNameEl = document.querySelector('#movieName');
// const moviePriceEl = document.querySelector('#moviePrice');
// const seats = document.querySelectorAll('.seat');
// const selectedSeatsHolder = document.querySelector('.selectedSeatsHolder');
// const numberOfSeat = document.querySelector('#numberOfSeat');
// const totalPrice = document.querySelector('#totalPrice');
// const proceedBtn = document.querySelector('#proceedBtn');
// const cancelBtn = document.querySelector('#cancelBtn');

// //selected variable
// let movieselect;
// let count = 0;
// let cost = 0;

// // Populate movie options
// moviesList.forEach(function(movie) {
//     let option = document.createElement('option');
//     option.textContent = movie.movieName;
//     selectmovie.appendChild(option);
// });

// // Event listener for movie selection
// selectmovie.addEventListener('change', function() {
//     movieselect = moviesList.find(movie => movie.movieName == selectmovie.value);
//     movieNameEl.textContent = movieselect.movieName;
//     moviePriceEl.textContent = `$ ${movieselect.price}`;
// });

// // Event listener for seat selection
// seats.forEach(seat => {
//     seat.addEventListener('click', function() {
//         if (!this.classList.contains('occupied')) {
//             this.classList.toggle('selected');
//             if (this.classList.contains('selected')) {
//                 count++;
//                 cost += movieselect.price;

//             // } else {
//             //     count--;
//             //     cost -= movieselect.price;
//             // }
            
//             numberOfSeat.innerText = count;
//             totalPrice.innerText = `$ ${cost}`;
//         }
//     }
//     });
// });

// // Event listener for proceed button
// proceedBtn.addEventListener('click', function() {
//     selectedSeatsHolder.innerHTML = '';
//     count = 0;
//     cost = 0;
//     numberOfSeat.innerText = count;
//     totalPrice.innerText = `$ ${cost}`;
//     seats.forEach(seat => {
//     });
// });

// // Event listener for cancel button
// cancelBtn.addEventListener('click', function() {
//     selectedSeatsHolder.innerHTML = '';
//     count = 0;
//     cost = 0;
//     numberOfSeat.innerText = count;
//     totalPrice.innerText = `$ ${cost}`;
//     seats.forEach(seat => {
//         seat.classList.remove('selected');
//     });
// });



const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  const selectMovieEl = document.getElementById("selectMovie");
  
  const allSeatCont = document.querySelectorAll("#seatCont .seat");
  console.log(allSeatCont)
  
  const selectedSeatsHolderEl = document.getElementById("selectedSeatsHolder");
  
  const moviePriceEl = document.getElementById("moviePrice");
  
  const cancelBtnEL = document.getElementById("cancelBtn");
  
  const proceedBtnEl = document.getElementById("proceedBtn");
  
  moviesList.forEach((movie) => {
    const optionEl = document.createElement("option");
    optionEl.innerHTML = `${movie.movieName} $${movie.price}`;
    selectMovieEl.appendChild(optionEl);
  });
  
  let moviePrice = 7;
  let currentMovieName = `Tom and Jerry 2021`;
  
  selectMovieEl.addEventListener("input", (e) => {
    let movieName = e.target.value.split("");
    let dollarIndex = movieName.indexOf("$");
    let movie = movieName.splice(0, dollarIndex - 1).join("");
    currentMovieName = movie;
    moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));
  
    updatMovieName(movie, moviePrice);
    updatePrice(moviePrice, takenSeats.length);
  });
  //
  let initialSeatValue = 0;
  allSeatCont.forEach((seat) => {
    const attr = document.createAttribute("data-seatid");
    attr.value = ++initialSeatValue;
    seat.setAttributeNode(attr);
  });
  
  let seatContEl = document.querySelectorAll("#seatCont .seat:not(.occupied)");
  // console.log(seatContEl);
  let takenSeats = [];
  
  seatContEl.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      let isSelected = seat.classList.contains("selected");
  
      let seatId = JSON.parse(seat.dataset.seatid);
  
      if (!isSelected) {
        seat.classList.add("selected");
        takenSeats.push(seatId);
        takenSeats = [...new Set(takenSeats)];
      } else if (isSelected) {
        seat.classList.remove("selected");
  
        takenSeats = takenSeats.filter((seat) => {
          // console.log(seat,seatId)
          if (seat !== seatId) {
            return seat;
          }
        });
      }
      updateSeats();
      updatePrice(moviePrice, takenSeats.length);
    },{ once: true });
  });
  
  function updateSeats() {
    selectedSeatsHolderEl.innerHTML = ``;
  
    takenSeats.forEach((seat) => {
      const seatHolder = document.createElement("div");
      seatHolder.classList.add("selectedSeat");
      seatHolder.innerText = seat;
      selectedSeatsHolderEl.appendChild(seatHolder);
  
      
    });
  
    if (!takenSeats.length) {
      const spanEl = document.createElement("span");
      spanEl.classList.add("noSelected");
      spanEl.innerHTML = `NO SEAT SELECTED`;
      selectedSeatsHolderEl.appendChild(spanEl);
    }
  
    seatCount();
  }
  
  function seatCount() {
    const numberOfSeatEl = document.getElementById("numberOfSeat");
    numberOfSeatEl.innerHTML = takenSeats.length;
  }
  
  function updatMovieName(movieName, price) {
    const movieNameEl = document.getElementById("movieName");
    const moviePriceEl = document.getElementById("moviePrice");
    movieNameEl.innerHTML = movieName;
    moviePriceEl.innerHTML = `$ ${price}`;
    
  }
  
  function updatePrice(price, seats) {
    const totalPriceEl = document.getElementById("totalPrice");
    let total = seats * price;
    totalPriceEl.innerHTML = `$ ${total}`;
  }
  
  cancelBtn.addEventListener("click", (e) => {
    cancelSeats();
  });
  
  function cancelSeats() {
    takenSeats = [];
    seatContEl.forEach((seat) => {
      seat.classList.remove("selected");
    });
    updatePrice(0, 0);
    updateSeats();
  }
  
  proceedBtnEl.addEventListener("click", (e) => {
    if (takenSeats.length) {
      alert("Yayy! Your Seats has been booked");
      uncancelSeats();
    } else {
      alert("Oops no seat Selected");
    }
  });
  
  function uncancelSeats() {
    takenSeats = [];
    console.log(seatContEl);
    seatContEl.forEach((seat) => {
      if(seat.classList.contains("selected")){
        console.log(seat);
      seat.classList.remove("selected");
        seat.classList.add("seat")
      seat.classList.add("occupied");
      }
    });
    updatePrice(0, 0);
    updateSeats();
  }
  