const loadAll = (global) => {
    console.log("hello")
    const category_id = 1000
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id? category_id: global}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data))
};

const loadMusic = () => {
    console.log("hello")
    const category_id = 1001
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data))
};

const loadComedy = () => {
    console.log("hello")
    const category_id = 1003
    fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data))
};

const loadDrawing = async() => {
    try {
        const category_id = 1005
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
        const data = await response.json()
        console.log(data.data.length)

        console.log(data.data.length)
        const showError = document.getElementById("show-error")
        showError.innerHTML = ''

        const videoContainer = document.getElementById("video-container");
        videoContainer.innerHTML = '';

        if(data.data && data.data.length === 0) {
            const a = document.createElement("div")
            a.classList.add("err-message")
            a.innerHTML = `
              <img src="img/Icon.png" alt="">
              <h1> Oops!! Sorry, There is no ,<br> 
              content here</h1>
            `
            showError.appendChild(a)
        }
        else {
            console.log(data.data)
        }
    }
    catch {
        (err) => {
           console.error(err)
        }
    }
}


const displayData = (data) => {
    console.log(data); 

    const videoContainer = document.getElementById("video-container")
    videoContainer.innerHTML = ''

    const showError = document.getElementById("show-error")
    showError.innerHTML = ''


    data.forEach((data) => {
        console.log(data)
        
        const boxes = document.createElement("div")
        boxes.classList.add("card", "card-box")
        boxes.innerHTML = `
            <img class="img-box" src=${data.thumbnail} class="card-img-top " alt="...">
            <div class="card-body d-flex">
                <img src=${data.authors[0].profile_picture} class="profile-img" alt="...">
                <h5 class="ms-3 mt-1 mb-0">${data.title}</h5>
            </div>
            <div>
                <div class="profile-details">
                     <div class="verified d-flex">
                        <p>${data.authors[0].profile_name}</P>
                        <p>${data.authors[0].verified ? '<i class="ms-3 fa-solid fa-circle-check"></i>' : ''}</p>
                    </div>
                    <p>${data.others.views}</p>
                </div>
            </div>
        `
        videoContainer.appendChild(boxes)
    });
};

loadAll("1000")