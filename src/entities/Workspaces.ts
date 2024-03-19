import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Channels } from './Channels';
import { DMs } from './DMs';
import { Mentions } from './Mentions';
import { WorkspaceMembers } from './WorkspaceMembers';
import { Users } from './Users';

@Index('name', ['name'], { unique: true })
@Index('url', ['url'], { unique: true })
@Index('OwnerId', ['OwnerId'], {})
@Entity({ schema: 'sleact', name: 'workspaces' }) // Entity 에서 Workspaces 가 테이블 명.
// DB 명은 sleact
export class Workspaces {
      // 이렇게 각 컬럼들 지정.
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', unique: true, length: 30 })
    name: string;

    @Column('varchar', { name: 'url', unique: true, length: 30 })
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @Column('int', { name: 'OwnerId', nullable: true })
    OwnerId: number | null;

    // 이 부분 부터는 각 테이블 간 관계 설정 부분.

    // 워크 스페이스 기준으로 채널과의 일 대 다 관계 지정.
    // 주의 할 부분으로 여기서 설정 했다면 채널 부분에서도 설정을 해주어야 함.
    @OneToMany(() => Channels, (channels) => channels.Workspace)
    Channels: Channels[];

    @OneToMany(() => DMs, (dms) => dms.Workspace)
    DMs: DMs[];

    @OneToMany(() => Mentions, (mentions) => mentions.Workspace)
    Mentions: Mentions[];

    @OneToMany(() => WorkspaceMembers, (workspacemembers) => workspacemembers.Workspace, { cascade: ['insert'] })
    WorkspaceMembers: WorkspaceMembers[];

    @ManyToOne(() => Users, (users) => users.Workspaces, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
    Owner: Users;

    @ManyToMany(() => Users, (users) => users.Workspaces)
    Members: Users[];
}
