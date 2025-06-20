import { ChatDevRemoteTransformersEmbeddings } from "../embedding/chatdev_remote_transformers.js";
import { jest, test, expect, beforeEach, afterEach } from "@jest/globals";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(
    JSON.stringify({ data: [{ embedding: [1, 2, 3] }] })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("Test ChatDev.main", async () => {
  expect(true).toBe(true);
});

test("Test ChatDev.embedQuery", async () => {
    const embeddings =  new ChatDevRemoteTransformersEmbeddings({
        Bearer: "dummy",
        batchSize: 512,
        model: "jina-embeddings-v2-base-en"
    });
    const res = await embeddings.embedQuery("Hello ChatDev IDE");
    expect(typeof res[0]).toBe("number");
});

test("Test ChatDev.embedDocuments", async () => {
    const embeddings =  new ChatDevRemoteTransformersEmbeddings({
        Bearer: "dummy",
        batchSize: 512,
        model: "jina-embeddings-v2-base-en"
    });
    const res = await embeddings.embedDocuments(["Hello ChatDev", "Bye bye"]);
    expect(res).toHaveLength(2);
    expect(typeof res[0][0]).toBe("number");
    expect(typeof res[1][0]).toBe("number");
});


test("Test ChatDev concurrency", async () => {
    const embeddings =  new ChatDevRemoteTransformersEmbeddings({
        Bearer: "dummy",
        batchSize: 512,
        model: "jina-embeddings-v2-base-en"
    });
    const res = await embeddings.embedDocuments([
        "Hello world",
        "Bye bye",
        "Hello ChatDev",
        "Bye bye",
        "Hello Panda",
        "Bye bye",
    ]);
    expect(res).toHaveLength(6);
    expect(res.find((embedding) => typeof embedding[0] !== "number")).toBe(
        undefined
    );
});
