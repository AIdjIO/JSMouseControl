document.addEventListener('DOMContentLoaded',()=>{
   
    const myCanvas = document.getElementById("mousePad");
    const myCtx = myCanvas.getContext("2d");

    //resizing canvas (minus border with times 2)
    myCanvas.height = window.innerHeight-70;
    myCanvas.width = window.innerWidth-2;

    //variable
    let painting = false;

    function startPosition(e){
        // console.log("mousedown")
        painting = true
        myCtx.beginPath();
        draw(e)
    }

    function finishPosition(e){
        // console.log("mouseup")
        myCtx.moveTo(e.clientX, e.clientY);
        painting = false
    }

    function draw(e){
        // console.log("mousemove")
        if(!painting) return;
       
        myCtx.lineWidth = 10;
        myCtx.lineCap="round";
        myCtx.strokeStyle = "yellow";
        myCtx.lineTo(e.clientX, e.clientY)
        myCtx.stroke()
    }

    //mouse event listeners
    myCanvas.addEventListener("mousedown", startPosition)
    myCanvas.addEventListener("mouseup", finishPosition)
    myCanvas.addEventListener("mousemove", draw)    
})