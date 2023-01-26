const { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH, HASING_ALGORITHM, HASING_ENCODING } = require("./constants");

const { createHash } = require("crypto");

const deterministicPartitionKey = (event) => {
  let candidate;
  if (event && typeof event === "object" && Object.keys(event).length > 0) {
    if (event.partitionKey) {
      candidate = 
      event.partitionKey.length < MAX_PARTITION_KEY_LENGTH ?
      event.partitionKey :
      createHash(HASING_ALGORITHM)
      .update(JSON.stringify(event))
      .digest(HASING_ENCODING);
    } else {
      candidate = createHash(HASING_ALGORITHM)
                  .update(JSON.stringify(event))
                  .digest(HASING_ENCODING);
    }
    candidate = candidate.toString();
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  return candidate;
};

module.exports = {
  deterministicPartitionKey,
};