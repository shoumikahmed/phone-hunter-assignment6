const searchResult = document.getElementById('search-result')
const searchField = document.getElementById('search-field')
const searchText = searchField.value
const phoneDetails = document.getElementById('phone-details')
const loadPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    searchField.value = ''
    const error = document.getElementById("error");
    if (searchText == '' || isNaN(searchText) == false) {
        error.innerText = "please give a phone name";
        searchField.value = ''
        searchResult.innerHTML = ''
    }
    else {
        searchResult.innerHTML = ''

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
        error.innerHTML = ''
        phoneDetails.textContent = ''
    }

}

const displayPhone = phones => {
    // console.log(phones)
    const error = document.getElementById("error");
    if (phones.length == 0) {
        error.innerText = "please give a valid phone name";
    }
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = ''
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-md-4')
        div.classList.add('col-lg-4')
        div.classList.add('mt-5')
        div.innerHTML = `
            <div class="card" style="width: 13rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <p class="card-text">Brand Name: ${phone.brand}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-success">Details</button>
                </div>
            </div>`
        searchResult.appendChild(div)
    })
}


const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = ''
    const div = document.createElement('div')
    div.classList.add('col-md-12')
    div.classList.add('col-lg-12')
    div.innerHTML = `
    <div class="card"  >
        <div class=""><img src="${phone.image ? phone.image : 'not available'}" class="" alt=""></div>
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text"><strong>chipset:</strong> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'not available'}</p>
            <p class="card-text"><strong>display:</strong> ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'not available'}</p>
            <p class="card-text"><strong>memory:</strong> ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'not available'}</p>
            <p class="card-text"><strong>storage:</strong> ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'not availble'}</p>
            <p class="card-text"><strong>sensor:</strong> ${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[0] : 'notavailable'},${phone.mainFeatures.sensors[1] ? phone.mainFeatures.sensors[1] : 'not available'},${phone.mainFeatures.sensors[2] ? phone.mainFeatures.sensors[2] : 'not available'},${phone.mainFeatures.sensors[3] ? phone.mainFeatures.sensors[3] : 'not available'},${phone.mainFeatures.sensors[4] ? phone.mainFeatures.sensors[4] : 'not available'},${phone.mainFeatures.sensors[5] ? phone.mainFeatures.sensors[5] : 'not available'}</p>
            <P class="card-title"><strong>other:</strong>{Bluetooth: ${phone.others?.Bluetooth ? phone.others?.Bluetooth : 'not available'}, GPS: ${phone.others?.GPS ? phone.others?.GPS : 'not available'}, NFC: ${phone.others?.NFC ? phone.others?.NFC : 'not available'}, Radio: ${phone.others?.Radio ? phone.others?.Radio : 'not available'}, USB: ${phone.others?.USB ? phone.others?.USB : 'not available'}, WLAN: ${phone.others?.WLAN ? phone.others?.WLAN : 'not available'}}</P>
            <p class="card-text"><strong>Release Date:</strong> ${phone.releaseDate ? phone.releaseDate : 'coming soon'}</p>
        </div>
    </div>
    `
    phoneDetails.appendChild(div)
}