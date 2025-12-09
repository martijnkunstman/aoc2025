
let inputData = [];
let part1Numners = [];
let result1 = 0;
let result2 = 0;

fetch(0 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {
        //-------------------------- parse data --------------------------

        inputData = data.split("\r\n");

        for (let i = 0; i < inputData.length; i++) {
            inputData[i] = inputData[i].split(',').map(Number);
        }

        //-------------------------- part 1 -------------------------- 

        for (let i = 0; i < inputData.length; i++) {
            for (let j = i + 1; j < inputData.length; j++) {
                let width = Math.abs(inputData[i][0] - inputData[j][0]) + 1;
                let height = Math.abs(inputData[i][1] - inputData[j][1]) + 1;
                let surface = width * height;
                part1Numners.push(surface);
            }
        }

        let getHighest = Math.max(...part1Numners);
        result1 = getHighest;

        //console.log(inputData);

        console.log("Result 1: " + result1);

        //4746100212 to low....
        //4746238001 is right....

        //-------------------------- part 2 -------------------------- 

        //visualise the line between points on a canvas

        let canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;
        canvas.style.border = "1px solid black";
        document.body.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        let factor = 1 / 100;
        for (let i = 0; i < inputData.length; i++) {
            if (i > 0) {
                ctx.lineTo(inputData[i][0] * factor, inputData[i][1] * factor);
            } else {
                ctx.moveTo(inputData[i][0] * factor, inputData[i][1] * factor);
            }
        }
        ctx.closePath();
        ctx.stroke();

        //there is only straight lines between points
        //check all squares i can make and skip those that cross a line

        //make an array of all the squares and order them big to low
        let squares = [];
        for (let i = 0; i < inputData.length; i++) {
            for (let j = i + 1; j < inputData.length; j++) {
                let width = Math.abs(inputData[i][0] - inputData[j][0]) + 1;
                let height = Math.abs(inputData[i][1] - inputData[j][1]) + 1;
                let surface = width * height;
                squares.push({ x1: inputData[i][0], y1: inputData[i][1], x2: inputData[j][0], y2: inputData[j][1], surface: surface });
            }
        }
        //now check for all the squares if there is a point in them from the top down
        squares.sort((a, b) => b.surface - a.surface);
        for (let s = 0; s < squares.length; s++) {
            let hasPointInside = false;
            squares[s].pointInside = false;
            for (let p = 0; p < inputData.length; p++) {
                if (inputData[p][0] > Math.min(squares[s].x1, squares[s].x2) &&
                    inputData[p][0] < Math.max(squares[s].x1, squares[s].x2) &&
                    inputData[p][1] > Math.min(squares[s].y1, squares[s].y2) &&
                    inputData[p][1] < Math.max(squares[s].y1, squares[s].y2)) {
                    hasPointInside = true;
                    squares[s].pointInside = true;
                    break;
                }
            }
        }
        console.log(squares);
        //
        //find first square without a point inside
        //and that has point(94539,50089) or point(94539,48701)
        //but not cross the line!!!!!
        //
        for (let s = 0; s < squares.length; s++) {
            if (!squares[s].pointInside) {
                let pointInSquare = false;
                if (squares[s].x1 == 94539 && squares[s].y1 == 50089) {
                    //this is the bottom point, so y2 shpould be more than y1
                    if (squares[s].y2 > squares[s].y1) {
                        pointInSquare = true;
                    }
                }
                if (squares[s].x1 == 94539 && squares[s].y1 == 48701) {
                    //this is the top point, so y2 should be less than y1
                    if (squares[s].y2 < squares[s].y1) {
                        pointInSquare = true;
                    }
                }
                if (squares[s].x2 == 94539 && squares[s].y2 == 50089) {
                    //this is the bottom point, so y1 should be more than y2
                    if (squares[s].y1 > squares[s].y2) {
                        pointInSquare = true;
                    }
                }
                if (squares[s].x2 == 94539 && squares[s].y2 == 48701) {
                    //this is the top point, so y1 should be less than y2
                    if (squares[s].y1 < squares[s].y2) {
                        pointInSquare = true;
                    }
                }
                if (pointInSquare) {
                    result2 = squares[s].surface;
                    break;
                }
            }
        }

        console.log("Result 2: " + result2);//1552139370 yes!!!!!
        
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });