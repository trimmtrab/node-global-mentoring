import csv from "csvtojson";
import fs from "fs";
import stream from "stream";

const CSV_FILE_PATH = "./csv/nodejs-hw1-ex1.csv";
const RES_FILE_PATH = "./task2.result.txt";

const readStream = fs.createReadStream(CSV_FILE_PATH);
const csvToJsonStream = csv();
const writeStream = fs.createWriteStream(RES_FILE_PATH, { flags: "w+" });

stream.pipeline(
  readStream,
  csvToJsonStream,
  writeStream, (err) => {
    if (err) {
      console.error(err);
    }
  }
);
