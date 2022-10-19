import request from "supertest";
import { app, sequelize } from "../config/express";


describe("E2E for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const response = await request(app).post("/customers")
            .send({
                name: "John",
                address: {
                    street: "Street_01",
                    city: "City_01",
                    number: 123,
                    zip: "Zip_01",
                }
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street_01");
        expect(response.body.address.city).toBe("City_01");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("Zip_01");
    });


});