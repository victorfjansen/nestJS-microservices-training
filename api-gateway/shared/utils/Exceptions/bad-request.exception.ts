import { RpcException } from '@nestjs/microservices';

export const BadRequestException = (msg: string) => {
  throw new RpcException(msg);
};
