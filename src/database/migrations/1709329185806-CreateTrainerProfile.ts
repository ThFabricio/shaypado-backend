import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTrainerProfile1709329185806 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: "trainer_profile",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: "full_name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "contact_email",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "contact_phone",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "specialties",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "age",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "state",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "city",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "work_location",
                    type: "varchar",
                    isNullable: true 
                },
                {
                    name: "profilePicture",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "plansDocument",
                    type: "varchar",
                    isNullable: true
                },
            ],
        })
    );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("trainer_profile");
}
}