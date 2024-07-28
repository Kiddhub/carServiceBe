import { Account } from '../../../account/entities/account.entity';
import { Session } from '../../../session/entities/session.entity';

export type JwtPayloadType = Pick<Account, 'id' | 'phone'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
