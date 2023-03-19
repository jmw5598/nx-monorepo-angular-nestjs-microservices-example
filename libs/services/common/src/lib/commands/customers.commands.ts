import { MessagePatternCommand } from '../models/message-pattern-command.model';

export const findAllCustomersCommand: MessagePatternCommand<void> = {
  cmd: 'find-all'
} as MessagePatternCommand<void>;
