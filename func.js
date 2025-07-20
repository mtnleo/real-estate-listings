/* ########################################### */
/* ########################################### */
/* ######### LOAD PROPERTIES IN HTML ######### */
/* ########################################### */
/* ########################################### */

/* *************** LOAD PROPERTIES IN INDEX *************** */

function changePropertyImgSrcStyle(imgNumber, newUrl, newId) {
    document.getElementById("p_img_" + imgNumber).src = newUrl;
    document.getElementById("p_img_" + imgNumber).style = `view-transition-name: ${newId}`;
}

function changePropertyTitle(itemNumber, newName) {
    document.getElementById("p_title_" + itemNumber).textContent = newName;
}

function changePropertyDescription(descriptionNumber, newDescription) {
    document.getElementById("desc_" + descriptionNumber).textContent = newDescription;
}

function changePropertyCity(cityNumber, newCity) {
    document.getElementById("p_city_" + cityNumber).textContent = newCity + ',';
}

function changePropertyState(stateNumber, newState) {
    document.getElementById("p_state_" + stateNumber).textContent = newState;
}

function changePropertyPrice(priceNumber, newPrice) {
    document.getElementById("p_price_" + priceNumber).textContent = formatPrice(newPrice);
}

function changePropertyYear(yearNumber, newYear) {
    document.getElementById("p_year_" + yearNumber).textContent = newYear;
}

function changePropertyButton(buttonNumber, newId) {
    // Add ID and OnClick()
    let button = document.getElementById("btn_" + buttonNumber);

    button.href = `item.html?id=${newId}`;
}

/* *************** LOAD PROPERTY IN ITEM *************** */

function loadPropertyInfo(propertyObject, id) {
    const thumbnailElement = document.getElementById('item-thumbnail')
    thumbnailElement.src = propertyObject.thumbnail;
    thumbnailElement.style = `view-transition-name: ${id}`;
    document.getElementById('item-title').textContent = propertyObject.title;
    document.getElementById('item-price').textContent = formatPrice(propertyObject.price);
    document.getElementById('item-city').textContent = propertyObject.city + ',';
    document.getElementById('item-state').textContent = propertyObject.state;
    document.getElementById('item-year').textContent = 'Built in ' + propertyObject.year;
    document.getElementById('item-description').textContent = propertyObject.description;
    document.getElementById('item-sqft').textContent = propertyObject.sqft + ' sqft.';
    document.getElementById('item-bedrooms').textContent = propertyObject.bedrooms + ' bedrooms';
    document.getElementById('item-bathrooms').textContent = propertyObject.bathrooms + ' bathrooms';
    
}

function loadFirm(firmObject) {
    document.getElementById('firm-thumbnail').src = firmObject.thumbnail;
    document.getElementById('firm-name').textContent = firmObject.name;
    document.getElementById('firm-city').textContent = firmObject.city + ', ';
    document.getElementById('firm-state').textContent = firmObject.state;
    document.getElementById('firm-email').textContent = firmObject.email;
    document.getElementById('firm-web').textContent = firmObject.website;

}


// Formatting
function formatPrice(price) {
    price_string = price.toString();
    let number = '$';
    if (price < 1000) {
        number += price_string;
    } else if (price < 10000) {
        number += price_string[0] + ',' + price_string.slice(1, 4)
    } else if (price < 100000) {
        number += price_string.slice(0, 2) + ',' + price_string.slice(3, 5)
    } else if (price < 1000000) {
        number += price_string.slice(0, 3) + ',' + price_string.slice(3, 6)
    } else if (price < 10000000) {
        number += price_string[0] + ',' + price_string.slice(1, 4) + ',' + price_string.slice(4, 7)
    } else if (price < 100000000) {
        number += price_string.slice(0, 2) + ',' + price_string.slice(2, 5) + ',' + price_string.slice(5, 8)
    } else {
        number += price_string.slice(0, 3) + ',' + price_string.slice(3, 6) + ',' + price_string.slice(6, 9)
    }

    return number;
}

// Insert the DB information

async function getClickedProperty(id) {
    // const url = `https://real-estate-listings-production-0335.up.railway.app/${id}`;
    const url = `http://127.0.0.1:8080/${id}`;
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

/* *************** LOAD FEATURED IN INDEX *************** */


async function loadFeaturedProperties() {
    // const url = 'https://real-estate-listings-production-0335.up.railway.app/featured-properties';
    const url = 'http://127.0.0.1:8080/featured-properties';
    let response = await fetch(url);
    

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    else {
        let featured_houses = await response.json();

        for (let i = 0; i < 4; i++) {
            changePropertyImgSrcStyle(i+1, featured_houses[i].thumbnail, featured_houses[i].id);
            changePropertyTitle(i+1, featured_houses[i].title);
            changePropertyButton(i+1, featured_houses[i].id)
            changePropertyCity(i+1, featured_houses[i].city);
            changePropertyState(i+1, featured_houses[i].state);
            changePropertyPrice(i+1, featured_houses[i].price);
            changePropertyYear(i+1, featured_houses[i].year);
        }
    }
}

/* *************** LOAD PROPERTY IN ITEM *************** */

async function loadProperty() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id);

    // Paste all the data on the DOM
    // let response_p = await fetch(`https://real-estate-listings-production-0335.up.railway.app/properties/${id}`);
    let response_p = await fetch(`http://127.0.0.1:8080/properties/${id}`);

    if(!response_p.ok) {
        console.log("There was a problem loading the property object.");
    }
    else {
        let [propertyObject] = await response_p.json();

        loadPropertyInfo(propertyObject, id);
        loadMap(propertyObject.city, propertyObject.state);
    }

    // Get and paste the Seller's object
    // let response_f = await fetch(`https://real-estate-listings-production-0335.up.railway.app/firms-p/${id}`);
    let response_f = await fetch(`http://127.0.0.1:8080/firms-p/${id}`);

    if(!response_f.ok) {
        console.log("There was a problem loading the firm object.");
    }
    else {
        let firmObject = await response_f.json();

        console.log(firmObject)
        loadFirm(firmObject[0]);
    }

}
async function loadMap(city, state) {
    const geoSearchProvider = new GeoSearch.OpenStreetMapProvider();

    if(window.location.href.includes('item')) {
    const [results] = await geoSearchProvider.search({ query: `${city}, ${state}` });
    console.log(results.raw.lat, results.raw.lon);

    let map = L.map('map').setView([results.raw.lat, results.raw.lon], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    }
}

/* *************** LOAD HTML DYNAMICALLY *************** */

async function loadListingHtml(listingObject) {
    /////////////// CREATING NODES ///////////////

    // MAIN DIV
    const mainDiv = document.createElement("div");
    const mainA = document.createElement("a");

        // IMAGE
        const listingImg = document.createElement("img");

        // BOTTOM DIV
        const listingBottomDiv = document.createElement("div");

            // PRICE & YEAR
            const listingPriceYearDiv = document.createElement("div");
                const listingPriceTitle = document.createElement("h1");
                const listingYear = document.createElement("p");

            // TITLE
            const listingTitle = document.createElement("h1");

            // SPECS & LOCATION
            const listingSpecsLocationDiv = document.createElement("div");
                // Specs
                const listingSpecsDiv = document.createElement("div");
                    const specSqft = document.createElement("p");
                    const specBds = document.createElement("p");
                    const specBa = document.createElement("p");
            
                // Location
                const listingLocationDiv =  document.createElement("div");
                    const locationIconDiv = document.createElement("div");
                        const locationIconI = document.createElement("i");
                    const locationCity = document.createElement("p");
                    const locationState = document.createElement("p");

    /////////////// ASSIGNING CONNECTION ///////////////

    document.getElementById("listings-container").appendChild(mainDiv);

    mainDiv.appendChild(mainA);
    mainA.appendChild(listingImg);
    mainA.appendChild(listingBottomDiv);

        listingBottomDiv.appendChild(listingPriceYearDiv);
        listingBottomDiv.appendChild(listingTitle);
        listingBottomDiv.appendChild(listingSpecsLocationDiv);

            listingPriceYearDiv.appendChild(listingPriceTitle);
            listingPriceYearDiv.appendChild(listingYear);

            listingSpecsLocationDiv.appendChild(listingSpecsDiv);
            listingSpecsLocationDiv.appendChild(listingLocationDiv);

                listingSpecsDiv.appendChild(specSqft);
                listingSpecsDiv.appendChild(specBds);
                listingSpecsDiv.appendChild(specBa);

                listingLocationDiv.appendChild(locationIconDiv);
                    locationIconDiv.appendChild(locationIconI);
                listingLocationDiv.appendChild(locationCity);
                listingLocationDiv.appendChild(locationState);

    /////////////// ASSIGNING CLASSES ///////////////

    mainDiv.classList.add("bg-white");
    mainDiv.classList.add("max-w-sm");
    mainDiv.classList.add("rounded-2xl");
    mainDiv.classList.add("overflow-hidden");
    mainDiv.classList.add("drop-shadow-lg");
    mainDiv.classList.add("drop-shadow-gray-50/20");

    mainDiv.style = 'justify-self: center;'

    mainA.href = `item.html?id=${listingObject.id}`;

    listingImg.classList.add("object-cover")
    listingImg.classList.add("aspect-video")
    listingImg.classList.add("transition")
    listingImg.classList.add("ease-in-out")
    listingImg.classList.add("duration:200")
    listingImg.classList.add("hover:scale-105")
    listingImg.classList.add("overflow-hidden")

    listingImg.style = `view-transition-name: ${listingObject.id}`

    listingBottomDiv.classList.add("p-4");

    listingPriceYearDiv.classList.add("flex");
    listingPriceYearDiv.classList.add("flex-row");
    listingPriceYearDiv.classList.add("space-y-0");
    listingPriceYearDiv.classList.add("items-center");
    listingPriceYearDiv.classList.add("justify-between");

    listingTitle.classList.add("text-xl");
    listingTitle.classList.add("font-medium");
    listingTitle.classList.add("text-gray-800");

    listingSpecsLocationDiv.classList.add("flex");
    listingSpecsLocationDiv.classList.add("flex-col");
    listingSpecsLocationDiv.classList.add("space-y-2");
    listingSpecsLocationDiv.classList.add("lg:space-y-0");
    listingSpecsLocationDiv.classList.add("lg:flex-row");
    listingSpecsLocationDiv.classList.add("lg:justify-between");
    listingSpecsLocationDiv.classList.add("lg:items-center");
    listingSpecsLocationDiv.classList.add("pt-2");

    listingPriceTitle.classList.add("text-2xl");
    listingPriceTitle.classList.add("font-bold");
    listingPriceTitle.classList.add("pb-1");

    listingYear.classList.add("bg-gray-200");
    listingYear.classList.add("rounded-full");
    listingYear.classList.add("p-1");
    listingYear.classList.add("px-2");
    listingYear.classList.add("text-gray-600");

    listingSpecsDiv.classList.add("flex");
    listingSpecsDiv.classList.add("items-center");
    listingSpecsDiv.classList.add("justify-start");
    listingSpecsDiv.classList.add("space-x-2");
    listingSpecsDiv.classList.add("pt-2");

    listingLocationDiv.classList.add("flex");
    listingLocationDiv.classList.add("items-center");
    listingLocationDiv.classList.add("justify-start");
    listingLocationDiv.classList.add("space-x-1");
    listingLocationDiv.classList.add("pt-2");

    specSqft.classList.add("text-gray-600");
    specBds.classList.add("text-gray-600");
    specBa.classList.add("text-gray-600");

    locationIconDiv.classList.add("pin-icon-container");
    locationIconI.setAttribute('data-lucide', 'map-pin')

    locationCity.classList.add("text-gray-600");
    locationState.classList.add("text-gray-600");

    /////////////// ASSIGNING DATA ///////////////

    listingImg.src = listingObject.thumbnail;

    
    listingPriceTitle.appendChild(document.createTextNode(formatPrice(listingObject.price)));
    
    listingYear.appendChild(document.createTextNode(listingObject.year));
    
    listingTitle.appendChild(document.createTextNode(listingObject.title));
    
    specSqft.appendChild(document.createTextNode(listingObject.sqft + ' sqft |'));
    specBds.appendChild(document.createTextNode(listingObject.bedrooms + ' bds |'));
    specBa.appendChild(document.createTextNode(listingObject.bathrooms + ' ba'));
    
    locationCity.appendChild(document.createTextNode(listingObject.city + ','));
    locationState.appendChild(document.createTextNode(listingObject.state));


}

async function loadAllListings() {
    // const url = 'https://real-estate-listings-production-0335.up.railway.app/properties/'
    const url = 'http://127.0.0.1:8080/properties/'
    let response = await fetch(url);
    if(!response.ok) {
        console.log("There was a problem loading the property object.");
    }
    else {
        let propertyObject = await response.json();

        propertyObject.forEach(element => {
            loadListingHtml(element);
        });
    }

}

function showToast(toastId) {
    const toast = document.getElementById(toastId);
  
    // Show: make visible and animate in
    toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
    toast.classList.add("opacity-100", "translate-y-0");
  
    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
    }, 3000);
  }

/* ################################################# */
/* ################################################# */
/* ######### CHECK WINDOW AND RUN FUNCTION ######### */
/* ################################################# */
/* ################################################# */

if(window.location.href.includes('index')) {
    loadFeaturedProperties();
}

if(window.location.href.includes('listing')) {
    loadAllListings();
}

if(window.location.href.includes('item')) {
    window.addEventListener("DOMContentLoaded", () => {
        // Load property info
        loadProperty();
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle('open');
        menu.classList.toggle('hidden');
    })


})

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('subscribe-form').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const email = document.getElementById('email').value;
    
        // const response = await fetch('https://real-estate-listings-production-0335.up.railway.app/subscribe', {
        const response = await fetch('http://127.0.0.1:8080/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
    
        if (response.ok) {
            showToast("subscription-toast");
          } else {
            showToast("error-toast");
          }

        const data = await response.text();
        console.log("Front response: ", data);
      });
});

if(window.location.href.includes('item')) {
    window.addEventListener("DOMContentLoaded", () => {

        const chevron = document.getElementById('more-firm')
        chevron.addEventListener('click', () => {
            const moreInfo = document.getElementById('more-info');
            moreInfo.classList.toggle('hidden');
            if(moreInfo.classList.contains('hidden')) {
                chevron.style.rotate = '0deg';
            } else {
                chevron.style.rotate = '180deg';
            }
        });
    });
}