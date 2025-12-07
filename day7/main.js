
let inputData = [];
let result1 = 0;
let result2 = 0;

fetch(0 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {
        //-------------------------- parse data --------------------------

        inputData = data.split("\r\n");

        for (let i = 0; i < inputData.length; i++) {
            inputData[i] = inputData[i].split("");
        }

        for (let i = 1; i < inputData.length; i++) {
            for (let j = 0; j < inputData[i].length; j++) {
                if (inputData[i - 1][j] == "S") {
                    inputData[i][j] = "|";
                }
                if (inputData[i - 1][j] == "|") {
                    if (inputData[i][j] === ".") {
                        inputData[i][j] = "|";
                    }
                    if (inputData[i][j] == "^") {
                        result1++;
                        if (j > 0) {
                            inputData[i][j - 1] = "|";
                        }
                        if (j < inputData[i].length - 1) {
                            inputData[i][j + 1] = "|";
                        }
                    }
                }
            }
        }

        console.log(inputData);
        console.log("Result 1: " + result1);
        //-------------------------- part 2 --------------------------
        // code here....

        //convert to maze of 1 and 0
        let maze = [];
        for (let i = 0; i < inputData.length; i++) {
            maze[i] = [];
            for (let j = 0; j < inputData[i].length; j++) {
                if (inputData[i][j] === "|" || inputData[i][j] === "S" || inputData[i][j] === "^") {
                    maze[i][j] = 1;
                } else {
                    maze[i][j] = 0;
                }
            }
        }
        let stringMaze = "";
        for (let i = 0; i < maze.length; i++) {
            stringMaze += maze[i].join("") + "\n";
        } 
        stringMaze = stringMaze.replaceAll("1", "#");
        stringMaze = stringMaze.replaceAll("0", ".");
        console.log(stringMaze);




        console.log("Result 2: " + result2);
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });