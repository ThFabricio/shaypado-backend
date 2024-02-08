import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExerciseWorkoutTypeTable1707400774987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "exercise_workout_type",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "exercise_id",
                        type: "uuid",
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
                        name: "FKExercise",
                        referencedTableName: "exercise",
                        referencedColumnNames: ["id"],
                        columnNames: ["exercise_id"],
                    },
                    {
                        name: "FKWorkoutType",
                        referencedTableName: "workout_type",
                        referencedColumnNames: ["id"],
                        columnNames: ["workout_type_id"],
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exercise_workout_type");
    }

}
