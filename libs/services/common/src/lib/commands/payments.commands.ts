import { MessagePatternCommand } from '../models/message-pattern-command.model';

export const findAllPaymentsCommand: MessagePatternCommand<void> = {
  cmd: 'find-all'
} as MessagePatternCommand<void>;
