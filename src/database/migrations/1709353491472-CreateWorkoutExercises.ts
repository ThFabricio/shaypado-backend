import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWorkoutExercises1709353491472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "workout_exercise",
                columns: [
                    {
                        name: "workout_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "exercise_id",
                        type: "uuid",
                        isNullable: false
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKWorkout",
                        referencedTableName: "workout",
                        referencedColumnNames: ["id"],
                        columnNames: ["workout_id"],
                    },
                    {
                        name: "FKExercise",
                        referencedTableName: "exercise",
                        referencedColumnNames: ["id"],
                        columnNames: ["exercise_id"],
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("workout_exercise");
    }

}
