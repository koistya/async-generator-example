const Promise = require('bluebird'); // v3.5.5
const data = [1, 2, 3, 4, 5, 6, 7];

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

  console.log('---');
  console.log('for await (const val of next()) { ... }\n');

  for await (const val of next()) {
    console.log(val);
  }

  console.log('---');
  console.log('Promise.map(Array.from({ length }), () => { ... })\n');
  
  const iterator = next();
  await Promise.map(Array.from({ length: data.length }), async () => {
    const { value } = await iterator.next();
    console.log(value);
  }, { concurrency: 2 });

})().catch(console.error);
