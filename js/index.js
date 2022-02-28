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
    // else if (searchText != 'Samsung' || searchText != 'Iphone' || searchText != 'Oppo' || searchText != 'Huawei') {
    //     return alert('No Result Found')
    // }
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
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = ''
    // const error = document.getElementById("error");
    phones.forEach(phone => {
        // if (phones != phone.brand) {
        //     error.innerText = "please give a phone name";
        //     return
        // }
        // else {
        // console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-md-4')
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
        // }
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
    div.classList.add('mx-auto')
    div.innerHTML = `
    <div class="card" style="width: 13rem;" >
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">chipset: ${phone.mainFeatures.chipSet}</p>
            <p class="card-text">display: ${phone.mainFeatures.displaySize}</p>
            <p class="card-text">memory: ${phone.mainFeatures.memory}</p>
            <p class="card-text">storage: ${phone.mainFeatures.storage}</p>
            <p class="card-text">sensors: ${phone.mainFeatures.sensors[0]},${phone.mainFeatures.sensors[1]},${phone.mainFeatures.sensors[2]},${phone.mainFeatures.sensors[3]},${phone.mainFeatures.sensors[4]},${phone.mainFeatures.sensors[5]}</p>
            <P class="card-title">Bluetooth: ${phone.others?.Bluetooth}, GPS: ${phone.others?.GPS}, NFC: ${phone.others?.NFC}, Radio: ${phone.others?.Radio}, USB: ${phone.others?.USB}, WLAN: ${phone.others?.WLAN}</P>
            <p class="card-text">ReleaseDate: ${phone.releaseDate}</p>
        </div>
    </div>
    `
    phoneDetails.appendChild(div)
}