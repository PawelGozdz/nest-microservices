import { Test } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { createMock } from '@golevelup/ts-jest';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { of, throwError } from 'rxjs';
import { IUser } from '@app/ddd';
import { UserUpdateHandler } from './user-update.handler';
import { UserUpdateCommand } from './user-update.command';

describe('UserUpdateHandler', () => {
  let handler: UserUpdateHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        UserUpdateHandler,
        {
          provide: ServiceNameEnum.USERS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(UserUpdateHandler);
  });

  it('should send event', () => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const email = 'my@test.com';
    const username = 'My-username';

    const commandName = {
      cmd: UsersCommandPatternEnum.USER_UPDATE,
    };
    const command = new UserUpdateCommand({
      id,
      email,
      username,
    });

    // Act
    handler.update(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should update user email', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const email = 'my@test.com';
    const username = 'My-username';
    const updatedEmail = 'updated-email@test.com';
    const user: IUser = { id, email, username };
    clientProxyMock.send.mockReturnValue(of({ ...user, email: updatedEmail }));

    const command = new UserUpdateCommand({ email, username, id });

    // Act
    const cut = handler.update(command);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toEqual({
          id,
          username,
          email: updatedEmail,
        });
        done();
      },
    });
  });

  it('should throw 404 if no user for given id', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const email = 'my@test.com';
    const username = 'My-username';
    const error = { statusCode: 404, message: 'User Not Found' };
    clientProxyMock.send.mockReturnValue(throwError(error));

    const command = new UserUpdateCommand({ email, username, id });

    // Act
    const cut = handler.update(command);

    cut.subscribe({
      error(err) {
        expect(err).toStrictEqual(error);
        done();
      },
    }),
      expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
