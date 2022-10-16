import { UUID } from "sequelize/types";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustormerDto } from "./create.customer.dto";

export default class CustomerCreateUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustormerDto> {

        const number = Number(input.address.number)
        const customer = CustomerFactory.createWithAddress(input.name, new Address(

            input.address.street,
            number,
            input.address.zip,
            input.address.city
        ));

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city
            },
        }

    }
}