import { MigrationInterface, QueryRunner } from "typeorm";

export class categoryToType1710779286967 implements MigrationInterface {
    name = 'categoryToType1710779286967';

    // 이 부분에서 수정.
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
        'ALTER TABLE `mentions` RENAME COLUMN `category` TO `type`',
        )
    }

    // 이 부분에서 롤백
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `mentions` RENAME COLUMN `type` TO `category`',
            )
    }

}
