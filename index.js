// JavaScript code for slideshow functionality
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
//start fav product
document.addEventListener("DOMContentLoaded", function () {
  var productCards = document.querySelectorAll(".card");
  var favoritesCount = document.getElementById("favoritesCount");
  var favoritesList = [];

  // Function to add a product to favorites
  function addToFavorites(product) {
    favoritesList.push(product);
  }

  // Function to update the favorites count
  function updateFavoritesCount() {
    favoritesCount.textContent = favoritesList.length;
  }

  // Event listener for showing favorites
  favoritesCount.addEventListener("click", function (event) {
    event.preventDefault();
    toggleFavoritesList();
  });

  // Function to toggle favorites list visibility
  function toggleFavoritesList() {
    var favoritesListContainer = document.getElementById("favoritesList");
    if (favoritesListContainer.style.display === "none") {
      renderFavorites();
      favoritesListContainer.style.display = "block";
    } else {
      favoritesListContainer.style.display = "none";
    }
  }
  // Function to render favorite cards
  function renderFavorites() {
    var favoritesContainer = document.getElementById("favorites");
    favoritesContainer.innerHTML = ""; // Clear previous favorites
    favoritesList.forEach(function (favorite) {
      var favoriteItem = createFavoriteItem(favorite);
      favoritesContainer.appendChild(favoriteItem);
    });
  }

  // Function to create a favorite item
  function createFavoriteItem(product) {
    var favoriteItem = document.createElement("li");
    favoriteItem.classList.add("favorite-item");
    favoriteItem.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.title}">
      <div>
        <p>${product.title}</p>
        <p>${product.price}$</p>
      </div>
      <button class="delete">Delete</button>
      <a href="${product.title}.html "target="_blank"><button class="buy">Buy Now</button></a>
      `;

    // Add event listener to delete button
    var deleteButton = favoriteItem.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      removeFromFavorites(product);
    });
    return favoriteItem;
  }

  // Function to remove a product from favorites
  var favoritesListContainer = document.getElementById("favoritesList");
  function removeFromFavorites(product) {
    var index = favoritesList.indexOf(product);
    if (index !== -1) {
      favoritesList.splice(index, 1);
      renderFavorites(); // Update the favorites list display
      updateFavoritesCount(); // Update the favorites count
    }
    if (favoritesList.length === 0) {
      favoritesListContainer.style.display = "none";
    }
  }
  // Add event listener to each product card
  productCards.forEach(function (card) {
    var heartIcon = card.querySelector(".fa-heart");
    var likedMessage = card.querySelector(".liked");
    heartIcon.addEventListener("click", function () {
      /* Show liked message */
      likedMessage.style.display = "block";
      /* Hide the liked message after 3 seconds */
      setTimeout(function () {
        likedMessage.style.display = "none";
      }, 3000);

      var productName = card.querySelector(".card-title").textContent;
      var productPrice = card
        .querySelector(".card-text")
        .textContent.split("$")[0];
      var productImage = card.querySelector(".card-img-top").src;
      var product = {
        title: productName,
        price: productPrice,
        imageUrl: productImage,
      };
      addToFavorites(product);
      updateFavoritesCount();
    });
  });

  // Event listener for close icon
  var close = document.querySelector(".close-icon");
  close.addEventListener("click", function () {
    var favoritesListContainer = document.getElementById("favoritesList");
    favoritesListContainer.style.display = "none";
  });
});
// JavaScript for filtering products
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const products = document.querySelectorAll('.container-fluid .card');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const checkedCheckboxes = document.querySelectorAll('.filter-checkbox:checked');

            if (checkedCheckboxes.length === 0) {
                // If no checkboxes are checked, display all products
                products.forEach(function (product) {
                    product.style.display = 'block';
                });
            } else {
                // Otherwise, filter products based on checked categories
                const selectedCategories = Array.from(checkedCheckboxes).map(function (checkbox) {
                    return checkbox.value;
                });

                products.forEach(function (product) {
                    const cardTitle = product.querySelector('.card-title').textContent.toLowerCase();
                    const isCategoryMatch = selectedCategories.some(function (category) {
                        return cardTitle.includes(category);
                    });

                    if (isCategoryMatch) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            }
        });
    });
});