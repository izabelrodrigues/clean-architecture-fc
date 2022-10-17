import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product-model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product-repository";
import FindProductUseCase from "../find/find.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Integration Test list product use case", () => {

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

    it("should find a product list", async () => {

        const productRepository = new ProductRepository();
        const productUseCase = new ListProductUseCase(productRepository);
        const product1 = new Product("1", "product_01", 15.0);
        const product2 = new Product("2", "product_02", 30.0);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const result = await productUseCase.execute({});

        const list = result.products;

        expect(list.length).toBe(2);

        expect(list[0].id).toBe(product1.id);
        expect(list[0].name).toBe(product1.name);
        expect(list[0].price).toBe(product1.price);

        expect(list[1].id).toBe(product2.id);
        expect(list[1].name).toBe(product2.name);
        expect(list[1].price).toBe(product2.price);

    })

})