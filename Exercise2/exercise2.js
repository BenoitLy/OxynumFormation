var box; 
var dropzone = document.querySelector('.dropzone');
var xo;
var yo;
var dropzoneWidth = parseInt((window.getComputedStyle(dropzone ,null).getPropertyValue('width')).replace("px", "")); 
var dropzoneHeight = parseInt((window.getComputedStyle(dropzone ,null).getPropertyValue('height')).replace("px", "")); 
var dropzoneTop = parseInt((window.getComputedStyle(dropzone ,null).getPropertyValue('top')).replace("px", ""));
var dropzoneLeft = parseInt((window.getComputedStyle(dropzone ,null).getPropertyValue('left')).replace("px", ""));
var dropzoneBottom = dropzoneTop + dropzoneHeight;
var dropzoneRight = dropzoneLeft + dropzoneWidth;

dropzone.addEventListener("mousedown", mouseDownDropzone, false);
dropzone.addEventListener("mouseup", mouseUpDropzone, false);

function mouseDown(id) {
    box = document.getElementById(id);
    xo = event.offsetX;
    yo = event.offsetY;
    var color = window.getComputedStyle(box ,null).getPropertyValue('background-color'); 
    var colorReplace =  color.replace(/[rgb()]/g, "");
    var colorArray = colorReplace.split(",");
    var R = colorArray[0] - 100;
    var G = colorArray[1] - 100;
    var B = colorArray[2] - 100;
    var colorNew = "rgb(" + R + ", " + G + ", " + B + ")";
    box.style.borderColor = colorNew; 
    box.style.opacity = "0.7";
    foreFront();
    dropzone.addEventListener('mousemove', mouseMove, false);
    dropzone.addEventListener("mouseup", mouseUp, false);
}

function mouseMove(event) {
    //top left corner
    var posX = event.pageX - xo;
    var posY = event.pageY - yo;

    var width = parseInt((window.getComputedStyle(box ,null).getPropertyValue('width')).replace("px", ""));
    var height = parseInt((window.getComputedStyle(box ,null).getPropertyValue('height')).replace("px", ""));

    //border position
    var top = posY;
    var right = posX + width;
    var bottom = posY + height;
    var left = posX;

    if((left >= dropzoneLeft) && (right <= dropzoneRight)) {
        box.style.left = posX + "px";
    }    
    else if(left < dropzoneLeft) {
        box.style.left = dropzoneLeft + "px" ;
    }
    else if(right > dropzoneRight) {
        box.style.left = dropzoneRight - width + "px";
    }

    if((top >= dropzoneTop) && (bottom <= dropzoneBottom)) {
        box.style.top = posY + "px";
    }
    else if(top < dropzoneTop) {
        box.style.top = dropzoneTop + "px" ;
    }
    else if(bottom > dropzoneBottom) {
        box.style.top = dropzoneBottom - height + "px";
    }
}

function mouseUp() {
    box.style.opacity = "1";
    box.style.borderColor = "transparent"; 
    dropzone.removeEventListener('mousemove', mouseMove, false);
    dropzone.removeEventListener("mouseup", mouseUp, false);
}

function foreFront() {
    var elements = document.querySelectorAll('.element');
    elements.forEach(element => {
        element.style.zIndex = "0";
    });
    box.style.zIndex = "1";
}

function mouseDownDropzone() {
    dropzone.style.color = "#BBB";
}

function mouseUpDropzone() {
    dropzone.style.color = "transparent";
}


