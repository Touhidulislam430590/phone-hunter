// search execute to press enter code here 
document.getElementById('searchData').addEventListener('keyup', ({key}) => {
    if (key === "Enter"){
        loadApiData();
    }});

// fetch api fuction here 
const loadApiData = () => {
    const search = document.getElementById('searchData');
    let searchValue = search.value;
    document.getElementById('parentDiv').innerHTML = ``;
    document.getElementById('detailSection').innerHTML = ``;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(Response => Response.json())
    .then(data => loadApi(data));
    searchValue = '';
}

// load data from api 
const loadApi = (data) => {
    if (data.length != 0) {
        // slice get array data 
        const displayData = data.data.slice(1, 21);
        const parentDiv = document.getElementById('parentDiv');
        // loop for deploy array 
        for (const item of displayData) {
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

        // show more data by clicking a button 
        if (data.data.length > 20) {
            const btnDiv = document.createElement('div');
            btnDiv.innerHTML = `<button class="btn btn-primary" onclick="viewAllItems()">View All</button>`;
            parentDiv.appendChild(btnDiv);
        }
        
    } else {
        // show error message here 
        alert('This data not exist...');
    }
}

// view all data after clicking button 
const viewAllItems = () => {
    // fetch api for clicking button 
    const search = document.getElementById('searchData');
    let searchValue = search.value;
    document.getElementById('parentDiv').innerHTML=``;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(Response => Response.json())
    .then(data => allSearchData(data.data));

    // load all data after clicking button 
    const allSearchData = (data) => {
        console.log(data);
        const parentDiv = document.getElementById('parentDiv');
        parentDiv.innerHTML = ``;
        // loop for deploy array
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
}

// load api by clicking item's details button 
const selectPhone = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(Response => Response.json())
    .then(data => viewProduct(data.data))
}

// load single item data and display  
const viewProduct = (data) => {
    console.log(data);
    let lunchingDate;
    if (data.releaseDate === '') {
        lunchingDate = 'Sorry, No release date found';
    } else {
        lunchingDate = data.releaseDate;
    }
    const detailsDiv = document.getElementById('detailSection');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card my-3 bg-info" style="max-width: 540px;">
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
                    <p class="card-text"><b>Sensors :</b> ${data.mainFeatures.sensors.join(', ')}</p>
                    <h5 class="card-text">Other Information</h5>
                    <p class="card-text"><b>WLAN: </b>${data.others.WLAN}</p>
                    <p class="card-text"><b>Bluetooth: </b>${data.others.Bluetooth}</p>
                    <p class="card-text"><b>GPS: </b>${data.others.GPS}</p>
                    <p class="card-text"><b>NFC: </b>${data.others.NFC}</p>
                    <p class="card-text"><b>Radio: </b>${data.others.Radio}</p>
                    <p class="card-text"><b>USB: </b>${data.others.USB}</p>

                </div>
            </div>
        </div>
    </div>
    `;
    detailsDiv.appendChild(div);
}




