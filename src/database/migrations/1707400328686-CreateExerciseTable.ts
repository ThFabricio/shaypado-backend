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
                        name: "title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "video_url",
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
                        name: "time",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "end_exercise",
                        type: "boolean",
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
