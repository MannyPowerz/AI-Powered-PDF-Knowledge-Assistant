const lancedb = require("@lancedb/lancedb");

const { DB_PATH, TABLE_NAME, TOP_K} = require('../config/constants');

const lanceStorage = async (embeddedData) => {
    const db = await lancedb.connect(DB_PATH)
    // Get all current table names to check for existence
    const tables = await db.tableNames();
    
    let table;

    if (tables.includes(TABLE_NAME)) {
        // Table already exists: Open it and APPEND the new data
        table = await db.openTable(TABLE_NAME);
        await table.add(embeddedData);
        console.log(`Appended ${embeddedData.length} rows to ${TABLE_NAME}`);
    } else {
        // Table doesn't exist: CREATE it with the initial data
        table = await db.createTable(TABLE_NAME, embeddedData);
        console.log(`Created new table: ${TABLE_NAME}`);
    }

    return { 
        rowsAdded: embeddedData.length, 
        table: TABLE_NAME 
    };
};

const searchVectors  = async (queryVector) => {
    const db = await lancedb.connect(DB_PATH);
    const tables = await db.tableNames();

    if (!tables.includes(TABLE_NAME)) {
        throw new Error('NO_PDF_UPLOADED');
    }

    const table = await db.openTable(TABLE_NAME);
    const results = await table.search(queryVector).limit(TOP_K).toArray();
    return results
}

module.exports = {lanceStorage, searchVectors };

