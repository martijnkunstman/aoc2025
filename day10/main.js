
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

        //console.log(inputData);

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
        // console.log("Input data parsed.");
        // console.log(inputData);
        // console.log("Sequences:");
        // console.log(sequences);
        // console.log("Buttons:");
        // console.log(buttons);

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
            //console.log("Start with this sequense: " + startSequence);
            //console.log("Try to find this sequense: " + findSequence);

            //try all combinations of buttons... (naive approach)
            let maxCombinations = Math.pow(2, buttons[i].length);
            //console.log("Max combinations: " + maxCombinations);

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

        //ok here we go for part 2.....
        //what i do realise that there is a cap of each button and there is a cap op amounts of presses.
        //there is also a minimum amount of presses, let's do this and complare AOC after just solving dat 12....
        //HERE WE GO

        //we need the joltage numbers from the input...
        let joltageNumbers = [];
        inputData = data.split("\r\n");
        for (let i = 0; i < inputData.length; i++) {
            inputData[i] = inputData[i].split('{');
            joltageNumbers.push(inputData[i][1].split(',').map(x => x.replace('}', '')).map(Number));
        }
        //console.log("Joltage numbers:");
        //console.log(joltageNumbers);

        //console.log("buttons:");
        //console.log(buttons);

        //max amount presses is the sum of all joltage numbers
        let maxPresses = [];
        for (let i = 0; i < joltageNumbers.length; i++) {
            let sum = 0;
            for (let j = 0; j < joltageNumbers[i].length; j++) {
                sum += joltageNumbers[i][j];
            }
            maxPresses.push(sum);
        }

        //console.log("Max presses:");
        //console.log(maxPresses);

        let sovleThisObject = [];

        for (let i = 0; i < joltageNumbers.length; i++) {
            sovleThisObject.push({
                joltageNumbers: joltageNumbers[i],
                buttons: buttons[i],
                maxPresses: maxPresses[i]
            });
        }

        //findmaxpresse for every button....
        for (let i = 0; i < sovleThisObject.length; i++) {
            sovleThisObject[i].maxButtonPresses = [];
            //for every button check max presses
            for (let j = 0; j < sovleThisObject[i].buttons.length; j++) {
                let button = sovleThisObject[i].buttons[j];
                let maxPress = 10000;
                //find all joltage numbers that this button can press
                for (let k = 0; k < button.length; k++) {
                    let index = button[k];
                    if (sovleThisObject[i].joltageNumbers[index] < maxPress) {
                        maxPress = sovleThisObject[i].joltageNumbers[index];
                    }
                }
                sovleThisObject[i].maxButtonPresses.push(maxPress);
            }
            sovleThisObject[i].maxPresses = sovleThisObject[i].maxButtonPresses.reduce((a, b) => a + b, 0);
        }
        //i got data to work with now......  
        //console.log("Solve this object:");
        //console.log(sovleThisObject);

        //now we should be able to check results...
        for (let i = 0; i < sovleThisObject.length; i++) {
            //solve this number array
            let solveThis = sovleThisObject[i];
            console.log("solveThis:");
            console.log(solveThis);
            let minimumPresses = Math.max(...solveThis.joltageNumbers);
            let maximumPresses = solveThis.maxPresses;
            console.log("Minimum presses: " + minimumPresses);
            console.log("Maximum presses: " + maximumPresses);
            //-----
            console.log("Buttons:");
            console.log(sovleThisObject[i].buttons);
            console.log("Joltage numbers:");
            console.log(sovleThisObject[i].joltageNumbers);

            solvePuzzle(sovleThisObject[i].buttons, sovleThisObject[i].joltageNumbers);
        }
        //loop trhough all possible presses count from minimum to maximum and never more that maxbuttonpresses

        //...how to do this... ???? (is this matrix math? lets investigate a bit...)

        /* example

        buttons add one to every target counter they point to:
        [1, 2, 3, 4]
        [0, 2, 3, 4]
        [1, 2]
        [3, 4]
        [0, 4]
        [0, 1]
        target counters:
        [27, 23, 36, 29, 31]

        */

        console.log("Result 2: " + result2);

        //--------------------------- end ----------------------------
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });

///-------------------------- helpers --------------------------
class ButtonSolver {
    constructor(buttonDefinitions, targetValues) {
        // Convert simplified button arrays (e.g. [1,2] meaning indices) 
        // into full vectors (e.g. [0, 1, 1, 0, 0])
        this.numCounters = targetValues.length;
        this.buttons = buttonDefinitions.map(indices => {
            const vector = new Array(this.numCounters).fill(0);
            indices.forEach(index => {
                if (index < this.numCounters) vector[index] = 1;
            });
            return vector;
        });

        this.initialTargets = targetValues;
        this.minTotalPresses = Infinity;
        this.bestSolution = null;
    }

    solve() {
        this.minTotalPresses = Infinity;
        this.bestSolution = null;

        // Start the recursive search
        this.search(0, [...this.initialTargets], []);

        return {
            minPresses: this.minTotalPresses,
            solution: this.bestSolution
        };
    }

    /**
     * Recursive function to try combinations
     * @param {number} btnIdx - The index of the button we are currently deciding on
     * @param {number[]} currentTargets - The remaining values needed for each counter
     * @param {number[]} currentPresses - History of presses so far
     */
    search(btnIdx, currentTargets, currentPresses) {
        // 1. Pruning: If we've already exceeded the best known total, stop.
        // This makes the script MUCH faster.
        const currentTotal = currentPresses.reduce((a, b) => a + b, 0);
        if (currentTotal >= this.minTotalPresses) return;

        // 2. Base Case: No more buttons to check
        if (btnIdx === this.buttons.length) {
            // Check if all targets are exactly 0
            const allZero = currentTargets.every(val => val === 0);
            if (allZero) {
                this.minTotalPresses = currentTotal;
                this.bestSolution = [...currentPresses];
            }
            return;
        }

        // 3. Determine max possible presses for THIS button
        // If this button adds 1 to counter A, and counter A needs 5, 
        // we can't press this button more than 5 times.
        let maxPresses = Infinity;
        const effect = this.buttons[btnIdx];

        for (let c = 0; c < this.numCounters; c++) {
            if (effect[c] > 0) {
                // Floor ensures we don't go negative
                const limit = Math.floor(currentTargets[c] / effect[c]);
                if (limit < maxPresses) maxPresses = limit;
            }
        }

        // If a button affects nothing useful (all relevant targets are 0), max is 0
        if (maxPresses === Infinity) maxPresses = 0;

        // 4. Iterate: Try pressing this button 'p' times (from max down to 0)
        // We go specifically from High to Low because we want to maximize the use 
        // of earlier buttons (which usually hit more counters in these puzzles).
        for (let p = maxPresses; p >= 0; p--) {

            // Create new target array for the next step
            const nextTargets = currentTargets.map((val, c) => val - (effect[c] * p));

            this.search(btnIdx + 1, nextTargets, [...currentPresses, p]);
        }
    }
}

function solvePuzzle(buttonConfig, targetConfig) {

    // ==========================================
    // CONFIGURATION AREA
    // ==========================================

    // 1. Define which counters each button hits (0-based indices)

    /*
    const buttonConfig = [
        [1, 2, 3, 4], // Button 1 hits C1, C2, C3, C4
        [0, 2, 3, 4], // Button 2 hits C0, C2, C3, C4
        [1, 2],       // Button 3
        [3, 4],       // Button 4
        [0, 4],       // Button 5
        [0, 1]        // Button 6
    ];

    // 2. Define the target values for counters
    const targetConfig = [27, 23, 36, 29, 31];
    */

    // ==========================================
    // RUN THE SOLVER
    // ==========================================

    console.log("Searching for optimal solution...");
    const solver = new ButtonSolver(buttonConfig, targetConfig);
    const result = solver.solve();

    if (result.solution) {
        console.log(`\n✅ SOLVED! Minimum Total Presses: ${result.minPresses}`);
        console.log("-----------------------------------");
        result.solution.forEach((count, i) => {
            // Only print buttons we actually press
            if (count > 0) console.log(`Button ${i + 1}: ${count} presses`);
        });
    } else {
        console.log("\n❌ IMPOSSIBLE: No combination of buttons can reach these exact targets.");
    }
}