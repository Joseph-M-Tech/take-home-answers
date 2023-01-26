// This approach for functional programming techniques and follows best practices for variable naming and function composition

const crypto = require("crypto");

const trivialPartitionKey = "0";
const maxPartitionKeyLength = 256;

const hash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

const getCandidate = (event) => {
    if (!event) return trivialPartitionKey;
    const { partitionKey } = event;
    return partitionKey || hash(JSON.stringify(event));
};

const checkLength = (key) => (key.length > maxPartitionKeyLength ? hash(key) : key);

const ensureString = (key) => (typeof key === 'string' ? key : JSON.stringify(key));

exports.deterministicPartitionKey = (event) => {
    let candidate = getCandidate(event);
    candidate = checkLength(candidate);
    return ensureString(candidate);
};
