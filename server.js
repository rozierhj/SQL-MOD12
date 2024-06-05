const readline = require('readline');

// Create an interface to read data from the process.stdin
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});

// Function to run when the Enter key is pressed
function onEnterKeyPress() {
    console.log('Enter key pressed. Running the function...');
    // Your custom function logic here
}

// Listen for the Enter key press
rl.on('line', (input) => {
    if (input.trim() === '') {
        onEnterKeyPress();
    }
});

// Prompt the user to press Enter
console.log('Press Enter to run the function:');
