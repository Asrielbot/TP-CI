const request = require("supertest");
const app = require("../backend/server");
let server;

beforeAll((done) => {
  server = app.listen(5001, () => {
    console.log("Test server running on port 5001");
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log("Test server closed");
    done();
  });
});

describe("API Tests", () => {
  it("GET /contacts - should return all contacts", async () => {
    const response = await request(server).get("/contacts");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("POST /contacts - should create a new contact", async () => {
    const newContact = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    };

    const response = await request(server).post("/contacts").send(newContact);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newContact);
  });
});
