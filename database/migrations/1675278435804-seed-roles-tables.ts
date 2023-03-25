import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role, RoleTypes } from '../../libs/services/common/src';

export class seedRolesTables1675278435804 implements MigrationInterface {
    name = 'seedRolesTables1675278435804';

    private _roles: Partial<Role>[] = [
        {
            id: '56b04d04-b6f6-4997-9abb-bf608a2efb3e',
            deletedAt: null,
            name: RoleTypes.ROOT,
            claims: null
        },
        {
            id: 'a2d8fbb3-281e-431f-9228-e2fa9e5267f3',
            deletedAt: null,
            name: RoleTypes.ADMIN,
            claims: null
        },
        {
            id: '71cde4d8-db76-41cd-8944-b9529efe38bb',
            deletedAt: null,
            name: RoleTypes.USER,
            claims: null
        }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            this._roles.map(role => 
                queryRunner.manager.create<Role>(Role, role))
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM app_role`);
    }
}
