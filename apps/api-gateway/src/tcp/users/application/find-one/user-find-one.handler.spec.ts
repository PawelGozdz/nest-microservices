import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { of, throwError } from 'rxjs';
import { UserFindOneHandler } from './user-find-one.handler';
import { UserFindOneCommand } from './user-find-one.command';
import { IUser } from '@app/ddd';

describe('UserFindOneHandler', () => {
  let handler: UserFindOneHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        UserFindOneHandler,
        {
          provide: ServiceNameEnum.USERS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(UserFindOneHandler);
  });

  it('should send event', () => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';

    const commandName = {
      cmd: UsersCommandPatternEnum.USER_FIND_ONE,
    };
    const command = new UserFindOneCommand({ id });

    // Act
    handler.findOne(id);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should return user data', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const email = 'test@test.com';
    const username = 'IamGroot';
    const user: IUser = {
      id,
      email,
      username,
    };
    clientProxyMock.send.mockReturnValue(of(user));

    // Act
    const cut = handler.findOne(id);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toStrictEqual(user);
        done();
      },
    });
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should throw 404 if no user for given id', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const error = { statusCode: 404, message: 'User Not Found' };
    clientProxyMock.send.mockReturnValue(throwError(error));

    // Act
    const cut = handler.findOne(id);

    cut.subscribe({
      error(err) {
        expect(err).toStrictEqual(error);
        done();
      },
    }),
      expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
