export function readFileAsText (file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function(event) {
      resolve(event.target.result)
    }

    try {
      reader.readAsText(file);
    } catch (err) {
      reject(err)
    }
  })
}