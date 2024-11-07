const fs = require('fs');

function parseSBV(data) {
    const entries = [];
    const lines = data.split('\n');
    let entry = {};

    lines.forEach(line => {
        const timeMatch = line.match(/^(\d{2}):(\d{2}):(\d{2}\.\d{3}),(\d{2}):(\d{2}):(\d{2}\.\d{3})$/);
        if (timeMatch) {
            entry = {
                start: `${timeMatch[1]}:${timeMatch[2]}:${timeMatch[3]}`, // start time
                end: `${timeMatch[4]}:${timeMatch[5]}:${timeMatch[6]}`,   // end time
                text: ""
            };
        } else if (line.trim() === '') {
            if (entry.text) {
                entries.push(entry);
                entry = {};
            }
        } else if (entry.start) {
            entry.text += line + '\n';
        }
    });

    // Ensure to add the last entry if there is text
    if (entry.text) entries.push(entry);

    return entries;
}

function parseSBVFromFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return callback(err, null);
        const parsedData = parseSBV(data);
        callback(null, parsedData);
    });
}

// Make sure to export the function correctly
module.exports = { parseSBVFromFile };
