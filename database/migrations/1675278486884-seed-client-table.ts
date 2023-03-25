import { MigrationInterface, QueryRunner } from 'typeorm';

import { 
    Client, 
    Role, 
    ADMIN_CLIENT_IDENTIFIER, 
    PUBLIC_CLIENT_IDENTIFIER, 
    ROOT_CLIENT_IDENTIFIER } from '../../libs/services/common/src';

export class seedClientTable1675278486884 implements MigrationInterface {
    name = 'seedClientTable1675278486884';

    private _roles: Partial<Client>[] = [
        {
            indentifier: ROOT_CLIENT_IDENTIFIER,
            name: 'Root Client',
            requiredRoles: [{ id: '56b04d04-b6f6-4997-9abb-bf608a2efb3e' } as Role],
        },
        {
            indentifier: ADMIN_CLIENT_IDENTIFIER,
            name: 'Admin Client',
            requiredRoles: [{ id: 'a2d8fbb3-281e-431f-9228-e2fa9e5267f3' } as Role],
        },
        {
            indentifier: PUBLIC_CLIENT_IDENTIFIER,
            name: 'User Client',
            requiredRoles: [{ id: '71cde4d8-db76-41cd-8944-b9529efe38bb' } as Role]
        },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            this._roles.map(client => 
                queryRunner.manager.create<Client>(Client, client))
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM app_client`);
    }
}
