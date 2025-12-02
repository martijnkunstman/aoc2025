
let inputdata;
let result1 = 0;
let result2 = 0;

fetch(1 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {
        //-------------------------- parse data --------------------------
        console.log(data);
        //inputData = data.split("\r\n");
        //inputData = data.split("\n");
        //inputData = data.split(",");

        //-------------------------- part 1 --------------------------
        // code here....
        console.log("Result 1: " + result1);
        //-------------------------- part 2 --------------------------
        // code here....
        console.log("Result 2: " + result2);
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });