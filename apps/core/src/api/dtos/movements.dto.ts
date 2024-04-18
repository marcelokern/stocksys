import { MovementType } from '../../domain/models/movement.model';

export class ListMovementDto {
	public id: string;
	public description: string;
	public date: Date;
	public productCode: string;
	public productDescription: string;
	public productMeasureUnit: string;
	public quantity: number;
	public type: MovementType;
	public userId: string;
	public userName: string;
}

export class CreateMovementDto {
	public productId: string;
	public description: string;
	public date: Date;
	public quantity: number;
	public type: MovementType;
}
