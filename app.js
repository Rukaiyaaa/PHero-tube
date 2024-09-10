let fetchedData = [];

const loadCategoryData = async (category_id) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
        const data = await response.json();
        
        const videoContainer = document.getElementById("video-container");
        const showError = document.getElementById("show-error");

        videoContainer.innerHTML = '';
        showError.innerHTML = '';

        fetchedData = data.data;
        
        if (fetchedData && fetchedData.length === 0) {
            const a = document.createElement("div");
            a.classList.add("err-message");
            a.innerHTML = `
              <img src="img/Icon.png" alt="">
              <h1>Oops!! Sorry, There is no <br> content here</h1>
            `;
            showError.appendChild(a);
        } else {
            displayData(data.data);
        }
    } catch (err) {
        console.error(err);
    }
};


const displayData = (data) => {
    console.log(data);

    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = ''; 

    data.forEach((data) => {
        console.log(data);
        const boxes = document.createElement("div");
        boxes.classList.add("card", "card-box");
        boxes.innerHTML = `
            <img class="img-box" src=${data.thumbnail} class="card-img-top" alt="...">
            <div class="card-body d-flex">
                <img src=${data.authors[0].profile_picture} class="profile-img" alt="...">
                <h5 class="ms-3 mt-1 mb-0">${data.title}</h5>
            </div>
            <div>
                <div class="profile-details">
                    <div class="verified d-flex">
                        <p>${data.authors[0].profile_name}</p>
                        <p>${data.authors[0].verified ? '<i class="ms-3 fa-solid fa-circle-check"></i>' : ''}</p>
                    </div>
                    <p>${data.others.views} views</p>
                </div>
            </div>
        `;
        videoContainer.appendChild(boxes);
    });
};


const convertViewsToNumber = (viewString) => {
    if (typeof viewString !== 'string') return 0;

    const viewStringUpper = viewString.toUpperCase().trim();
    const number = parseFloat(viewStringUpper);
    
    if (viewStringUpper.includes('K')) 
        return number * 1000; 
};

const sortDataByViews = () => {

    if (fetchedData.length === 0) {
        console.log("No data to sort.");
        return;
    }
    
    const sortedData = [...fetchedData].sort((a, b) => {
        const viewsA = convertViewsToNumber(a.others?.views);
        const viewsB = convertViewsToNumber(b.others?.views);
        
        console.log("Comparing:", viewsA, "and", viewsB);
        
        return viewsB - viewsA;
    });
    
    displayData(sortedData);
};



loadCategoryData("1000")

