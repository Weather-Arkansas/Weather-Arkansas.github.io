<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Almondscript Runner</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
        }
        textarea {
            width: 100%;
            height: 200px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #218838;
        }
        #output {
            margin-top: 20px;
            padding: 10px;
            background-color: #e9ecef;
            border-radius: 4px;
            white-space: pre-wrap; /* Preserves whitespace */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Almondscript Runner</h1>
        <textarea id="almondscript-input" placeholder="Type your Almondscript here..."></textarea>
        <button id="run-button">Run Almondscript</button>
        <div id="output"></div>
    </div>
    <script>
        document.getElementById("run-button").addEventListener("click", function() {
            const input = document.getElementById("almondscript-input").value;
            const outputDiv = document.getElementById("output");
            outputDiv.textContent = ""; // Clear previous output

            try {
                const output = runAlmondscript(input);
                outputDiv.textContent = `Output:\n${output}`;
            } catch (error) {
                outputDiv.textContent = `Error: ${error.message}`;
            }
        });

        // A simple Almondscript interpreter
        function runAlmondscript(script) {
            const lines = script.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith("#"));
            const variables = {};
            let output = "";

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                if (line.startsWith("let")) {
                    // Variable declaration
                    const [varName, value] = line.slice(4).split('=').map(part => part.trim());
                    variables[varName] = eval(value.replace(/\b(\w+)\b/g, (match) => variables[match] !== undefined ? variables[match] : match));
                } else if (line.startsWith("print")) {
                    // Print statement
                    const content = line.slice(6, -2).trim(); // Extract content between parentheses
                    output += `${eval(content.replace(/\b(\w+)\b/g, (match) => variables[match] !== undefined ? variables[match] : match))}\n`;
                } else if (line.startsWith("if")) {
                    // If statement
                    const condition = line.slice(2).trim(); // Get the condition after "if"
                    const endIfIndex = findEndIfIndex(lines, i);
                    if (eval(condition.replace(/\b(\w+)\b/g, (match) => variables[match] !== undefined ? variables[match] : match))) {
                        output += processIfBlock(lines, i + 1, endIfIndex, variables);
                    }
                    i = endIfIndex; // Skip to the end of the if block
                }
            }

            return output;
        }

        // Helper functions for control flow
        function findEndIfIndex(lines, startIndex) {
            for (let i = startIndex; i < lines.length; i++) {
                if (lines[i].startsWith('end') && lines[i].includes('"if"')) {
                    return i;
                }
            }
            throw new Error("No matching 'end' for 'if'.");
        }

        function processIfBlock(lines, startIndex, endIndex, variables) {
            let blockOutput = "";
            for (let i = startIndex; i < endIndex; i++) {
                const line = lines[i];
                if (line.startsWith("print")) {
                    const content = line.slice(6, -2);
                    blockOutput += `${eval(content.replace(/\b(\w+)\b/g, (match) => variables[match] !== undefined ? variables[match] : match))}\n`;
                }
            }
            return blockOutput;
        }
    </script>
</body>
</html>
