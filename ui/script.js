cars = []
carPrice = 0
carName = ""
let newPrice = 0
window.addEventListener("message", function (e) {
  e = e.data
  switch (e.action) {
    case "OPEN":
      return openMenu(e.data)
    case "CLOSE":
      return closeNUI()
    default:
      return;
  }
});

// esc close

document.onkeyup = function (data) {
  if (data.which == 27) {
    closeNUI();
  }
}

openMenu = (data) => {
  cars = data["Cars"]
  setCategory(data["Category"])
  setCar(data["Category"][0].name)

  $('body').css('display', 'block')
}

setCategory = (data) => {
  $('.category-box').empty()
  data.forEach(element => {
    $('.category-box').append(`
    <div class="item" data-name="${element.name}">
      <i class="fa fa-map-marker-alt"></i>
      <div class="name">${element.name}</div>
    </div>
    `)
  });
}

setCar = (data) => {
  $('.car-box').empty()
  cars[data].forEach(element => {
    $('.car-box').append(`
    <div data-name="${element.model}"  data-price="${element.price}" class="car-item">
        <div class="car-name">${element.name}</div>
        <div class="car-day">1 day</div>
        <div class="car-price">$${element.price}</div>
        <div class="car-line"></div>
        <div class="car-img">
          <img src="${element.img}" alt="">
        </div>
      </div>
    `)
  });
}

closeNUI = () => {
  $.post(`https://TN-rental/close`, JSON.stringify({}));
  $('body').css('display', 'none')
}


$(".search-input input").on("input", function () {
  let value = $(this).val().toLowerCase()
  $('.car-item').filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  })
})


$(document).on('click', '.pay-button', function (e) {
  payType = $(this).data('type')
  $.post(`https://TN-rental/rent`, JSON.stringify({
    carName: carName,
    carPrice: newPrice,
    carDay: $('.day-text').text().split(" ")[0],
    payType: payType
  }));
  closeNUI()
})

$(document).on('click', '.counter', function (e) {
  if (carPrice == 0) {
    return
  }
  e.preventDefault()
  let counter = $(".day-text")
  let count = $(counter).text().split(" ")[0]
  let rotation = $(this).data('rotation')
  if (rotation == "left") {
    count++
    newPrice = count * carPrice; // Adjust the price calculation using the initial car price
  } else {
    if (count > 1) {
      count--
      newPrice = count * carPrice; // Adjust the price calculation using the initial car price
    }
  }
  if (count < 2) {
    return
  }
  $('.total-price').text("$" + Number(newPrice))
  counter.text(count + " Day")
})



$(document).on('click', '.category-box .item', function (e) {
  categoryName = $(this).data('name')
  setCar(categoryName)

  $('.category-box .item').css('background-color','rgba(64, 66, 68, 0.3')
  $('.category-box .item').css('border','none')
  $('.category-box .item').children('i').css('color','#545f5d')
  $('.category-box .item').children('.name').css('color','#88888e')

  $(this).css('background-color','rgb(9, 66, 57,0.5)')
  $(this).css('border','1px solid #15c7a3')
  $(this).children('i').css('color','#15c7a3')
  $(this).children('.name').css('color','#15c7a3')

})

$(document).on('click', '.car-box .car-item', function (e) {
  carPrice = $(this).data('price')
  carName = $(this).data('name')
  newPrice = carPrice; // Initialize newPrice with the car price

  $('.car-box .car-item').css('background-color','rgba(64, 66, 68, 0.3')
  $('.car-box .car-item').css('border','none')
  $('.car-box .car-item').children('i').css('color','#545f5d')
  $('.car-box .car-item').children('.name').css('color','#88888e')

  $(this).css('background-color','rgb(9, 66, 57,0.5)')
  $(this).css('border','1px solid #15c7a3')
  $(this).children('i').css('color','#15c7a3')
  $(this).children('.name').css('color','#15c7a3')
  $('.total-price').text("$" + carPrice)
  $(".day-text").text(1 + " Day")
})
