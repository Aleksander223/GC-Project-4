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

function mouseClicked(e) {
    if (e.pageX < 0 || e.pageX > C_WIDTH || e.pageY < 0 || e.pageY > C_HEIGHT) {
        return
    }

    const point = {
        x: e.pageX,
        y: e.pageY,
        realX: e.pageX - X_MIDDLE,
        realY: Y_MIDDLE - e.pageY
    }


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
}

function clearShape2() {
    p2_points = []
    selectShape1 = false
    selectShape2 = false
}

function coordinateInput1() {
    shapeInput1 = this.value()
}

function addPoint() {
    shapeInput1 = shapeInput1.split(",")
    let x = parseFloat(shapeInput1[0])
    let y = parseFloat(shapeInput1[1])

    let screenX = X_MIDDLE + x
    let screenY = Y_MIDDLE - y

    if (screenX > C_WIDTH || screenY > C_HEIGHT) {
        xFactor = C_WIDTH/screenX
        yFactor = C_HEIGHT/screenY

        factor = Math.min(xFactor, yFactor)

        let newArray = []

        for (let i = 0; i < p1_points.length; i++) {
            const point = {
                x: p1_points[i].x * factor,
                y: p1_points[i].y *= factor,
                realX: p1_points[i].realX,
                realY: p1_points[i].realY
            }

            newArray = newArray.concat(point)
        }

        p1_points = newArray
    }

    screenX *= factor
    screenY *= factor

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

}

function keyPressed() {
    if (keyCode == RETURN) {
        addPoint()
    }
}

function setup() {


    createCanvas(C_WIDTH, C_HEIGHT)

    let button = createButton("Shape 1")
    button.position(3 * WIDTH / 4 + 50, 50)
    button.mousePressed(startShape1)

    button = createButton("Shape 2")
    button.position(3 * WIDTH / 4 + 50, 100)
    button.mousePressed(startShape2)

    button = createButton("Clear shape 1")
    button.position(3 * WIDTH / 4 + 150, 50)
    button.mousePressed(clearShape1)

    button = createButton("Clear shape 2")
    button.position(3 * WIDTH / 4 + 150, 100)
    button.mousePressed(clearShape2)

    inp = createInput('')
    inp.size(100, 25)
    inp.position(3 * WIDTH / 4 + 50, 150)
    inp.input(coordinateInput1)

    button = createButton("Add")
    button.position(3 * WIDTH / 4 + 170, 150)
    button.mousePressed(addPoint)
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
         stroke('purple')
         strokeWeight(5)
         point(p1_points[i].x, p1_points[i].y)
         if (i > 0) {
             line(p1_points[i-1].x, p1_points[i-1].y, p1_points[i].x, p1_points[i].y)
         }
         if (i == p1_points.length - 1 && p1_points.length > 2) {
             line(p1_points[i].x, p1_points[i].y, p1_points[0].x, p1_points[0].y)
         }
     }

     for (let i = 0; i < p2_points.length; i++) {
         stroke('green')
         strokeWeight(5)
         point(p2_points[i].x, p2_points[i].y)
         if (i > 0) {
             line(p2_points[i-1].x, p2_points[i-1].y, p2_points[i].x, p2_points[i].y)
         }
         if (i == p2_points.length - 1 && p2_points.length > 2) {
             line(p2_points[i].x, p2_points[i].y, p2_points[0].x, p2_points[0].y)
         }
     }

 }