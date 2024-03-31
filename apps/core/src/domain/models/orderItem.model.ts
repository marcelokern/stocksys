import { Product } from './product.model';

export class OrderItem {
	public productId: string;
	public product: Product;
	public quantity: number;
}
