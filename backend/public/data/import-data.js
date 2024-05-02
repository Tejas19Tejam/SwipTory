const fs = require("fs");

const stories = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../data/data-stories.json`,
    "utf-8",
    (err, data) => {
      if (err) return err;
      return data;
    }
  )
);
