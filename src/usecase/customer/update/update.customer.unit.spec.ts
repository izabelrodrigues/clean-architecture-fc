import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Unit Test update customer use case", () => {

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    const MockRepository = () => {
        return {
            find: jest.fn().mockReturnValue(Promise.resolve(customer)),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
    };

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);


        const input = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                city: "City 1",
                number: 1234,
                zip: "Zipcode 1",
            }
        }

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    })

});