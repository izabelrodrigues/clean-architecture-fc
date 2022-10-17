import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

describe("Unit Test list product use case", () => {

    const product1 = ProductFactory.create("a", "prod_1", 10);
    const product2 = ProductFactory.create("a", "prod_2", 20);

    const MockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
            create: jest.fn(),
            update: jest.fn(),
        };
    }

    it("should list products", async () => {
        const productRepository = MockRepository();
        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        const list = output.products;

        expect(list.length).toBe(2);

        expect(list[0].id).toBe(product1.id);
        expect(list[0].name).toBe(product1.name);
        expect(list[0].price).toBe(product1.price);

        expect(list[1].id).toBe(product2.id);
        expect(list[1].name).toBe(product2.name);
        expect(list[1].price).toBe(product2.price);

    });

});