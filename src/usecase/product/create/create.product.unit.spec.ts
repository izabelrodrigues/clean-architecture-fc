import ProductCreateUseCase from "./create.product.usecase";

describe("Unit Test create product use case", () => {

    const MockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
    };


    it("should create a product", async () => {

        const productRepository = MockRepository();
        const productUseCase = new ProductCreateUseCase(productRepository);

        const input = {
            type: "a",
            name: "Product 01",
            price: 10.0
        }

        const output = await productUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });

    });

    it("Should thrown an error when name is missing", async () => {
        //preparacao
        const productRepository = MockRepository();
        const productUseCase = new ProductCreateUseCase(productRepository);

        const input = {
            type: "a",
            name: "",
            price: 10.0
        }

        //execucao/validacao
        expect(() => {
            return productUseCase.execute(input);
        }).rejects.toThrow("Name is required");

    });

    it("Should thrown an error when price is missing", async () => {
        //preparacao
        const productRepository = MockRepository();
        const productUseCase = new ProductCreateUseCase(productRepository);
        const input = {
            type: "a",
            name: "Product 01",
            price: 0.0
        }

        //execucao/validacao
        expect(() => {
            return productUseCase.execute(input);
        }).rejects.toThrow("Price must be greater than zero");

    });
})