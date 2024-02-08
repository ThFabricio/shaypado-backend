import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1707177932270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "userType",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "weigth",
                        type: "varchar"
                    },
                    {
                        name: "height",
                        type: "varchar"
                    },
                    {
                        name: "workoutDays",
                        type: "varchar"
                    },
                    {
                        name: "any_disease",
                        type: "varchar"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
