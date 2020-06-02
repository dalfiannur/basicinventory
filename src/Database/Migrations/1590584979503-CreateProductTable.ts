import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductTable1590584979503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'Products',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'stock',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'current_timestamp'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        });

        await queryRunner.createTable(table);
        return queryRunner.query("insert into Products(name, stock) values (?,?)", [
            'Product Tester 1', 10
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropTable('Products', true);
    }

}
