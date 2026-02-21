import Jimp from 'jimp';

async function main() {
  const inputPath = 'public/images/grill-amenidades.png';
  const image = await Jimp.read(inputPath);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (_x, _y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0;
    }
  });

  await image.writeAsync(inputPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
