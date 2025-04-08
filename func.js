function changeImgSrc(imgNumber, newUrl) {
    document.getElementById("img_" + imgNumber).src = newUrl;

}

function changeItemName(itemNumber, newName) {
    document.getElementById("name_" + itemNumber).textContent = newName;
}

function changeDescription(descriptionNumber, newDescription) {
    document.getElementById("desc_" + descriptionNumber).textContent = newDescription;
}

changeImgSrc(3, 'https://images.unsplash.com/photo-1741866987680-5e3d7f052b87?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
changeItemName(3, "Wonderful Lake House");
changeDescription(3, "Wonderful house situated in a beautiful Canadian lake.")




