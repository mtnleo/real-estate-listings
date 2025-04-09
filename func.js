function changeImgSrc(imgNumber, newUrl) {
    document.getElementById("img_" + imgNumber).src = newUrl;

}

function changeItemName(itemNumber, newName) {
    document.getElementById("name_" + itemNumber).textContent = newName;
}

function changeDescription(descriptionNumber, newDescription) {
    document.getElementById("desc_" + descriptionNumber).textContent = newDescription;
}

// Insert the DB information

async function loadFeaturedHouses() {
    const url = 'http://127.0.0.1:8080/featured-properties';
    let response = await fetch(url);
    

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    else {
        let featured_houses = await response.json();

        console.log(featured_houses)
        
        for (let i = 0; i < 4; i++) {
            changeImgSrc(i+1, featured_houses[i].thumbnail);
            changeItemName(i+1, featured_houses[i].title);
            changeDescription(i+1, featured_houses[i].description);
        }
    }
}

loadFeaturedHouses();