// Using fetch API to fetch json file
fetch("./imgfile.json")
.then(response => {
return response.json();
})
.then(data => {
    // Work with JSON data here
    startRendering(data);
})

function markup(arrayobject,objectid){
    return`
    <div class="listitem" id="${objectid}">
        <p onclick="updateimage(${objectid})"><img src="${arrayobject.previewImage}" class="logo"></img> ${arrayobject.title}</p>
    </div>
    `
}

function Renderimage(){
    const imagedisplay = document.querySelector(".imagedisplay");
    imagedisplay.innerHTML = `<img src="${dataArray[currentID].previewImage}"></img>`
}

function updateimage(objectid){
    console.log(objectid);
    // const imagelist = document.querySelectorAll(".listitem");
    // imagelist.forEach(element =>{
    //     element.style.backgroundColor = "white";
    // });
    currentID=objectid;
    // curimage = document.getElementById(currentID);
    // curimage.style.backgroundColor = "blue";
    Renderimage();
}

function logKey(event) {
    if(event.code=='ArrowDown'&&currentID+1<dataArray.length){
        // let curimage = document.getElementById(currentID);
        // curimage.style.backgroundColor = "white";
        currentID+=1;
        Renderimage();
    }
    else if(event.code=='ArrowUp'&&currentID>0){
        // let curimage = document.getElementById(currentID);
        // curimage.style.backgroundColor = "white";
        currentID-=1;
        Renderimage();
    }
    // curimage = document.getElementById(currentID);
    // curimage.style.backgroundColor = "blue";
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
    for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
    }

    document.addEventListener('keydown', logKey);
}


