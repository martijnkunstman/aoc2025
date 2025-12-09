
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
                //i forggot to add the +1 in the first run
                let width = Math.abs(inputData[i][0] - inputData[j][0]) + 1;
                let height = Math.abs(inputData[i][1] - inputData[j][1]) + 1;
                let surface = width * height;
                part1Numners.push(surface);
            }
        }
        //nice and easy find the highest number with the Math.max...
        let getHighest = Math.max(...part1Numners);
        result1 = getHighest;//why did i do this? and not straight away result1 = Math.max(...part1Numners);

        //console.log(inputData); //to see if my data is parsed right

        console.log("Result 1: " + result1);//

        //4746100212 to low....
        //4746238001 is right....

        //-------------------------- part 2 -------------------------- 

        //visualise the line between points on a canvas to get a sense of what we are working with...
        //analyse the dimmensions of the grid by eye studing the inputdata...
        //we seem to have max 100000 x 100000 grid.... 

        //that is not going to work on an uint8array grid... I(i tried...)
        //let grid = new Uint8Array(100000 * 100000); //no way

        let canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;
        canvas.style.border = "1px solid black";
        document.body.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        let factor = 1 / 100;//to fit is on the canvas
        for (let i = 0; i < inputData.length; i++) {
            if (i > 0) {
                ctx.lineTo(inputData[i][0] * factor, inputData[i][1] * factor);
            } else {
                ctx.moveTo(inputData[i][0] * factor, inputData[i][1] * factor);
            }
        }
        ctx.closePath();
        ctx.stroke();

        //is see now.... there is only straight lines between points (did not check but assumed)
        //i also realise there is only the bggest squares possible if there is not a point inside AND it contains one of the weird point..
        //BUT than there is only a combination possible where there is a sqquare ABOVE or UNDER the two special points....
       
        //start taking it down step by step.......

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
        //nice and easy sort it....
        squares.sort((a, b) => b.surface - a.surface);
     
        //now check for all the squares if there is a point in them from the top down
        // (i thought first this would give a solution....)
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
        //to check if the squares were made right...
        console.log(squares);

        //
        //find first square without a point inside (based on previous check)
        //
        // (that is not enoough... or not even neeeded, did not check that...)
        //
        //NOW the magic....
        //
        //and that has point(94539,50089) or point(94539,48701)
        //
        //but not cross the line!!!!! (so points a at the right side top or down from the special point... i had this wronmg firsttime...)
        //


        //make a new squares array to store valid rsults from top to bottom
        //..

        let resultSquares = [];

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
                    //result2 = squares[s].surface;
                    resultSquares.push(squares[s]);
                }
            }
        }

        console.log(resultSquares);

        console.log("Result 2: " + result2);//1552139370 yes!!!!!

        //now visulaise the resultSquares on the canvas one by one big to small
    

        drawSquare(0)

        function drawSquare(r)
        {
             ctx.strokeStyle = `rgba(0, 0, 255, ${1 - r / resultSquares.length})`;
            ctx.beginPath();
            ctx.rect(
                Math.min(resultSquares[r].x1, resultSquares[r].x2) * factor,
                Math.min(resultSquares[r].y1, resultSquares[r].y2) * factor,
                (Math.abs(resultSquares[r].x1 - resultSquares[r].x2) + 1) * factor,
                (Math.abs(resultSquares[r].y1 - resultSquares[r].y2) + 1) * factor
            );
            ctx.stroke();
            if (r<resultSquares.length-1)
            {
                setTimeout(() => { drawSquare(r+1); }, 100);
            }
        }
        
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });