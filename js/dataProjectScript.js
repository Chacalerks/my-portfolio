
//construction of the carousel
const carousel = (index, post) => {
    const carrouselElement = document.createElement('div');
    carrouselElement.setAttribute('id', `carouselExampleIndicators${index}`);
    carrouselElement.className = `carousel slide`;
    carrouselElement.setAttribute('data-bs-ride', 'carousel');

    carrouselElement.appendChild(carouselIndicators(index, post.Images.length));
    carrouselElement.appendChild(carouselInner(index, post));
    carrouselElement.appendChild(carouselControls(index));

    return carrouselElement;
}


//return the buttons to the carousel for the i elements
const carouselIndicators = (index, length) => {
    let buttons = '';
    let carouselIndicators = document.createElement('div');
    carouselIndicators.className = 'carousel-indicators';
    for (let i = 0; i < length; i++) {
        // <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
        //aria-current="true" aria-label="Slide 1"></button>
        buttons += `<button type="button" data-bs-target="#carouselExampleIndicators${index}" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" aria-current="${i === 0 ? 'true' : 'false'}" aria-label="Slide ${i + 1}"></button>`;
    }
    carouselIndicators.innerHTML = buttons;

    return carouselIndicators;
}

//return the carousel inner
const carouselInner = (index, post) => {
    let carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';
    let carouselItems = '';
    for (let i = 0; i < post.Images.length; i++) {
        //<div class="carousel-item active">
        //<img src="img/projects/ferks1.png" class="d-block w-100" alt="..." />
        //</div>
        carouselItems += `<div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="img/projects/${post.Images[i]}" class="d-block w-100" alt="..." />
      </div>`;
    }
    carouselInner.innerHTML = carouselItems;
    return carouselInner;
}

//return the carousel controls
const carouselControls = (index) => {
    let carouselControls = document.createElement('div');
    carouselControls.className = 'carousel-controls';
    carouselControls.innerHTML = `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${index}"
    data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>`;
    carouselControls.innerHTML += `<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${index}"
    data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>`;
    return carouselControls;
}

//return the data of the post
const dataPost = (post) => {
    let dataPost = document.createElement('div');
    dataPost.className = 'px-3 col-7 d-flex flex-column justify-content-between';

    let dataPostContect = document.createElement('div');
    dataPostContect.innerHTML = `<h5 class="fs-2 color4">${post.Title}</h5>
    <p class="color5" >${post.Description}</p>`;

    let dataPostTagsElement = dataPostTags(post);

    dataPost.appendChild(dataPostContect);
    dataPost.appendChild(dataPostTagsElement);
    return dataPost;
}

//return the data post tags
const dataPostTags = (post) => {
    const dataPostTags = document.createElement('div');
    for (let i = 0; i < post.Tags.length; i++) {
        dataPostTags.innerHTML += `<span class="badge badge-pill bg-color2Trans color2">${post.Tags[i]}</span> `;
    }
    return dataPostTags;
}


const postContainer = document.querySelector('.post-container');

const postMethods = (jsonData) => {
    jsonData.map((post, index) => {

        const postElement = document.createElement('div');
        const carouselElement = carousel(index, post);
        const postData = dataPost(post);

        postElement.className = 'p-3 mb-3 bg-color6 text-primary d-flex rounded';
        postElement.appendChild(carouselElement);
        postElement.appendChild(postData);

        postContainer.appendChild(postElement);


    })
}


fetch('../data/projects.json')
    .then(response => {
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(jsonData => {
        // If your JSON has the Description as an array and you want to join it

        postMethods(jsonData);
    })
