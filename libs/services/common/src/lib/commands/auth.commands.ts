import { MessagePatternCommand } from '../models/message-pattern-command.model';

export const validateUserCommand: MessagePatternCommand<void> = {
  cmd: 'validate-user'
} as MessagePatternCommand<void>;

export const signInCommand: MessagePatternCommand<void> = {
  cmd: 'sign-in'
} as MessagePatternCommand<void>;

export const refreshTokenCommand: MessagePatternCommand<void> = {
  cmd: 'refresh-token'
} as MessagePatternCommand<void>;
