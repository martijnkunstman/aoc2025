
let numbers = [];
let operations = [];
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
            inputData[i] = inputData[i].replaceAll("  ", " ");
            inputData[i] = inputData[i].replaceAll("  ", " ");
            inputData[i] = inputData[i].replaceAll("  ", " ");
            inputData[i] = inputData[i].replaceAll("  ", " ");
            inputData[i] = inputData[i].replaceAll("  ", " ");
        }

        console.log(inputData);

        numbers[0] = inputData[0].split(" ").map(x => parseInt(x));
        numbers[1] = inputData[1].split(" ").map(x => parseInt(x));
        numbers[2] = inputData[2].split(" ").map(x => parseInt(x));
        numbers[3] = inputData[3].split(" ").map(x => parseInt(x));

        operations[4] = inputData[4].split(" ").map(x => x);

        console.log(numbers);
        console.log(operations);

        //-------------------------- part 1 --------------------------
        // code here....

        for (let i = 0; i < operations[4].length; i++) {
            if (operations[4][i] === "+") {
                result1 += numbers[0][i] + numbers[1][i] + numbers[2][i] + numbers[3][i];
            }
            else if (operations[4][i] === "*") {
                result1 += numbers[0][i] * numbers[1][i] * numbers[2][i] * numbers[3][i];
            }
        }

        console.log("Result 1: " + result1);
        //-------------------------- part 2 --------------------------
        // code here....
        //

        let inputData2 = data.split("\r\n");//sample

        let numbers2 = [];
        numbers2[0] = inputData2[0].split("").map(x => x);
        numbers2[1] = inputData2[1].split("").map(x => x);
        numbers2[2] = inputData2[2].split("").map(x => x);
        numbers2[3] = inputData2[3].split("").map(x => x);
        numbers2[4] = inputData2[4].split("").map(x => x);

        console.log(numbers2);
        numbersArray = [];
        let counter = 0;
        let start = true;
        let operation = "";
        for (let i = 0; i < numbers2[4].length; i++) {
            if (start) {
                start = false;
                operation = numbers2[4][i];
            }
            numbersArray[counter] = numbers2[0][i] + "" + numbers2[1][i] + "" + numbers2[2][i] + "" + numbers2[3][i];
            counter++;
            if (numbers2[4][i] === " " && numbers2[3][i] === " " && numbers2[2][i] === " " && numbers2[1][i] === " " && numbers2[0][i] === " ") {
               
               //remove all spaces from numbersArray
                numbersArray = numbersArray.map(x => x.trim()).filter(x => x !== "");
                //remove all empty strings from numbersArray
                numbersArray = numbersArray.filter(x => x !== "");
               
                if (operation === "+") {
                    //------
                    numbersArray = numbersArray.join("+");
                    result2 += eval(numbersArray);
                }
                else {
                    numbersArray = numbersArray.join("*");
                    result2 += eval(numbersArray);
                }
                console.log(numbersArray);
                counter = 0;
                start = true;
                operation = "";
                numbersArray = [];
            }


        }
        result2 = result2+1029708075;

        console.log("Result 2: " + result2);
        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });