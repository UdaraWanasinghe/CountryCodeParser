const papa = require("papaparse");
const fs = require("fs");

const stream = fs.createReadStream("./source/codes.csv");
const data = {};
papa.parse(stream, {
  complete: function (results, file) {
    results.data.forEach((v) => {
      try {
        const d = v[2].split(" / ");
        data[`${v[0]}${d[0]}${d[1]}${v[1]}`] = [v[0], d[0], d[1], v[1]];
      } catch (e) {
        console.log(e);
      }
    });
    try {
      fs.writeFile("./output.json", JSON.stringify(data), ()=>{
          console.log('finished');
          
      });
    } catch (e) {
      console.log(e);
    }
  },
});
