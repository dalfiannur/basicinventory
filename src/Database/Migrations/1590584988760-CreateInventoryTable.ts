import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateInventoryTable1590584988760 implements MigrationInterface {

    private foreignKeys: TableForeignKey[] = [
        new TableForeignKey({
            columnNames: ['createdById'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Users',
            onDelete: 'cascade'
        }),
        new TableForeignKey({
            columnNames: ['updatedById'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Users',
            onDelete: 'cascade'
        }),
        new TableForeignKey({
            columnNames: ['productId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Products',
            onDelete: 'cascade'
        })
    ]

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Inventories',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'createdById',
                    type: 'bigint'
                },
                {
                    name: 'updatedById',
                    type: 'bigint',
                    isNullable: true
                },
                {
                    name: 'productId',
                    type: 'bigint'
                },
                {
                    name: 'quantity',
                    type: 'int'
                },
                {
                    name: 'isOut',
                    type: 'boolean',
                    default: false
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
        }));

        await queryRunner.createForeignKeys('Inventories', this.foreignKeys);
        return queryRunner.query('insert into Inventories(createdById, productId, quantity, isOut) values(?,?,?,?)', [
            1, 1, 2, 1
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropTable('Inventories', true, true);
    }

}
