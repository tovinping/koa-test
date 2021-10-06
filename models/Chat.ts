import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number
  // 会话id(群id|对方帐号)
  @Column({unique: true})
  chatId: string
  // 创建会话人的帐号
  @Column()
  owner: string;
  // 0单聊1群聊天
  @Column({default: '0'})
  type: '0' | '1'
  // 最后一条消息ID
  @Column({default: ''})
  lastMsgId: string;
  // 1置顶0不置顶
  @Column({default: '0'})
  topState: '0' | '1';
}
