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

        function runAlmondscript(script) {
            // Translate Almondscript to JavaScript using regex
            script = script
                .replace(/#.*$/gm, '') // Remove comments
                .replace(/let\s+(\w+)\s*=\s*(.*);/g, 'let $1 = $2;') // Translate let
                .replace(/print\((.*)\);/g, 'console.log($1);') // Translate print
                .replace(/if\s+(.+)\s*{/g, 'if ($1) {') // Translate if statement
                .replace(/end\("if"\);/g, '}'); // Translate end("if")

            // Create an output variable to capture logs
            let output = "";
            const originalConsoleLog = console.log;

            // Override console.log to capture output
            console.log = function (message) {
                output += message + "\n";
                originalConsoleLog.apply(console, arguments);
            };

            // Evaluate the translated script
            eval(script);

            // Restore original console.log
            console.log = originalConsoleLog;

            return output;
        }
    </script>
</body>
</html>
