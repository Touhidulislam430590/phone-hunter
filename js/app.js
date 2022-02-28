fetch('https://openapi.programming-hero.com/api/phones')
.then(Response => Response.json())
.then(data => loadApi(data.data));

const item = item => console.log(item);

const loadApi = (data) => {
    // const individualPhone = data.map(item);
    const parentDiv = document.getElementById('parentDiv');
    for (const item of data) {
        console.log(item);
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
            </div>
        </div>
        `;
        parentDiv.appendChild(div);
    }
}