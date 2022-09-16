import {DataSource} from "typeorm";
import {injectable} from "inversify";


@injectable()
export class DBService {
	public constructor(private readonly dataSource: DataSource) {}

	async connect(): Promise<DataSource> {
		return this.dataSource.initialize();
	}

}