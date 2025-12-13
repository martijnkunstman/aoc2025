//before we start lets analyse what we are working with....

//squares seem to be max 50x50 lets check that assumption later...

//shapes that have to fit in have only 2 or 3 missing parts

//lets parse the input.txt... we need an array of squares and info about the ammount of differnt shapes to fit into it
//we need the actual shapes... lets store them as typed arrays for fast calculations... and also store all their rotated and flipped alternatives

//use this object data for the squares...

let squaresExample = [
    {
        width: 50, //width of the square
        height: 50, //height of the square
        shapesCount: [0, 1, 2, 3, 4, 5], //how many of each shape we need to fit in
    }
];

//lets use this data for shapes (for now.... later convert it to 1d typed arrays)

//lets get an insight of what rotation and flipping does to shapes...
let shapesExample = [
    [[1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1]], //only 4 versions.. flip=rotate operation
    [[1, 1, 1, 1, 1, 1, 1, 0, 1], []],//see example below...
    [[1, 1, 1, 1, 1, 1, 0, 1, 1], []],//...
    [[1, 1, 1, 1, 1, 0, 1, 1, 1], []],//...
    [[1, 1, 1, 1, 0, 1, 1, 1, 1], []],//...
    [[1, 1, 1, 0, 1, 1, 1, 1, 1], []]//...
];
//or maybe first store a 2d array so it is easier to see if it is right...

/*
110 011 111 111
111 111 111 111
111 111 011 110

111 111 100 001 111 011 110 111
110 011 111 111 011 011 110 110
110 011 111 111 011 111 111 110

011 110
111 111
110 011

111
111
111

111
101
111

s0 it can be 4 8 2 or 1 (1 not likely, because it is all filled)

*/

//do flip and rotate operations and remove duplicates...
//lets visualise the shapes and their transforms


let squares = [];
let shapes = [[[]], [[]], [[]], [[]], [[]], [[]]];//i know that there are 6 shapes.... so hardcode it 

fetch(0 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {
        //-------------------------- start parse data --------------------------
        data = data.replaceAll("\r", "");
        let inputData = data.split("\n");
        let count = 0;
        for (let line of inputData) {
            if (line.length > 4) {
                //we got a square line
                let square = {
                    width: 0,
                    height: 0,
                    shapesCount: []
                };
                let temp = line.split(": ");
                square.width = parseInt(temp[0].split("x")[0]);
                square.height = parseInt(temp[0].split("x")[1]);
                let counts = temp[1].split(" ");
                for (let count of counts) {
                    square.shapesCount.push(parseInt(count));
                }
                squares.push(square);
            }
            else {
                //shape line
                if (line.length === 3) {
                    //map # to 1 and . to 0
                    shapes[Math.floor(count / 3)][0].push(line.split("").map(c => c === "#" ? 1 : 0));
                    count++;
                }
            }

        }
        console.log(squares);

        for (let s = 0; s < shapes.length; s++) {
            let shape = shapes[s][0];
            console.log("Original shape:");
            console.log(shape);
            //now do the transformations... should be 7 in total... remove duplicates

            //relly really naive approach, but at least i understand what i an doing....

            //flip horizontal #2
            let newShape1 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            newShape1[0][0] = shape[0][2];
            newShape1[0][1] = shape[0][1];
            newShape1[0][2] = shape[0][0];
            newShape1[1][0] = shape[1][2];
            newShape1[1][1] = shape[1][1];
            newShape1[1][2] = shape[1][0];
            newShape1[2][0] = shape[2][2];
            newShape1[2][1] = shape[2][1];
            newShape1[2][2] = shape[2][0];
            shapes[s].push(newShape1);
            //flip vertical #3
            let newShape2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            newShape2[0][0] = shape[2][0];
            newShape2[0][1] = shape[2][1];
            newShape2[0][2] = shape[2][2];
            newShape2[1][0] = shape[1][0];
            newShape2[1][1] = shape[1][1];
            newShape2[1][2] = shape[1][2];
            newShape2[2][0] = shape[0][0];
            newShape2[2][1] = shape[0][1];
            newShape2[2][2] = shape[0][2];
            shapes[s].push(newShape2);
            //rotate right #4
            let newShape3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            newShape3[0][0] = shape[2][0];
            newShape3[0][1] = shape[1][0];
            newShape3[0][2] = shape[0][0];
            newShape3[1][0] = shape[2][1];
            newShape3[1][1] = shape[1][1];
            newShape3[1][2] = shape[0][1];
            newShape3[2][0] = shape[2][2];
            newShape3[2][1] = shape[1][2];
            newShape3[2][2] = shape[0][2];
            shapes[s].push(newShape3);
            //rotate left #5
            let newShape4 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            newShape4[0][0] = shape[0][2];
            newShape4[0][1] = shape[1][2];
            newShape4[0][2] = shape[2][2];
            newShape4[1][0] = shape[0][1];
            newShape4[1][1] = shape[1][1];
            newShape4[1][2] = shape[2][1];
            newShape4[2][0] = shape[0][0];
            newShape4[2][1] = shape[1][0];
            newShape4[2][2] = shape[2][0];
            shapes[s].push(newShape4);
            //rotate right + flip horizontal #6
            let newShape5 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            newShape5[0][0] = shape[0][0];
            newShape5[0][1] = shape[1][0];
            newShape5[0][2] = shape[2][0];
            newShape5[1][0] = shape[0][1];
            newShape5[1][1] = shape[1][1];
            newShape5[1][2] = shape[2][1];
            newShape5[2][0] = shape[0][2];
            newShape5[2][1] = shape[1][2];
            newShape5[2][2] = shape[2][2];
            shapes[s].push(newShape5);
            //rotate left + flip horizontal #7
            let newShape6 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            newShape6[0][0] = shape[2][2];
            newShape6[0][1] = shape[1][2];
            newShape6[0][2] = shape[0][2];
            newShape6[1][0] = shape[2][1];
            newShape6[1][1] = shape[1][1];
            newShape6[1][2] = shape[0][1];
            newShape6[2][0] = shape[2][0];
            newShape6[2][1] = shape[1][0];
            newShape6[2][2] = shape[0][0];
            shapes[s].push(newShape6);
            //rotate right + flip vertical #8
            let newShape7 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            newShape7[0][0] = shape[2][2];
            newShape7[0][1] = shape[2][1];
            newShape7[0][2] = shape[2][0];
            newShape7[1][0] = shape[1][2];
            newShape7[1][1] = shape[1][1];
            newShape7[1][2] = shape[1][0];
            newShape7[2][0] = shape[0][2];
            newShape7[2][1] = shape[0][1];
            newShape7[2][2] = shape[0][0];
            shapes[s].push(newShape7);
        }

        console.log("Transformed shapes:");
        console.log(shapes);

        //remove duplicates from shapes
        for (let s = 0; s < shapes.length; s++) {
            let shape = shapes[s];
            let uniqueShapes = [];
            for (let i = 0; i < shape.length; i++) {
                let isDuplicate = false;
                for (let j = 0; j < uniqueShapes.length; j++) {
                    if (JSON.stringify(shape[i]) === JSON.stringify(uniqueShapes[j])) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    uniqueShapes.push(shape[i]);
                }
            }
            shapes[s] = uniqueShapes;
        }
        console.log("Unique shapes:");
        console.log(shapes);

        //now visualise the shapes and their alternatives..
        //creata a canvas to visualise stuff
        let canvas = document.createElement("canvas");
        canvas.width = 2000;
        canvas.height = 2000;
        document.body.appendChild(canvas);
        let ctx = canvas.getContext("2d");

        for (let s = 0; s < shapes.length; s++) {
            let shape = shapes[s];
            for (let v = 0; v < shape.length; v++) {
                let variant = shape[v];
                for (let y = 0; y < variant.length; y++) {
                    for (let x = 0; x < variant[y].length; x++) {
                        if (variant[y][x] === 1) {
                            ctx.fillStyle = "black";
                        } else {
                            ctx.fillStyle = "white";
                        }
                        ctx.strokeStyle = "gray";
                        ctx.lineWidth = 1;
                        ctx.fillRect(s * 60 + x * 10, y * 10 + v * 40, 10, 10);
                        ctx.strokeRect(s * 60 + x * 10, y * 10 + v * 40, 10, 10);
                    }
                }
            }
        }

        //draw the first 16 squares on the canvas.. use 4 x 4 and 50 max size
        function drawSquare() {
            let offsetX = shapes.length * 60 + 20;;
            ctx.translate(offsetX, 0);
            let scale = 6;
            for (let i = 0; i < 16; i++) {
                let square = squares[i];
                for (let y = 0; y < square.height; y++) {
                    for (let x = 0; x < square.width; x++) {
                        ctx.fillStyle = "white";
                        ctx.strokeStyle = "black";
                        ctx.lineWidth = 1;
                        ctx.fillRect(i % 4 * 10 + (i % 4) * (50 * scale) + x * scale, Math.floor(i / 4) * (50 * scale) + y * scale, scale, scale);
                        ctx.strokeRect(i % 4 * 10 + (i % 4) * (50 * scale) + x * scale, Math.floor(i / 4) * (50 * scale) + y * scale, scale, scale);
                    }
                }
            }
        }


        //-------------------------- end parse data --------------------------

        //lets find out how many 3x3 shapes can fit into the squares an see how many need to be in there....
        //so i can remove the squares that fit without doing any border merging....

        let willFitCount = 0;

        let remainingSquares = [];
        for (let i = 0; i < squares.length; i++) {
            let fit3x3 = Math.floor(squares[i].width / 3) * Math.floor(squares[i].height / 3);
            let needed3x3 = squares[i].shapesCount[0] + squares[i].shapesCount[1] + squares[i].shapesCount[2] + squares[i].shapesCount[3] + squares[i].shapesCount[4] + squares[i].shapesCount[5];
            if (fit3x3 >= needed3x3) {
                willFitCount++;
            }
            else {
                //make a new array of remaining squares to check...
                remainingSquares.push(squares[i]);
            }
        }

        squares = remainingSquares;

        console.log("Number of squares that can fit all 3x3 shapes: " + willFitCount);

        //i can also check if there is squares that have less spaces than the shapes need, lets check that...
        let impossibleCount = 0;
        remainingSquares = [];
        for (let i = 0; i < squares.length; i++) {
            let totalSpaces = squares[i].width * squares[i].height;
            let neededSpaces = 0;   
            for (let s = 0; s < squares[i].shapesCount.length; s++) {   
                //lets find out how many spaces each shape needs...
                let shapeSpaces = 0;
                for (let y = 0; y < shapes[s][0].length; y++) {
                    for (let x = 0; x < shapes[s][0][y].length; x++) {
                        if (shapes[s][0][y][x] === 1) {
                            shapeSpaces++;
                        }
                    }
                }
                neededSpaces += shapeSpaces * squares[i].shapesCount[s];
            }
            if (neededSpaces > totalSpaces) {
                impossibleCount++;
            }
            else {
                remainingSquares.push(squares[i]);
            }
        }

        console.log("Number of impossible squares: " + impossibleCount);
        squares = remainingSquares;

        console.log("Remaining squares to process: " + squares.length);

        //drawSquare();




    })