import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product-model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product-repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration Test find product use case", () => {

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

    it("should find a product", async () => {

        const productRepository = new ProductRepository();
        const productUseCase = new FindProductUseCase(productRepository);
        const product = new Product("1", "product_01", 15.0);

        await productRepository.create(product);

        const input = {
            id: "1",
        }

        const output = {
            id: "1",
            name: "product_01",
            price: 15.0
        }

        const result = await productUseCase.execute(input);

        expect(result).toEqual(output);


    })

})