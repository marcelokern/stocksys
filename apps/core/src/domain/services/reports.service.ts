import { inject, injectable } from 'tsyringe';
import { ErrorMapper } from '../../infra/cross/errorMapper';
import { Report, HistoryReport, CurrentPositionReport, ProjectionReport } from '../models/report.model';
import { IMovementsRepository } from '../../infra/repositories/movements.repository';
import { IProductsRepository } from '../../infra/repositories/products.repository';
import { Movement, MovementType } from '../models/movement.model';
import { Product } from '../models/product.model';

export interface IReportsService {
	generateHistoryReport(startDate: Date, endDate: Date, products: string[]): Promise<Report<HistoryReport>>;
	generateCurrentPositionReport(products: string[], onlyCriticalItems: boolean): Promise<Report<CurrentPositionReport>>;
	generateProjectionReport(startDate: Date, endDate: Date, onlyCriticalItems: boolean, products: string[]): Promise<Report<ProjectionReport>>;
}

@injectable()
export class ReportsService implements IReportsService {

	private readonly movementsRepository: IMovementsRepository;
	private readonly productsRepository: IProductsRepository;

	constructor(
		@inject('MovementsRepository') movementsRepository: IMovementsRepository,
		@inject('ProductsRepository') productsRepository: IProductsRepository,
	) {
		this.movementsRepository = movementsRepository;
		this.productsRepository = productsRepository;
	}

	async generateHistoryReport(startDate: Date, endDate: Date, productsIds: string[]): Promise<Report<HistoryReport>> {

		try {

			const report = new Report<HistoryReport>;

			report.startDate = new Date(startDate);
			report.endDate = new Date(endDate);
			report.totalDays = Math.floor((report.endDate.getTime() - report.startDate.getTime()) / (1000 * 60 * 60 * 24));
			report.generatedDate = new Date();

			const movements: Movement[] = await this.movementsRepository.list({ productsIds });

			report.reportData = movements.map(item => {

				const reportItem = new HistoryReport();

				reportItem.movement = item;

				return reportItem

			})


			return report;

		} catch (error: any) {

			throw new ErrorMapper('REPORT_ERROR');

		}

	}

	async generateCurrentPositionReport(productsIds: string[], onlyCriticalItems: boolean): Promise<Report<CurrentPositionReport>> {

		try {

			const report = new Report<CurrentPositionReport>;

			report.generatedDate = new Date();

			const products: Product[] = await this.productsRepository.list({ productsIds, onlyCriticalItems });

			report.reportData = products.map(item => {

				const reportItem = new CurrentPositionReport();

				reportItem.product = item;
				reportItem.isMissing = item.balance <= 0;
				reportItem.isUnderSafetyStock = item.balance < item.safetyStock;

				return reportItem;

			})

			return report;

		} catch (error: any) {

			throw new ErrorMapper('REPORT_ERROR');

		}

	}

	async generateProjectionReport(startDate: Date, endDate: Date, onlyCriticalItems: boolean, productsIds: string[]): Promise<Report<ProjectionReport>> {

		try {

			const report = new Report<ProjectionReport>;

			report.startDate = new Date(startDate);
			report.endDate = new Date(endDate);
			report.totalDays = Math.floor((report.endDate.getTime() - report.startDate.getTime()) / (1000 * 60 * 60 * 24));
			report.generatedDate = new Date();

			const products = await this.productsRepository.list({ productsIds });
			const consumptionByProduct = await this.movementsRepository.summarize(MovementType.OUT, { productsIds });

			report.reportData = products.map(item => {

				const reportItem = new ProjectionReport();

				reportItem.product = item;
				reportItem.averageConsumption = (consumptionByProduct[item.id] || 0) / report.totalDays;
				reportItem.daysToSafetyStock = item.balance - item.safetyStock <= 0 ? 0 : (item.balance - item.safetyStock) / reportItem.averageConsumption;
				reportItem.daysToFinish = item.balance / reportItem.averageConsumption;
				reportItem.safetyStockBeforeRepositionTime = reportItem.daysToSafetyStock < item.repositionTime;
				reportItem.endsBeforeRepositionTime = reportItem.daysToFinish < item.repositionTime;

				return reportItem;

			})

			if (onlyCriticalItems) report.reportData = report.reportData.filter(x => x.endsBeforeRepositionTime || x.safetyStockBeforeRepositionTime);

			return report;

		} catch (error: any) {

			throw new ErrorMapper('REPORT_ERROR');

		}

	}

}