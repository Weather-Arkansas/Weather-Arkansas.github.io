const keywordMap = {
    'while': 'while',
    'if': 'if',
    'for': 'for',
    'let': 'let',
    'function': 'function',
    'True': 'true',
    'False': 'false',
    'and': '&&',
    'or': '||',
    'not': '!',
    'else': 'else',
    'return': 'return',
    'elif': 'else if',
    'input': 'await getUserInput',
    'print': 'printToOutput',
    'interval': 'setInterval',
    'list': 'Array.from',
    'push': '.push',
    'try': 'try',
    'catch': 'catch',
    'Infinity': 'Infinity',
    'end': '',
};

// Function to simulate user input with a prompt
function getUserInput(promptMessage) {
    return new Promise((resolve) => {
        const input = prompt(promptMessage);
        resolve(input);
    });
}

// Function to print text to the output textbox
function printToOutput(text) {
    const outputDiv = document.getElementById('output');
    outputDiv.value += text + '\n'; // Append text to the textbox
}

// Translation logic
async function translateCode(code) {
    const lines = code.split('\n');
    let translatedLines = [];
    let blockCount = 0; // To track block openings

    for (let line of lines) {
        line = line.trim();

        // Handle comments
        if (line.startsWith('#')) {
            translatedLines.push('// ' + line.slice(1).trim());
            continue;
        }

        // Handle block start
        if (line.endsWith(':')) {
            line = line.slice(0, -1) + ' {';
            blockCount++; // Increment block count
        }

        // Replace keywords based on the keywordMap
        for (const [almondKeyword, jsEquivalent] of Object.entries(keywordMap)) {
            const regex = new RegExp(`\\b${almondKeyword}\\b`, 'g');
            line = line.replace(regex, jsEquivalent);
        }

        // Handle list creation
        line = line.replace(/let\s+(\w+)\s*=\s*list\(([^)]*)\)/g, 'let $1 = [$2];');

        // Handle input syntax
        line = line.replace(/await getUserInput\s*\("([^"]*)"\)/g, 'await getUserInput("$1")');

        // Handle the 'end' keyword
        if (line === 'end') {
            line = '}';
            blockCount--; // Decrement block count
        }

        // Add semicolon to the end of the line
        if (line && line !== '}') {
            line += ';';
        }

        translatedLines.push(line);
    }

    // Check for unmatched blocks
    if (blockCount > 0) {
        throw new Error('Unmatched block start (missing "end")');
    }

    return translatedLines.join('\n');
}

async function runCode() {
    const codeInput = document.getElementById('codeInput').value;
    const outputDiv = document.getElementById('output');

    try {
        const translatedCode = await translateCode(codeInput);
        outputDiv.value = ''; // Clear output before running new code
        
        await eval(`(async () => { ${translatedCode} })();`);
    } catch (error) {
        outputDiv.value += `Error on line ${getLineNumber(codeInput, error)}: ${error.message}\n`;
    }
}

// Function to get line number from error
function getLineNumber(code, error) {
    // This is a simple way; consider more robust methods based on error object
    const lines = code.split('\n');
    return lines.findIndex(line => line.includes(error.message)) + 1; // Adjust as needed
}


// Event listener for the run button
document.getElementById('runButton').addEventListener('click', runCode);
