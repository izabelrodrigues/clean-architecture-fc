import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Unit Test list customer use case", () => {

    const customer1 = CustomerFactory.createWithAddress("Customer 01", new Address("street_1", 1, "zip_1", "city_1"));

    const customer2 = CustomerFactory.createWithAddress("Customer 02", new Address("street_2", 2, "zip_2", "city_2"));

    const MockRepository = () => {
        return {
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
            create: jest.fn(),
            update: jest.fn(),
        };
    };



    it("should list a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});

        const list = output.customers;
        expect(list.length).toBe(2);

        expect(list[0].id).toBe(customer1.id);
        expect(list[0].name).toBe(customer1.name);
        expect(list[0].address.street).toBe(customer1.address.street);
        expect(list[0].address.number).toBe(customer1.address.number);
        expect(list[0].address.zip).toBe(customer1.address.zip);
        expect(list[0].address.city).toBe(customer1.address.city);

        expect(list[1].id).toBe(customer2.id);
        expect(list[1].name).toBe(customer2.name);
        expect(list[1].address.street).toBe(customer2.address.street);
        expect(list[1].address.number).toBe(customer2.address.number);
        expect(list[1].address.zip).toBe(customer2.address.zip);
        expect(list[1].address.city).toBe(customer2.address.city);

    })


});