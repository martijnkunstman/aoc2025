let inputData = "";
let countZeroes = 0;
let start = 10000050;
//fetch("sample.txt")
fetch("input.txt")
    .then(response => response.text())
    .then(data => {
        console.log(data);
        inputData = data.split("\n");
        //inputData = data.split("\r\n");
        // Now inputData is an array of lines from the file
        console.log(inputData);
        //part 1
        for (let i = 0; i < inputData.length; i++) {
            let line = inputData[i];
            if (line.includes("R")) {
                start += parseInt(line.replace("R", ""));
            }
            else {
                start -= parseInt(line.replace("L", ""));
            }
            console.log("Current Position: " + start);
            if (!(start % 100)) {
                countZeroes += 1;
            }
        }
        console.log("Zeroes Count: " + countZeroes);
        //part 2
        start = 10000050;
        countZeroes = 0;
        for (let i = 0; i < inputData.length; i++) {
            let line = inputData[i];
            if (line.includes("R")) {
                for (let j = 0; j < parseInt(line.replace("R", "")); j++) {
                    start += 1;
                    if (!(start % 100)) {
                        countZeroes += 1;
                    }
                }
            }
            else {
                for (let j = 0; j < parseInt(line.replace("L", "")); j++) {
                    start -= 1;
                    if (!(start % 100)) {
                        countZeroes += 1;
                    }
                }
            }
        }
        console.log("Zeroes Count: " + countZeroes);
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });