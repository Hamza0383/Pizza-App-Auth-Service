import request from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { User } from "../../src/entity/User";
import { AppDataSource } from "../../src/config/data-source";
import { truncateTables } from "../utils";
describe("POST /auth/register", () => {
    let connection: DataSource;
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });
    beforeEach(async () => {
        //Database Truncate
        await truncateTables(connection);
    });
    afterAll(async () => {
        await connection.destroy();
    });
    describe("Given all fileds", () => {
        it("Should return 201 status", async () => {
            //Arrange
            const userData = {
                firstName: "Hamza",
                lastName: "khan",
                email: "expamle@gmail.com",
                password: "secret",
            };
            //Act
            const reponse = await request(app)
                .post("/auth/register")
                .send(userData);
            //Assert
            expect(reponse.statusCode).toBe(201);
        });
        it("should return valid json format", async () => {
            //Arrange
            const userData = {
                firstName: "Hamza",
                lastName: "khan",
                email: "expamle@gmail.com",
                password: "secret",
            };
            //Act
            const reponse = await request(app)
                .post("/auth/register")
                .send(userData);
            //Assert
            expect(reponse.headers["content-type"]).toEqual(
                expect.stringContaining("json"),
            );
        });
        it("should presist in the database", async () => {
            //Arrange
            const userData = {
                firstName: "Hamza",
                lastName: "khan",
                email: "expamle@gmail.com",
                password: "secret",
            };
            //Act
            const reponse = await request(app)
                .post("/auth/register")
                .send(userData);
            //Assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
        });
    });
    describe("Fields are missing", () => {});
});
