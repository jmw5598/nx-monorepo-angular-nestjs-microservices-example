import { User } from '../../entities';

export interface ChatMessage {
  sentOn: Date,
  sentBy: User,
  message: string,
};
