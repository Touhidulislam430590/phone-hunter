fetch('https://openapi.programming-hero.com/api/phones')
.then(Response => Response.json())
.then(data => console.log(data));