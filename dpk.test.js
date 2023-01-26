const { deterministicPartitionKey } = require("./dpk");
const { createHash } = require("crypto");
const { TRIVIAL_PARTITION_KEY, HASING_ALGORITHM, HASING_ENCODING, MAX_PARTITION_KEY_LENGTH } = require("./constants");

describe("deterministicPartitionKey", () => {
  it("Returns TRIVIAL_PARTITION_KEY when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });
  it("Returns TRIVIAL_PARTITION_KEY when given an empty object", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });
  it("Returns TRIVIAL_PARTITION_KEY when given an empty string", () => {
    const trivialKey = deterministicPartitionKey("");
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });
  it("Returns TRIVIAL_PARTITION_KEY when given an empty array", () => {
    const trivialKey = deterministicPartitionKey([]);
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });
  it("Returns TRIVIAL_PARTITION_KEY when given a number", () => {
    const trivialKey = deterministicPartitionKey(1);
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the hash when given an object but no partitionKey field provided", () => {
    const data = {
      foo: "bar",
    };
    const expected = createHash(HASING_ALGORITHM).update(JSON.stringify(data)).digest(HASING_ENCODING).toString();
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(expected);
  });

  it("Returns the same partitionKey when given an object with a partitionKey field with partitionKey.length < MAX_PARTITION_KEY_LENGTH", () => {
    const data = {
      partitionKey: "foo",
    };
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe("foo");
  });
  it("Returns the hash when given an object with a partitionKey field with partitionKey.length > MAX_PARTITION_KEY_LENGTH", () => {
    const data = {
      partitionKey: "foo".repeat(MAX_PARTITION_KEY_LENGTH + 1),
    }
    const expected = createHash(HASING_ALGORITHM).update(JSON.stringify(data)).digest(HASING_ENCODING).toString();
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(expected);
  });
});


