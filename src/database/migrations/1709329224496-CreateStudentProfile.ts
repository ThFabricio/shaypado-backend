import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudentProfile1709329224496 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "student_profile",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: "fat_percentage",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "arm_circumference",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "waist_circumference",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "abdomen_circumference",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "hip_circumference",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "thigh_circumference",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "leg_circumference",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "height",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "weight",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "age",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "shoulder_circumference",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "triceps_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "biceps_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "chest_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "axial_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "suprailiac_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "abdominal_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "thigh_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "leg_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "health_issue",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "scapular_fold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "objective",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "exercise_experience",
                        type: "boolean",
                        isNullable: false, // campo obrigatório
                    },
                    {
                        name: "spine_problem",
                        type: "boolean",
                        isNullable: false, // campo obrigatório
                    },
                    {
                        name: "is_smoker",
                        type: "boolean",
                        isNullable: false, // campo obrigatório
                    },
                ],
            }),
            true // Passa 'true' para criar a tabela sem erros se ela já existir
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("student_profile");
    }
}
