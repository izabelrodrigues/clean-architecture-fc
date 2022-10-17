import UpdateProductUseCase from "./update.product.usercase";

describe("Unit Test update product use case", () => {

    const product = {
        id: "01",
        name: "Product 01",
        price: 10.0
    }

    const MockRepository = () => {
        return {
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
    };

    it("should update a product name", async () => {

        const productRepository = MockRepository();
        const productUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: "01",
            name: "Product 001",
            price: 10.0
        }

        const output = await productUseCase.execute(input);

        expect(output).toEqual(input);

    });

})