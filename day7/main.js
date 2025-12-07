
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
                if (inputData[i][j] === "|" || inputData[i][j] === "S" || inputData[i][j] === "") {
                    maze[i][j] = 1;
                } else {
                    maze[i][j] = 0;
                }
            }
        }
        //memove all even rows from the array
        maze = maze.filter((_, index) => index % 2 !== 0);
        let stringMaze = "";
        for (let i = 0; i < maze.length; i++) {
            stringMaze += maze[i].join("") + "\n";
        }
        stringMaze = stringMaze.replaceAll("1", "#");
        stringMaze = stringMaze.replaceAll("0", ".");
        console.log(stringMaze);

        //-------------------------- test --------------------------

        /*
        1 - 1
        2 - 1 1
        3 - 1 2 1
        4 - 1 3 3 1
        5 - 1 4 6 4 1
        6 - 1 5 10 10 5 1
        7 - 1 7 21 35 35 21 7 1
        8 - 1 8 28 56 70 56 28 8 1
        */

        /*
.......#.......
......#.#......
.....#.#.#.....
....#.#.#.#....
...#.#.###.#...
..#.#.###.#.#..
.#.###.##.##.#.
#.#.#.#.#.###.#

1 6 

*/
        //count all ^ string in inputData
        let countSplitter = 0;
        for (let i = 0; i < inputData.length; i++) {
            for (let j = 0; j < inputData[i].length; j++) {
                if (inputData[i][j] === "^") {
                    countSplitter++;
                }
            }
        }
        console.log("Count of ^: " + countSplitter);
        //remove all ^ from inputData that have not got a | under them
        for (let i = 0; i < inputData.length - 1; i++) {
            for (let j = 1; j < inputData[i].length - 1; j++) {
                if (inputData[i][j] === "^" && inputData[i + -1][j] !== "|") {
                    inputData[i][j] = ".";
                }
            }
        }
        countSplitter = 0;
        for (let i = 0; i < inputData.length; i++) {
            for (let j = 0; j < inputData[i].length; j++) {
                if (inputData[i][j] === "^") {
                    countSplitter++;
                }
            }
        }
        console.log("Count of ^: " + countSplitter);
        console.log(inputData);
        //
        //now make the pascal triangle...
        //
        //first make an new array in which i store the numbers of the pascal triangle....
        let pascalArray = [];
        for (let i = 0; i < inputData.length; i++) {
            let tempArray = [];
            for (let j = 0; j < inputData[i].length; j++) {
                tempArray[j] = 0;
            }
            pascalArray.push(tempArray);
        }

        //now fill the pascal triangle array
        for (let i = 0; i < pascalArray.length; i++) {
            for (let j = 0; j < pascalArray[i].length; j++) {
                if (i === 0) {
                    if (inputData[i][j] === "S") {
                        pascalArray[i][j] = 1;
                    }
                }
                //if there a no splitters in this row then for every | take the value above...
                if (i > 0) {
                    //if there a no splitters in this row then for every | take the value above... 
                    if (inputData[i][j] === "|") {
                        pascalArray[i][j] += pascalArray[i - 1][j];
                    }
                    //if there is a splitter in this row then for every | take the value above + left + right
                    if (inputData[i][j] === "^") {
                        pascalArray[i][j-1] += pascalArray[i - 1][j];
                        pascalArray[i][j+1] += pascalArray[i - 1][j];
                    }

                }
            }
        }
        console.log(pascalArray);
        result2 = pascalArray[pascalArray.length - 1].reduce((a, b) => a + b, 0);

        console.log("Result 2: " + result2);
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });