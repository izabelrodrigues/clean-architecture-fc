import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase";

describe("Unit Test find product use case", () => {

    const product = new Product("1", "product_01", 15.0);

    const MockRepository = () => {
        return {
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
    };


    it("should find a product", async () => {

        const productRepository = MockRepository();
        const productUseCase = new FindProductUseCase(productRepository);

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