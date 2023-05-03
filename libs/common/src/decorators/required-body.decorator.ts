import { Body } from '@nestjs/common';
import { RequireNotEmptyBodyPipe } from '@app/common';

export const RequiredBody = (): ParameterDecorator => {
  return Body(RequireNotEmptyBodyPipe);
};
