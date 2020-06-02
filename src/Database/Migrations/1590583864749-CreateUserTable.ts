import {MigrationInterface, QueryRunner, Table, Timestamp} from "typeorm";
import {genSaltSync, hashSync} from "bcrypt";

export class CreateUserTable1590583864749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'Users',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar'
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

        return queryRunner.query('insert into Users (id, name, username, password) values(?,?,?,?);', [
            1, 'Qia', 'qisk', hashSync('1sampai8', genSaltSync())
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropTable('Users', true);
    }

}
