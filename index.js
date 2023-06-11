let myData = [
    {
        type: "image",
        url: "https://avatars.githubusercontent.com/u/112634386?v=4"
    },
    {
        type: "image",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5f3xgzW_K_3hXojCy4SjGW_fqtOJAwudZGA&usqp=CAU"
    },
    {
        type: "image",
        url: "https://cdn-icons-png.flaticon.com/512/732/732190.png"
    },
    {
        type: "image",
        url: "https://cdn-icons-png.flaticon.com/512/1532/1532556.png"
    },
    {
        type: "text",
        textData: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, quam itaque rerum labore eum laborum nobis dignissimos pariatur officiis quae earum amet mollitia? Nihil corporis illo, deleniti itaque temporibus ex accusantium ad."
    },
    {
        type: "text",
        textData: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem velit ut impedit amet ea, alias perspiciatis neque laboriosam asperiores odio accusamus inventore, eius blanditiis optio!"
    }
]


let mainDragDropBox = document.getElementsByClassName("mainDragDropBox");
let insideDraggableDiv = document.getElementsByClassName("insideDraggableDiv");
let maininsideContainer = document.getElementById("maininsideContainer");
let addImageButton = document.getElementById("addImageButton");
let imageInput = document.getElementById("imageInput");
let addTextButton = document.getElementById("addTextButton");
let textInput = document.getElementById("textInput");
let addNewOne = 0;
let defaultHeight = 400;
let defaultRows = 2;
let defaultLength = myData.length;
let reset = document.getElementById("reset");


addImageButton.addEventListener("click", () => {
    if (imageInput.files.length === 0) {
        return;
    }
   
    if (defaultLength % 3 === 0) {
        defaultHeight += 200;
        defaultRows += 1;
        increseHeightOfBox();
    }
    defaultLength++;
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", `item${defaultLength}`);
    newDiv.setAttribute("class", "insideDraggableDiv");
    newDiv.setAttribute("draggable", true);
    let img = imageInput.files[0];
    let src = URL.createObjectURL(img);
    newDiv.style.backgroundImage = `url(${src})`;
    newDiv.style.backgroundPosition = "center";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.backgroundSize = "contain";
    maininsideContainer.append(newDiv);

    let obj = {
        type : "image",
        url : src
    }
    myData.push({...obj});

    imageInput.value = "";
    newDiv.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        setTimeout(() => {
            e.target.classList.add("hide")
        }, 0)
    })
})

addTextButton.addEventListener("click", () => {
    if (textInput.value === "") {
        return
    }
    if (defaultLength % 3 === 0) {
        defaultHeight += 200;
        defaultRows += 1;
        increseHeightOfBox();
    }
    defaultLength++;
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", `item${defaultLength}`);
    newDiv.setAttribute("class", "insideDraggableDiv");
    newDiv.setAttribute("draggable", true);
    newDiv.innerText = textInput.value;
    maininsideContainer.append(newDiv);

    
    let obj = {
        type : "text",
        textData : textInput.value
    }
    myData.push({...obj});

    textInput.value = "";
    newDiv.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        setTimeout(() => {
            e.target.classList.add("hide")
        }, 0)
    })
})

function increseHeightOfBox() {
    for (let el of mainDragDropBox) {
        el.style.height = `${defaultHeight}px`;
        el.style.gridTemplateRows = `repeat(${defaultRows},1fr)`;
    }
}

function appendAllData() {
    myData.forEach((el, i) => {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", `item${i}`);
        newDiv.setAttribute("class", "insideDraggableDiv");
        newDiv.setAttribute("draggable", true);
        if (el.type === "text") {
            newDiv.innerText = el.textData;
        }
        else if (el.type === "image") {
            newDiv.style.backgroundImage = `url(${el.url})`;
            newDiv.style.backgroundPosition = "center";
            newDiv.style.backgroundRepeat = "no-repeat";
            newDiv.style.backgroundSize = "contain";
        }
        maininsideContainer.append(newDiv);
    })

    insideDraggableDiv = document.getElementsByClassName("insideDraggableDiv");

    for (let dragdiv of insideDraggableDiv) {
        dragdiv.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => {
                e.target.classList.add("hide")
            }, 0)
        })
        dragdiv.addEventListener("drag", () => {
        })
        dragdiv.addEventListener("dragend", () => {
        })
    }
}


for (let dragdropbox of mainDragDropBox) {
    dragdropbox.addEventListener("dragenter", (e) => {
        e.preventDefault();
        if (e.target.classList.value === "insideDraggableDiv") {
            e.target.parentElement.classList.add("drag_over_box");
        } else {
            e.target.classList.add("drag_over_box");
        }
    })
    dragdropbox.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.target.classList.value === "insideDraggableDiv") {
            e.target.parentElement.classList.add("drag_over_box");
        } else {
            e.target.classList.add("drag_over_box");
        }
    })
    dragdropbox.addEventListener("dragleave", (e) => {
        if (e.target.classList.value === "insideDraggableDiv") {
            e.target.parentElement.classList.remove("drag_over_box");
        } else {
            e.target.classList.remove("drag_over_box");
        }
    })
    dragdropbox.addEventListener("drop", (e) => {
        const dragDivId = e.dataTransfer.getData("text/plain");
        const draggable = document.getElementById(dragDivId);
        if (e.target.classList.value === "insideDraggableDiv") {
            e.target.parentElement.append(draggable);
            e.target.parentElement.classList.remove("drag_over_box");
        } else {
            e.target.append(draggable);
            e.target.classList.remove("drag_over_box");
        }
        draggable.classList.remove("hide");
    })
}

reset.onclick = () => {
    for (let el of mainDragDropBox) {
        el.innerHTML = null;
    }
    appendAllData();
}

window.onload = () => {
    appendAllData();
}
