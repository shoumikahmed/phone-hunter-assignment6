const loadPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    searchField.value = ''
    const error = document.getElementById("error");
    if (searchText == '') {
        error.innerText = "please give a phone name";
        searchField.value = ''
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
    }

}

const displayPhone = phones => {
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = ''

    if (searchResult == null) {
        return alert('No Result Found')
    }
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-md-4')
        div.innerHTML = `
        <div class="card" style="width: 13rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <button type="button" class="btn btn-success">Details</button>
            </div>
        </div>`
        searchResult.appendChild(div)
    })
}

