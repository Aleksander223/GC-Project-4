let p1_points = []
let p2_points = []

let WIDTH = document.documentElement.clientWidth
let HEIGHT = document.documentElement.clientHeight

let C_WIDTH = 3 * WIDTH/4
let C_HEIGHT = HEIGHT

let X_MIDDLE = C_WIDTH / 2
let Y_MIDDLE = C_HEIGHT / 2

let selectShape1 = false
let selectShape2 = false

let shapeInput1
let shapeInput2

/// inainte de orice scalare astea-s 1
var Factor = 1

/// trebuie scalate si astea la scala curenta, cele reale
function mouseClicked(e) {
    if (e.pageX < 0 || e.pageX > C_WIDTH || e.pageY < 0 || e.pageY > C_HEIGHT) {
        return
    }

    const point = {
        x: e.pageX,
        y: e.pageY,
        realX: (e.pageX - X_MIDDLE)/Factor,
        realY: (Y_MIDDLE - e.pageY)/Factor
    }

    // console.log("CoordX")
    // console.log(point.realX)

    if (selectShape1)
        p1_points = p1_points.concat(point)
    else if (selectShape2)
        p2_points = p2_points.concat(point)
}

function startShape1() {
    selectShape1 = true
    selectShape2 = false
}

function startShape2() {
    selectShape1 = false
    selectShape2 = true
}


function clearShape1() {
    p1_points = []
    selectShape1 = false
    selectShape2 = false
    document.querySelector('input[name="single-choice"]:checked').checked = false;
}

function clearShape2() {
    p2_points = []
    selectShape1 = false
    selectShape2 = false
    document.querySelector('input[name="single-choice"]:checked').checked = false;
}

function coordinateInput1() {
    shapeInput1 = this.value()
}


function addPoint() {
    shapeInput1 = shapeInput1.split(",")
    let x = parseFloat(shapeInput1[0])
    let y = parseFloat(shapeInput1[1])
    console.log(x)
	/// aici trebuie x * xFactor pt ca viitoarele pct introduse trebuie scalate la axele actuale
    let screenX = X_MIDDLE + x*Factor
    let screenY = Y_MIDDLE - y*Factor

    if (screenX > C_WIDTH || screenY > C_HEIGHT || screenX < 0 || screenY < 0) {
        let xFactor, yFactor
        if(selectShape1 == true){
			xFactor = abs(X_MIDDLE/x)
			yFactor = abs(Y_MIDDLE/y)
            Factor = min(xFactor, yFactor)

            let newArray = []

            screenX = X_MIDDLE + x * Factor
            screenY = Y_MIDDLE - y * Factor

            for (let i = 0; i < p1_points.length; i++) {
                const point = {
                    x: X_MIDDLE+ p1_points[i].realX * Factor,
                    y: Y_MIDDLE - p1_points[i].realY * Factor,
                    realX: p1_points[i].realX,
                    realY: p1_points[i].realY
                }

                newArray = newArray.concat(point)
            }

            p1_points = newArray
        } else 
        if(selectShape2 == true){
            xFactor = abs(X_MIDDLE/x)
			yFactor = abs(Y_MIDDLE/y)
            Factor = min(xFactor, yFactor)

            let newArray = []

            screenX = X_MIDDLE + x * Factor
            screenY = Y_MIDDLE - y * Factor

            for (let i = 0; i < p2_points.length; i++) {
                const point = {
                    x: X_MIDDLE+ p2_points[i].realX * Factor,
                    y: Y_MIDDLE - p2_points[i].realY * Factor,
                    realX: p2_points[i].realX,
                    realY: p2_points[i].realY
                }

                newArray = newArray.concat(point)
            }
            p2_points = newArray
        }
    }

    if (selectShape1 == true)
        p1_points = p1_points.concat({
            x: screenX,
            y: screenY,
            realX: x,
            realY: y
        })
    else if (selectShape2 == true)
        p2_points = p2_points.concat({
            x: screenX,
            y: screenY,
            realX: x,
            realY: y
        })

    inp.value(null)
}

function drawPoint(X, Y) {
    stroke('red')
    strokeWeight(6)
    point(X, Y)
}

function keyPressed() {
    if (keyCode == RETURN) {
        addPoint()
    }
}

function calculate_covering(){
    /// algoritmul meu nu e bun (Cosmin)
}

function setup() {


    createCanvas(C_WIDTH, C_HEIGHT)

    radio1 = createRadio()
    radio1.option('Shape 1','1')
    radio1.style("width", "100px")
    radio1.attribute("name",'single-choice')    
    radio1.changed(startShape1)
    radio1.position(3 * WIDTH / 4 + 50, 50)

    radio2 = createRadio()
    radio2.option('Shape 2','2') 
    radio2.style("width", "100px")
    radio2.attribute("name",'single-choice') 
    radio2.changed(startShape2)
    radio2.position(3 * WIDTH / 4 + 50, 100)

    //aceste elemente de mai jos le-am lasat; poate ne vor mai trebui sau imi scapa mie ceva
    // let button = createButton("Shape 1")
    // button.position(3 * WIDTH / 4 + 50, 50)
    // button.mousePressed(startShape1)

    // button = createButton("Shape 2")
    // button.position(3 * WIDTH / 4 + 50, 100)
    // button.mousePressed(startShape2)

    button = createButton("Clear shape 1")
    button.position(3 * WIDTH / 4 + 170, 46)
    button.mousePressed(clearShape1)

    button = createButton("Clear shape 2")
    button.position(3 * WIDTH / 4 + 170, 96)
    button.mousePressed(clearShape2)

    inp = createInput('')
    inp.size(100, 25)
    inp.position(3 * WIDTH / 4 + 50, 150)
    inp.input(coordinateInput1)

    button = createButton("Add")
    button.position(3 * WIDTH / 4 + 170, 150)
    button.style("height", "30px")
    button.mousePressed(addPoint)

    button = createButton("Calculate")
    button.style("width", "250px")
    button.style("height", "25px")
    button.position(3 * WIDTH / 4 + 50, 200)
    button.mousePressed(calculate_covering)
}

 function draw() {
     clear()

     background(0, 0, 0)

     stroke('white')
     strokeWeight(5)
     point(X_MIDDLE, Y_MIDDLE)


     strokeWeight(1)
     line(0, Y_MIDDLE, C_WIDTH, Y_MIDDLE)
     line(X_MIDDLE, 0, X_MIDDLE, C_HEIGHT)

     for (let i = 0; i < p1_points.length; i++) {
         drawPoint(p1_points[i].x, p1_points[i].y)
         stroke('purple')
         strokeWeight(3)
         if (i > 0) {
             line(p1_points[i-1].x, p1_points[i-1].y, p1_points[i].x, p1_points[i].y)
         }
         if (i == p1_points.length - 1 && p1_points.length > 2) {
             line(p1_points[i].x, p1_points[i].y, p1_points[0].x, p1_points[0].y)
         }
     }

     for (let i = 0; i < p2_points.length; i++) {
         drawPoint(p2_points[i].x, p2_points[i].y)
         stroke('green')
         strokeWeight(3)
         if (i > 0) {
             line(p2_points[i-1].x, p2_points[i-1].y, p2_points[i].x, p2_points[i].y)
         }
         if (i == p2_points.length - 1 && p2_points.length > 2) {
             line(p2_points[i].x, p2_points[i].y, p2_points[0].x, p2_points[0].y)
         }
     }

 }
