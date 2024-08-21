import request from "supertest";
import app from "../../src/app";
describe("POST /auth/register", () => {
    describe("Given all fileds", () => {
        it("Should return 201 status", async () => {
            const userData = {
                firstName: "Hamza",
                lastName: "khan",
                email: "expamle@gmail.com",
                password: "secret",
            };
            const reponse = await request(app)
                .post("/auth/register")
                .send(userData);
            expect(reponse.statusCode).toBe(201);
        });
        it("should return valid json format", async () => {
            const userData = {
                firstName: "Hamza",
                lastName: "khan",
                email: "expamle@gmail.com",
                password: "secret",
            };
            const reponse = await request(app)
                .post("/auth/register")
                .send(userData);
            expect(reponse.headers["content-type"]).toEqual(
                expect.stringContaining("json"),
            );
        });
    });
    describe("Fields are missing", () => {});
});
