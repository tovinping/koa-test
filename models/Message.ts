import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number

  @Column({unique: true})
  msgId: string

  @Column()
  conversationId: string

  @Column()
  content: string

  @Column()
  size: number // 文件大小 || 语音、视频长度

  @Column()
  type: '0' | '1' | '2' | '3' | '4' // 0文本1图片2视频3语音4文件

  @Column()
  timestamp: number;

  @Column()
  senderId: string

  @Column()
  receiveId: string

  @Column()
  clientId: string

  @Column()
  state: '0' | '1' | '2'; // 0: 正常 1: 删除 2: 撤回

}
