import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustormerDto, OutputUpdateCustormerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }


    async execute(input: InputUpdateCustormerDto): Promise<OutputUpdateCustormerDto> {

        const customerDb = await this.customerRepository.find(input.id);
        customerDb.changeName(input.name);
        customerDb.changeAddress(
            new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city
            )
        );

        await this.customerRepository.update(customerDb);

        return {
            id: customerDb.id,
            name: customerDb.name,
            address: {
                street: customerDb.address.street,
                number: customerDb.address.number,
                zip: customerDb.address.zip,
                city: customerDb.address.city,

            }
        };

    }

}