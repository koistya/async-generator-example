const data = [1,2,3,4,5,6,7];

async function* next() {
  let offset = 0;
  let batch;

  do {
    batch = await data.slice(offset, offset + 3);
    for (const val of batch) {
      offset++;
      yield val;
    }
  } while (batch.length);
}

(async () => {
  // await Promise.map(next(), val => {
  //   console.log(val);
  // });

  for await (const val of next()) {
    console.log(val);
  }
})().catch(console.error);
