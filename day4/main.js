
let inputData;
let result1 = 0;
let result2 = 0;

fetch(0 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {
        //-------------------------- parse data --------------------------
        //console.log(data);
        inputData = data.split("\r\n");//sample
        //inputData = data.split("\n");
        //inputData = data.split(",");
        for (let i = 0; i < inputData.length; i++) {
            inputData[i] = inputData[i].split("");
        }
        console.log(inputData);
        //-------------------------- part 1 --------------------------
        // code here....
        for (let i = 0; i < inputData.length; i++) {
            for (let j = 0; j < inputData[i].length; j++) {
                // look around from this position to all next 8
                //top left, top, top right, left, right, bottom left, bottom, bottom right
                let current = inputData[i][j];
                if (current === "@") {
                    let topLeft = (i > 0 && j > 0) ? inputData[i - 1][j - 1] : null;
                    let top = (i > 0) ? inputData[i - 1][j] : null;
                    let topRight = (i > 0 && j < inputData[i].length - 1) ? inputData[i - 1][j + 1] : null;
                    let left = (j > 0) ? inputData[i][j - 1] : null;
                    let right = (j < inputData[i].length - 1) ? inputData[i][j + 1] : null;
                    let bottomLeft = (i < inputData.length - 1 && j > 0) ? inputData[i + 1][j - 1] : null;
                    let bottom = (i < inputData.length - 1) ? inputData[i + 1][j] : null;
                    let bottomRight = (i < inputData.length - 1 && j < inputData[i].length - 1) ? inputData[i + 1][j + 1] : null;
                    let count = 0;
                    if (topLeft == "@") { count++; }
                    if (top == "@") { count++; }
                    if (topRight == "@") { count++; }
                    if (left == "@") { count++; }
                    if (right == "@") { count++; }
                    if (bottomLeft == "@") { count++; }
                    if (bottom == "@") { count++; }
                    if (bottomRight == "@") { count++; }

                    if (count <= 3) {
                        result1++;
                    }
                }

            }
        }




        console.log("Result 1: " + result1);
        //-------------------------- part 2 --------------------------
        // code here....
        for (let step = 0; step < 100000; step++) {
            console.log("Step: " + step);
            let changes = removeRolls();
            if (changes === 0) {
                break;
            }
        }







        console.log("Result 2: " + result2);
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });




function removeRolls() {
    tempcount = 0;
    inputDataNow = JSON.parse(JSON.stringify(inputData));
    for (let i = 0; i < inputData.length; i++) {
        for (let j = 0; j < inputData[i].length; j++) {
            // look around from this position to all next 8
            //top left, top, top right, left, right, bottom left, bottom, bottom right
            let current = inputData[i][j];
            if (current === "@") {
                let topLeft = (i > 0 && j > 0) ? inputData[i - 1][j - 1] : null;
                let top = (i > 0) ? inputData[i - 1][j] : null;
                let topRight = (i > 0 && j < inputData[i].length - 1) ? inputData[i - 1][j + 1] : null;
                let left = (j > 0) ? inputData[i][j - 1] : null;
                let right = (j < inputData[i].length - 1) ? inputData[i][j + 1] : null;
                let bottomLeft = (i < inputData.length - 1 && j > 0) ? inputData[i + 1][j - 1] : null;
                let bottom = (i < inputData.length - 1) ? inputData[i + 1][j] : null;
                let bottomRight = (i < inputData.length - 1 && j < inputData[i].length - 1) ? inputData[i + 1][j + 1] : null;
                let count = 0;
                if (topLeft == "@") { count++; }
                if (top == "@") { count++; }
                if (topRight == "@") { count++; }
                if (left == "@") { count++; }
                if (right == "@") { count++; }
                if (bottomLeft == "@") { count++; }
                if (bottom == "@") { count++; }
                if (bottomRight == "@") { count++; }
                if (count <= 3) {
                    inputDataNow[i][j] = ".";
                    result2++;
                    tempcount++;
                }
            }

        }
    }
    inputData = JSON.parse(JSON.stringify(inputDataNow));
    return tempcount;
}