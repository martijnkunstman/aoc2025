
let rangesArray = [];
let numbersArray = [];
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
        let firstpart = true;
        for (let i = 0; i < inputData.length; i++) {
            if (inputData[i] === "") firstpart = false;
            if (firstpart) {
                temp = inputData[i].split("-");
                rangesArray.push([parseInt(temp[0]), parseInt(temp[1])]);
            }
            else {
                if (inputData[i] === "") continue;
                numbersArray.push(parseInt(inputData[i]));
            }
        }
        console.log(rangesArray);
        console.log(numbersArray);
        //-------------------------- part 1 --------------------------
        // code here....
        for (let n = 0; n < numbersArray.length; n++) {
            for (let r = 0; r < rangesArray.length; r++) {
                if (numbersArray[n] >= rangesArray[r][0] && numbersArray[n] <= rangesArray[r][1]) {
                    result1++;
                    break;
                }
            }
        }
        console.log("Result 1: " + result1);
        //-------------------------- part 2 --------------------------
        // code here....
        //
        rangesArray.sort((a, b) => a[0] - b[0]);
        let cleanedRanges = [];
        cleanedRanges.push(rangesArray[0]);
        for (let r = 1; r < rangesArray.length; r++) {
            let lastRange = cleanedRanges[cleanedRanges.length - 1];
            if (rangesArray[r][0] <= lastRange[1]) {
                //overlap
                if (rangesArray[r][1] > lastRange[1]) {
                    lastRange[1] = rangesArray[r][1];
                }
            }
            else {
                cleanedRanges.push(rangesArray[r]);
            }
        }
        for (let r = 0; r < cleanedRanges.length; r++) {
            let rangeSize = cleanedRanges[r][1] - cleanedRanges[r][0] + 1;
            result2 += rangeSize;
        }
        console.log("Result 2: " + result2);
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });