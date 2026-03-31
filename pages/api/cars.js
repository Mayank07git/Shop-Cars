import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // 1. Find the exact path to our 'data/cars.json' file using Node's path module.
  // 'process.cwd()' gets the current working directory of the project.
  const filePath = path.join(process.cwd(), 'data', 'cars.json');

  // 2. Read the file. It comes back as a raw text string.
  const fileData = fs.readFileSync(filePath, 'utf8');

  // 3. Convert that raw text string into a real JavaScript array
  const carsData = JSON.parse(fileData);

  // 4. Send the data back to whoever requested it with a 200 (Success) status code!
  res.status(200).json(carsData);
}
