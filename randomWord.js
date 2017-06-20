const fs = require('fs');

/**
 * Random Word, String, and Business Name Generators
 *
 * For first time use, examine words.txt and ensure it contains suitable words.
 * If generating random Business Names, delete memoryStore
 */

/**
 * Return one random word from sampleFile
 *
 * @param relativeFilePath     {String}     Relative Path to sampleFile that contains words
 * @returns                    {String}     Random word from sampleFile
 */

function getOneRandomWord(relativeFilePath) {
    try {
        // Read file and get single words (separated by spaces)
        const text = fs.readFileSync(relativeFilePath, 'utf8');
        let words = text.split(/\s/);

        // Map words into an array and trim whitespace
        words = words.map(word => {
            return word.trim();
        });

        // Filter garbage content out
        words = words.filter(word => {
            return word.length > 0;
        });

        // Strip non-alphanumeric garbage and return picked word
        return words[Math.floor(Math.random() * words.length)].replace(/\W/g, '');
    } catch (error) {
        throw new Error('getOneRandomWord: Error generating random word. ' + error);
    }

};

/**
 * Generate one random Business Name
 *
 * @param maxNameLength     {Integer}  Maximum number of words to use for each Business Name
 * @param dictionaryFile    {String}   Relative Path to dictionaryFile that contains words
 * @returns                 {String}   Random Business Name from dictionaryFile
 */

function generateOneBusinessName(maxNameLength, dictionaryFile) {
    // Method to uppercase first letter of each word
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() });
    };

    try {
        // String together random words from faker.js library
        const wordsToUse = Math.floor(Math.random() * maxNameLength) + 1;
        let businessName = '';
        for (i = 0; i < wordsToUse; i++) {
            //businessName += ' ' + faker.random.word();
            businessName += ' ' + getOneRandomWord(dictionaryFile);
        };

        return toTitleCase(businessName.trim());
    } catch (error) {
        throw new Error('generateOneBusinessName: Error generating random Business Name. ' + error);
    };

};

/**
 * Generate specified number of unique Business Names from a Dictionary File
 *
 * @param maxNameLength   {Integer}   Maximum Business Name length (number of words)
 * @param amount          {Integer}   Number of unique Business Names to generate
 * @param memoryStore     {String}    Relative path to Memory Store File
 * @param sampleFile      {String}    Relative path to Word Dictionary File
 * @returns               {String}    Unique Business Name
 */

function generateUniqueBusinessName(maxNameLength, amount, memoryStore, sampleFile) {
    try {
        // Generate specified number of Business Names
        // and add each new one to the memoryStore to ensure it is unique
        for (var i = 0; i < amount; i++) {
            let prospectBusinessName = generateOneBusinessName(maxNameLength, sampleFile);

            // Skip duplicate check if output file doesnt exist
            if (fs.existsSync(memoryStore)) {
                let checkForDuplicates = fs.readFileSync(memoryStore, 'utf8');
                // If generated Business Name is a duplicate, generate a new one and continue
                if (checkForDuplicates.indexOf(prospectBusinessName) !== -1) {
                    console.log('WARN: ' + (i+1) + ' DUPLICATE FOUND: (' + prospectBusinessName + ') Creating another...')
                    i--;
                } else {
                    fs.appendFileSync(memoryStore, prospectBusinessName + '\n');
                    console.log('INFO: ' + (i+1) + '/' + amount + ' Check passed, adding valid Business: ' + prospectBusinessName);
                };
            } else {
                // Create memory store if it doesn't exist
                console.log('INFO: ' + memoryStore + ' does not exist. Creating it...');
                fs.appendFileSync(memoryStore, prospectBusinessName + '\n');
                console.log('INFO: ' + (i+1) + '/' + amount + ' Check passed, adding valid Business: ' + prospectBusinessName);
            };
        };
    }catch (error) {
        throw new Error('generateUniqueBusinessName: Error generating random unique Business Names. ' + error);
    };

};

// Define Word Dictionary
const sampleFile = './words.txt';

// Define Memory Store
const businessMemory = './used_business_names.log';

// Generate 100 unique Business Names with length up to 2 words each
generateUniqueBusinessName(2, 100, businessMemory, sampleFile);
