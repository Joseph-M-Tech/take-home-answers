

describe("deterministicPartitionKey", () => {
    it("should return the partition key if it is present", () => {
        const event = { partitionKey: "test" };
        const partitionKey = deterministicPartitionKey(event);
        expect(partitionKey).toEqual("test");
    });
