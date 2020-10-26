document.addEventListener('DOMContentLoaded',()=>{
    
    const lineColor = document.getElementById("lineColor");
    const lineOpacity = document.getElementById("rangeOpacity");
    const lineThickness = document.getElementById("rangeThickness");
    const btnClearCanvas = document.getElementById("btnClearCanvas")
    let myCanvas = document.getElementById("scratchPad");
    let myCtx = myCanvas.getContext("2d");

    resizeCanvas();
    //resizing canvas (minus border with times 2)
    function resizeCanvas(){
        // Make our in-memory canvas
    var backUpCanvas = document.createElement('canvas');
    var backUpCtx = backUpCanvas.getContext('2d');

    backUpCanvas.width = myCanvas.width;
    backUpCanvas.height = myCanvas.height;
    backUpCtx.drawImage(myCanvas, 0, 0);
    
    myCanvas.height = window.innerHeight-2;
    myCanvas.width = window.innerWidth-2;

    myCtx.drawImage(backUpCanvas, 0, 0);
    };

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
        if (!painting) return;
        var mousePos = getMousePosition(myCanvas, e)
        // myCtx.lineWidth = 10;
        myCtx.lineCap="round";
        myCtx.lineTo(mousePos.x, mousePos.y)
        myCtx.stroke()
    }

    function color(e){
        let lineColor = this.value
        console.log(lineColor)
        myCtx.strokeStyle = lineColor
        myCtx.strokefill = lineColor
        }
    
    function opacity(e){
        let lineOpacity = this.value
        console.log(lineOpacity)
        myCtx.globalAlpha = lineOpacity
    }

    function thickness(e){
        let lineThickness = this.value
        myCtx.lineWidth = lineThickness
    }

    function clearCanvas(canvas){
        console.log("click")
        boundingBoxCoord = myCanvas.getBoundingClientRect();
        console.log(boundingBoxCoord.left,boundingBoxCoord.top,myCanvas.width, myCanvas.height)
        myCtx.clearRect(boundingBoxCoord.left,boundingBoxCoord.top,myCanvas.width, myCanvas.height)
        myCtx.clearRect(20, 20, 100, 50);
    }


    function getMousePosition(canvas,e){
        var canvasBoundingBox = canvas.getBoundingClientRect();
        return {
            x: e.clientX - canvasBoundingBox.left,
            y: e.clientY - canvasBoundingBox.top
        }
    }

    //mouse event listeners
    myCanvas.addEventListener("mousedown", startPosition)
    myCanvas.addEventListener("mouseup", finishPosition)
    myCanvas.addEventListener("mousemove", draw)
    lineColor.addEventListener("input",color) 
    lineOpacity.addEventListener("input",opacity) 
    lineThickness.addEventListener("input", thickness)
    btnClearCanvas.addEventListener("click", clearCanvas)

    //resize canvas on window resize
    window.addEventListener("resize", resizeCanvas);
})