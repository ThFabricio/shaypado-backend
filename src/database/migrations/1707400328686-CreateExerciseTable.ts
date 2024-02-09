import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExerciseTable1707400328686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "exercise",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "series",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "repetitions",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "calories",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exercise");
    }

}
