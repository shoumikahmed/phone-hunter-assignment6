const loadPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    searchField.value = ''
    const error = document.getElementById("error");
    if (searchText == '' || isNaN(searchText) == false) {
        error.innerText = "please give a phone name";
        searchField.value = ''
    }
    // else if (searchText != 'Samsung' || searchText != 'Iphone' || searchText != 'Oppo' || searchText != 'Huawei') {
    //     return alert('No Result Found')
    // }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
    }

}

const displayPhone = phones => {
    // console.log(phones)

    const searchResult = document.getElementById('search-result')
    searchResult.textContent = ''
    if (searchResult == null) {
        return alert('please input phone name')
    }

    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-md-4')
        div.innerHTML = `
        <div class="card" style="width: 13rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"> Details</button>
            </div>
        </div>`
        searchResult.appendChild(div)
    })
}

const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))

}
