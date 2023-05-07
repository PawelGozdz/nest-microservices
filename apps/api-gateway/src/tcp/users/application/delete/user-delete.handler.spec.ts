import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { UserDeleteHandler } from './user-delete.handler';
import { UserDeleteCommand } from './user-delete.command';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';

describe('UserDeleteHandler', () => {
  let handler: UserDeleteHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        UserDeleteHandler,
        {
          provide: ServiceNameEnum.USERS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(UserDeleteHandler);
  });

  it('should send event', () => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const departmentId = 'd4fa4040-610d-4637-a3d4-b3b28f0eaa37';

    const commandName = {
      cmd: UsersCommandPatternEnum.USER_DELETE,
    };
    const command = new UserDeleteCommand({ id, departmentId });

    // Act
    handler.delete(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should return void', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const departmentId = 'd4fa4040-610d-4637-a3d4-b3b28f0eaa37';

    clientProxyMock.send.mockReturnValue(of(void 0));
    const command = new UserDeleteCommand({ id, departmentId });

    // Act
    const cut = handler.delete(command);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toBeUndefined();
        done();
      },
    });
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should throw 404 if no user for given id', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const error = { statusCode: 404, message: 'User Not Found' };
    const departmentId = 'd4fa4040-610d-4637-a3d4-b3b28f0eaa37';

    clientProxyMock.send.mockReturnValue(throwError(error));
    const command = new UserDeleteCommand({ id, departmentId });

    // Act
    const cut = handler.delete(command);

    cut.subscribe({
      error(err) {
        expect(err).toStrictEqual(error);
        done();
      },
    }),
      expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
