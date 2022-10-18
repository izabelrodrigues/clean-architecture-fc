import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product-model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product-repository";
import ProductCreateUseCase from "./create.product.usecase";

describe("Integration Test create product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {

        const productRepository = new ProductRepository();

        const productUseCase = new ProductCreateUseCase(productRepository);

        const input = {
            type: "a",
            name: "Product a",
            price: 17.0
        }

        const output = await productUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });


    });

    it("should throw a error - product type invalid", async () => {
        const productRepository = new ProductRepository();

        const productUseCase = new ProductCreateUseCase(productRepository);

        const input = {
            type: "c",
            name: "Product c",
            price: 17.0
        }

        expect(() => {
            return productUseCase.execute(input);
        }).rejects.toThrow("Product type not supported");
    });

})