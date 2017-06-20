# Unique Name Generator
> Helper functions to generate unique Business Names using a local memory store to prevent duplicates

## Install
``` bash
$ git clone https://github.com/agm1984/uniqueNameGenerator.git
$ cd uniqueNameGenerator
```

For first time use, examine words.txt and ensure it contains suitable words.
If generating random Business Names, delete memoryStore

Open randomWords.js and edit the Dictionary File and Memory Store File if desired:
``` bash
// Define Word Dictionary
const sampleFile = './words.txt';

// Define Memory Store
const businessMemory = './used_business_names.log';
```

## Usage Example
// Generate 100 unique Business Names with length up to 2 words each
generateUniqueBusinessName(2, 100, businessMemory, sampleFile);

Script is not designed for exporting, at this time.

It is used for internal-use for load testing large numbers of fake Business Names.

EOF
