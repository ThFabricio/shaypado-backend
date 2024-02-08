import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWorkoutTable1707339003194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "workout",
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
                        name: "start_hour",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "end_hour",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "day",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "workout_type_id",
                        type: "uuid",
                        isNullable: false
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKWorkoutType",
                        referencedTableName: "workout_type",
                        referencedColumnNames: ["id"],
                        columnNames: ["workout_type_id"],
                    }
                ]

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("workout");
    }

}
