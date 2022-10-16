import CustomerCreateUseCase from "./create.customer.usecase";

describe("Unit Test find customer use case", () => {

    const MockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
    };


    const input = {
        name: "Customer 02",
        address: {
            street: "Street 2",
            number: "02",
            zip: "Zip02",
            city: "City 02",
        },
    };


    it("should create a customer", async () => {
        //preparacao
        const customerRepository = MockRepository();
        const customerCreteUseCase = new CustomerCreateUseCase(customerRepository);


        //execucao

        const output = await customerCreteUseCase.execute(input);

        //validacao

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: Number(input.address.number),
                zip: input.address.zip,
                city: input.address.city,
            },
        });
    });

    it("Should thrown an error when name is missing", async () => {
        //preparacao
        const customerRepository = MockRepository();
        const customerCreteUseCase = new CustomerCreateUseCase(customerRepository);
        input.name = "";

        //execucao/validacao
        expect(() => {
            return customerCreteUseCase.execute(input);
        }).rejects.toThrow("Name is required");

    });


});