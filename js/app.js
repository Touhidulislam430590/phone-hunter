const loadApiData = () => {
    const search = document.getElementById('searchData');
    const searchValue = search.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(Response => Response.json())
    .then(data => loadApi(data.data));
}

const loadApi = (data) => {
    
    const parentDiv = document.getElementById('parentDiv');
    for (const item of data) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-3">
            <div class="d-flex justify-content-center align-items-center">
                <img src="${item.image}" class="card-img-top img-fluid product-image">
            </div>
            
            <div class="card-body">
                <h5 class="card-title">${item.phone_name}</h5>
                <p class="card-text">${item.brand}</p>
                <button class="btn btn-primary" onclick="selectPhone('${item.slug}')">View Details</button>
            </div>
        </div>
        `;
        parentDiv.appendChild(div);
    }
}

const selectPhone = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(Response => Response.json())
    .then(data => viewProduct(data.data))
}

const printObject = item => {
    const features = document.getElementById('features');
    
}

const viewProduct = (data) => {
    console.log(data);
    let lunchingDate;
    if (data.releaseDate === '') {
        lunchingDate = 'Sorry, No release date found';
    } else {
        lunchingDate = data.releaseDate;
    }
    const detailsDiv = document.getElementById('detailSection');
    detailsDiv.innerHTML = `
    <div class="card mb-3 bg-info" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${data.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Phone Model : ${data.name}</h5>
                    <h6 class="card-title">${lunchingDate}</h6>
                    <p class="card-text"><b>Brand: </b>${data.brand}</p>
                    <p class="card-text"><b>ChipSet: </b>${data.mainFeatures.chipSet}</p>
                    <p class="card-text"><b>Storage: </b>${data.mainFeatures.storage}</p>
                    <p class="card-text"><b>Memory: </b>${data.mainFeatures.memory}</p>
                    
                    <p id="features" class="card-text"><b>Sensors :</b> ${data.mainFeatures.sensors.join(', ')}</p>

                </div>
            </div>
        </div>
    </div>
    `;
}




