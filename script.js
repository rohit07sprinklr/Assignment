// Using fetch API to fetch data from JSON file
fetch("./imgfile.json")
.then(response => {
return response.json();
})
.then(data => {
    // Work with JSON data here
    startRendering(data);
})

// used to truncate long sentences 
function truncateMiddle(word) {
    // Arbitary value chosen accoring to width of division
    const tooLongChars = 35; 
    if (word.length < tooLongChars) {
        return word;
    }
    const ellipsis = '...';
    const charsOnEitherSide = Math.floor(tooLongChars / 2) - ellipsis.length;
    return word.slice(0, charsOnEitherSide) + ellipsis + word.slice(-charsOnEitherSide);
} 

// markup() returns the HTML to change the innerHTML of the list items
function markup(arrayobject,objectid){
    return`
    <div class="listitem" id="${objectid}" onclick="updateimage(${objectid})">
    <p class="listitemtext"><img src="${arrayobject.previewImage}" class="logo"></img>
    ${truncateMiddle(arrayobject.title)}
    </p></div>
    `
}

// textboxmarkup() changes the innerHTML of the label box 
function textboxmarkup(){
    const textbox = document.querySelector(".textbox");
    textbox.innerHTML= `
    ${dataArray[currentID].title}
    `
}

// Renderimage() renders the image of the current active class
function Renderimage(){
    const imagedisplay = document.querySelector(".imagedisplay");
    imagedisplay.innerHTML = `
    <img src="${dataArray[currentID].previewImage}"></img>
    `
}

// Update the current id and rednder the image
function updateimage(objectid){
    currentID=objectid;
    Renderimage();
    textboxmarkup();
}

// inputHandler to change the list items when there is a change in label 
const inputHandler = function(event) {
    var current = document.getElementsByClassName("active");
    current[0].innerHTML =`
    <div class="listitem" id="${currentID}" onclick="updateimage(${currentID})">
    <p class="listitemtext"><img src="${dataArray[currentID].previewImage}" class="logo"></img>
    ${truncateMiddle(event.srcElement.innerText)}</p>
    </div>
    `;
}

function logKey(event) {
    if(event.code=='ArrowDown'||event.code=='ArrowUp'){
        if(event.code=='ArrowDown'&&currentID+1<dataArray.length){
            currentID+=1;
            Renderimage();
            textboxmarkup();
        }
        else if(event.code=='ArrowUp'&&currentID>0){
            currentID-=1;
            Renderimage();
            textboxmarkup();
        }
        var elements= document.getElementsByClassName("listitem");
        
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        elements[currentID].className += " active";
    }
}

// currentID is used to store the id of current active item
currentID=0;

// dataArray stores the fetched data obtained from JSON file
var dataArray=0;

// After fetch, startRendering() Starts to render script
function startRendering(data){
    dataArray = data;
    // At startup the active item is the first elemennt
    id=0;          
    // Loop through the data array and render the HTML elements 
    dataArray.forEach(element => {
        const imagelist = document.querySelector(".imagelist");
        imagelist.innerHTML= imagelist.innerHTML + ( markup(element,id));
        id++;
    });

    // The first element is the active class
    var elements= document.getElementsByClassName("listitem");
    elements[0].className += " active";

    // Renderimage() renders the image of the current active class
    Renderimage();
    // textboxmarkup() used to add title as label
    textboxmarkup();

    // Add EventListener for on click behaviour of the list
    for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
    }
    // Add EventListener for key press behaviour of the list
    document.addEventListener('keydown', logKey);

    // Add EventListener for change in label
    const textbox = document.getElementById('textboxid');
    textbox.addEventListener('input', inputHandler);
}

