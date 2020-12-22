const fs = require("fs");
const { getrandomstring } = require("./string");
const { slugify } = require("./slugify");
async function saveThis(file, type) {
  let name = getrandomstring(30);
  let sampleName = getrandomstring(30);
  let n = slugify(file.name);

  let dir;
  if (type === "file") {
    dir = __dirname + "/../data/files/" + name + n;
  }
  if (type === "cover") {
    dir = __dirname + "/../data/covers/" + name + n;
  }
  let save = await fs.writeFile(dir, file.data, err => {
    if (err) {
      console.log(err);

      return { error: err };
    } else {
      console.log("file saved with name ", name + n);

      return { url: name + n, sample_url: sampleName };
    }
  });

  return { url: name + n, sample_url: sampleName };
}
module.exports = { saveThis };
