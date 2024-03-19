import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChannelChats } from './ChannelChats';
import { ChannelMembers } from './ChannelMembers';
import { Users } from './Users';
import { Workspaces } from './Workspaces';

@Index('WorkspaceId', ['WorkspaceId'], {})
@Entity({ schema: 'sleact' })
export class Channels {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', length: 30 })
    name: string;

    @Column('tinyint', {
        name: 'private',
        nullable: true,
        width: 1,
        default: () => "'0'",
    })
    private: boolean | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('int', { name: 'WorkspaceId', nullable: true })
    WorkspaceId: number | null;

    @OneToMany(() => ChannelChats, (channelchats) => channelchats.Channel)
    ChannelChats: ChannelChats[];

    @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.Channel, {
        cascade: ['insert'],
    })
    ChannelMembers: ChannelMembers[];

    @ManyToMany(() => Users, (users) => users.Channels)
    Members: Users[];

    // 이러한 방식으로 지정이 되어 있음. 워크스페이스와의 관계
    @ManyToOne(() => Workspaces, (workspaces) => workspaces.Channels, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    // 조인 컬럼은 한군데에 작성 하지만 보통 foreign key 가 있는 곳에 작성이 된다.
    @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
    Workspace: Workspaces;
}
