import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product-model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product-repository";
import UpdateProductUseCase from "./update.product.usercase";

describe("Integration Test update product use case", () => {

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

    it("should update a product", async () => {

        const productRepository = new ProductRepository();
        const productUseCase = new UpdateProductUseCase(productRepository);
        const product1 = new Product("1", "product_01", 15.0);

        await productRepository.create(product1);

        const input = {
            id: "1",
            name: "product_001",
            price: 16.0
        }

        const result = await productUseCase.execute(input);

        expect(result).toEqual(input);

    })

})