// Importations nécessaires avec CommonJS
const request = require("supertest");
const app = require("../backend/server"); // Assurez-vous que cela pointe vers votre fichier serveur correctement configuré
let server;

beforeAll((done) => {
  server = app.listen(5001, () => {
    console.log("Server is running on port 5001");
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log("Server closed!");
    done();
  });
});

describe("API Tests", () => {
  it("GET /contacts - should return all contacts", async () => {
    const response = await request(app).get("/contacts");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("POST /contacts - should create a new contact", async () => {
    const newContact = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    };

    const response = await request(app).post("/contacts").send(newContact);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newContact);
  });
});
