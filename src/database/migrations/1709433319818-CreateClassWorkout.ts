import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClassWorkout1709433319818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "class_workout",
                columns: [
                    {
                        name: "class_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "workout_id",
                        type: "uuid",
                        isNullable: false
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKClass",
                        referencedTableName: "class",
                        referencedColumnNames: ["id"],
                        columnNames: ["class_id"],
                    },
                    {
                        name: "FKWorkout",
                        referencedTableName: "workout",
                        referencedColumnNames: ["id"],
                        columnNames: ["workout_id"],
                    }
                ],
            })
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("workout_exercise");
    }
}
