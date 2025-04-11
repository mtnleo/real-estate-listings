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

async function getClickedHouse(id) {
    const url = `http://127.0.0.1:8080/properties/${id}`;
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    else {
        let property = await response.json();

        return property;
    }
}

async function loadFeaturedProperties() {
    const url = 'http://127.0.0.1:8080/featured-properties';
    let response = await fetch(url);
    

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    else {
        let featured_houses = await response.json();

        for (let i = 0; i < 4; i++) {
            changeImgSrc(i+1, featured_houses[i].thumbnail);
            changeItemName(i+1, featured_houses[i].title);
            changeDescription(i+1, featured_houses[i].description);
        }
    }
}

loadFeaturedProperties();