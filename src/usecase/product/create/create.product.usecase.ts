import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProtuctDto, OutputCreateProductDto } from "./create.produt.dto";

export default class ProductCreateUseCase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }


    async execute(input: InputCreateProtuctDto): Promise<OutputCreateProductDto> {

        const productInterface = ProductFactory.create(input.type, input.name, input.price);

        const product = new Product(productInterface.id, productInterface.name, productInterface.price);

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }

    }

}