function fCreateTable(dbConn) {
  const sQuery = `
                    CREATE TABLE IF NOT EXISTS books(
                        id int NOT NULL auto_increment primary key,
                        name VARCHAR(25) NOT NULL,
                        pages int,
                        price float
                    );
                    `;

  dbConn.commit(sQuery, (err) => {
    err ? console.log("COMM_DB: ERROR:", err) : null; //console.log("COMM_DB: Table created successfully.");
  });
}

function fAddSampleData(dbConn) {
  const mySqlData = [
    "INSERT IGNORE INTO books VALUES (1,'A Song of Ice and Fire', 1658, 159.99);",
    "INSERT IGNORE INTO books VALUES (2,'The Davinci Code', 485, 33.15);",
    "INSERT IGNORE INTO books (id, name, pages, price) VALUES (3,'Guide of the Galaxy', 685, 44.44);",
    "INSERT IGNORE INTO books (id, name, pages, price) VALUES (4,'Wildcards', 258, 25.88);",
    // Insert with PK automatic generation:
    // "INSERT IGNORE INTO books (name, pages, price) VALUES ('Silmarillion', 282, 25.85);",
    // "INSERT IGNORE INTO books (name, pages, price) VALUES ('Kraken. The Legend', 333, 33.33);",
  ];
  mySqlData.forEach((item, i) => {
    dbConn.commit(item, (err) => {
      err
        ? console.log(`COMM_DB: Error inserting line #${i + 1}. ERR: ${err}`)
        : null; //console.log(`COMM_DB: Success inserting line #${i + 1}`);
    });
  });
}

module.exports = {
  fCreateTable,
  fAddSampleData,
};
