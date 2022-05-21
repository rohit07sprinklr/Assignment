// Using fetch API to fetch json file
fetch("./imgfile.json")
.then(response => {
return response.json();
})
.then(data => {
    // Work with JSON data here
    startRendering(data);
})

function truncateMiddle(word) {
    const tooLongChars = 30; // arbitrary

    if (word.length < tooLongChars) {
        return word;
    }

    const ellipsis = '...';
    const charsOnEitherSide = Math.floor(tooLongChars / 2) - ellipsis.length;

    return word.slice(0, charsOnEitherSide) + ellipsis + word.slice(-charsOnEitherSide);
} 

function markup(arrayobject,objectid){
    return`
    <div class="listitem" id="${objectid}" onclick="updateimage(${objectid})">
    <p class="listitemtext"><img src="${arrayobject.previewImage}" class="logo"></img>${truncateMiddle(arrayobject.title)}</p>
    </div>
    `
}
function textboxmarkup(){
    const textbox = document.querySelector(".textbox");
    textbox.innerHTML= `
    ${dataArray[currentID].title}
    `
}

function Renderimage(){
    const imagedisplay = document.querySelector(".imagedisplay");
    imagedisplay.innerHTML = `<img src="${dataArray[currentID].previewImage}"></img>`
}

function updateimage(objectid){
    console.log(objectid);
    currentID=objectid;
    Renderimage();
    textboxmarkup()
}
const inputHandler = function(event) {
    console.log(event.srcElement.innerText);
    // dataArray[currentID].title = event.srcElement.innerHTML;
    var current = document.getElementsByClassName("active");
    // var curele = document.querySelector(".active");
    console.log(current[0].innerHTML);
    // curele.textContent= event.srcElement.innerText;
    current[0].innerHTML =`
    <div class="listitem" id="${currentID}" onclick="updateimage(${currentID})">
    <p class="listitemtext"><img src="${dataArray[currentID].previewImage}" class="logo"></img>${truncateMiddle(event.srcElement.innerText)}</p>
    </div>
    `;

}

function logKey(event) {
    if(event.code=='ArrowDown'&&currentID+1<dataArray.length){
        currentID+=1;
        Renderimage();
        textboxmarkup()
    }
    else if(event.code=='ArrowUp'&&currentID>0){
        currentID-=1;
        Renderimage();
        textboxmarkup()
    }
    var elements= document.getElementsByClassName("listitem");
    
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    elements[currentID].className += " active";
}
currentID=0;
var dataArray=0;

function startRendering(data){
    dataArray = data;
    
    id=0;
    dataArray.forEach(element => {
        const imagelist = document.querySelector(".imagelist");
        imagelist.innerHTML= imagelist.innerHTML + ( markup(element,id));
        id++;
    });
    
    var elements= document.getElementsByClassName("listitem");
    elements[0].className += " active";
    Renderimage();
    textboxmarkup()
    for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
    }

    const textbox = document.getElementById('textboxid');
    textbox.addEventListener('input', inputHandler);
    document.addEventListener('keydown', logKey);
}

