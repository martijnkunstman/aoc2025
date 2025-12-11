
let inputData = [];
let part1Numners = [];
let result1 = 0;
let result2 = 0;
let sequences = [];
let buttons = [];

fetch(0 ? "sample.txt" : "input.txt")
    .then(response => response.text())
    .then(data => {
        //-------------------------- parse data --------------------------

        inputData = data.split("\r\n");

        // [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
        // [...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
        // [.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}

        console.log(inputData);

        for (let i = 0; i < inputData.length; i++) {
            inputData[i] = inputData[i].split(' ');
        }
        for (let i = 0; i < inputData.length; i++) {
            let temp = inputData[i][0].split('');
            temp.shift();
            temp.pop();
            for (let j = 0; j < temp.length; j++) {
                if (temp[j] === '#') {
                    temp[j] = true;
                } else {
                    temp[j] = false;
                }
            }
            sequences.push(temp);
            let buttonsTemp = [];
            for (let j = 1; j < inputData[i].length - 1; j++) {
                let temp = inputData[i][j];
                //remove and first character and last character
                temp = temp.substring(1, temp.length - 1);
                temp = temp.split(',').map(Number);
                buttonsTemp.push(temp);
            }
            buttons.push(buttonsTemp);
        }
        console.log("Input data parsed.");
        console.log(inputData);
        console.log("Sequences:");
        console.log(sequences);
        console.log("Buttons:");
        console.log(buttons);

        //now i can try to see if i can do a naive appraoch to see that might be working and get a bit of understanduing of what we are doing....

        //use bits numbers for combinations of button presses...

        /*  2^4 = 
        0000
        0001
        0010
        0011
        0100
        0101
        0110
        0111
        1000
        1001
        1010
        1011
        1100
        1101
        1110
        1111
        */
               
        for (let i = 0; i < sequences.length; i++) {
            
            let buttonPressCount = 100000;
            
            let startSequence = [];
            let findSequence = sequences[i];
            for (let j = 0; j < sequences[i].length; j++) {
                startSequence.push(false);
            }
            console.log("Start with this sequense: " + startSequence);
            console.log("Try to find this sequense: " + findSequence);

            //try all combinations of buttons... (naive approach)
            let maxCombinations = Math.pow(2, buttons[i].length);
            console.log("Max combinations: " + maxCombinations);

            for (let combination = 0; combination < maxCombinations; combination++) {
                let testSequence = [...startSequence];  
                for (let buttonIndex = 0; buttonIndex < buttons[i].length; buttonIndex++) {
                    if ((combination & (1 << buttonIndex)) !== 0) {
                        //press this button
                        let button = buttons[i][buttonIndex];
                        for (let k = 0; k < button.length; k++) {
                            let indexToToggle = button[k];
                            testSequence[indexToToggle] = !testSequence[indexToToggle];
                        }
                    }
                }
                //check if testSequence matches findSequence
                if (checkSequenceMatch(testSequence, findSequence)) {
                    //count 1 bits in combination
                    let bitsCount = combination.toString(2).split('1').length - 1;
                    if (bitsCount < buttonPressCount) {
                        buttonPressCount = bitsCount;
                    }
                }
            }
            result1 = result1 + buttonPressCount;
        }

        function checkSequenceMatch(seq1, seq2) {
            for (let i = 0; i < seq1.length; i++) {
                if (seq1[i] !== seq2[i]) {
                    return false;
                }
            }
            return true;
        }

     
        //


        //-------------------------- part 1 -------------------------- 

        console.log("Result 1: " + result1);

        //-------------------------- part 2 -------------------------- 


        console.log("Result 2: " + result2);

        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });