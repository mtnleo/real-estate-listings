function changeImgSrc(imgNumber, newUrl) {
    document.getElementById("img_" + imgNumber).src = newUrl;

}

function changeItemName(itemNumber, newName) {
    document.getElementById("name_" + itemNumber).textContent = newName;
}

function changeDescription(descriptionNumber, newDescription) {
    document.getElementById("desc_" + descriptionNumber).textContent = newDescription;
}

function changeButton(buttonNumber, newId) {
    // Add ID and OnClick()
    let button = document.getElementById("btn_" + buttonNumber);

    button.href = `item.html?id=${newId}`;
}

// Item's page

function loadPropertyInfo(propertyObject) {
    document.getElementById('item-thumbnail').src = propertyObject.thumbnail;
    document.getElementById('item-title').textContent = propertyObject.title;
    document.getElementById('item-price').textContent = propertyObject.price;
    document.getElementById('item-city').textContent = propertyObject.city;
    document.getElementById('item-state').textContent = propertyObject.state;
    document.getElementById('item-year').textContent = propertyObject.year;
    document.getElementById('item-description').textContent = propertyObject.description;
    
}

function loadPropertySeller(sellerName) {
    document.getElementById('item-seller').textContent = sellerName;
}

// Insert the DB information

async function getClickedProperty(id) {
    const url = `http://127.0.0.1:8080/properties/${id}`;
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    else {
        let property = await response.json();

        console.log('Property: ')
        console.log(property)

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
            changeButton(i+1, featured_houses[i].id)
        }
    }
}

async function loadProperty() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id);

    // Paste all the data on the DOM
    let response_p = await fetch(`http://127.0.0.1:8080/properties/${id}`);
    if(!response_p.ok) {
        console.log("There was a problem loading the property object.");
    }
    else {
        let [propertyObject] = await response_p.json();

        loadPropertyInfo(propertyObject);
    }

    // Get and paste the Seller's name
    let response_f_n = await fetch(`http://127.0.0.1:8080/firm-name/${id}`);

    if(!response_f_n.ok) {
        console.log("There was a problem loading the firm name object.");
    }
    else {
        let [firmNameObject] = await response_f_n.json();

        loadPropertySeller(firmNameObject.name);
    }
}

//// CHECK WINDOW AND CALL FUNCTION

if(window.location.href.includes('index')) {
    loadFeaturedProperties();
}

if(window.location.href.includes('item')) {
    window.addEventListener("DOMContentLoaded", () => {
        loadProperty();
    });
}
