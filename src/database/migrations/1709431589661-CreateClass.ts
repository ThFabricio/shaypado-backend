import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClass1709431589661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "class",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "days_of_week",
                        type: "boolean",
                        isArray: true, 
                        isNullable: false
                    },
                    {
                        name: "start_time",
                        type: "time",
                        isNullable: false
                    },
                    {
                        name: "end_time",
                        type: "time",
                        isNullable: false
                    },
                    {
                        name: "workout_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "friends_code",
                        type: "varchar",
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
                        name: "FKFriendshipCode", 
                        referencedTableName: "users",
                        referencedColumnNames: ["friendship_code"],
                        columnNames: ["friendship_code"], 
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("class");
    }

}
