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
    const departmentId = 'd4fa4040-610d-4637-a3d4-b3b28f0eaa37';

    const commandName = {
      cmd: UsersCommandPatternEnum.USER_UPDATE,
    };
    const command = new UserUpdateCommand({
      id,
      email,
      username,
      departmentId,
    });

    // Act
    handler.update(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should update user email and departmentId', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const email = 'my@test.com';
    const username = 'My-username';
    const updatedEmail = 'updated-email@test.com';
    const departmentId = 'd4fa4040-610d-4637-a3d4-b3b28f0eaa37';
    const updatedDepartmentId = 'd4fa4040-610d-4637-a3d4-000000000000';
    const updatedAt = new Date();
    const createdAt = new Date();

    const user: IUser = {
      id,
      email,
      username,
      departmentId,
      updatedAt,
      createdAt,
    };
    clientProxyMock.send.mockReturnValue(of(void 0));

    const command = new UserUpdateCommand({
      email,
      username,
      id,
      departmentId,
      updatedDepartmentId,
    });

    // Act
    const cut = handler.update(command);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toBeUndefined();
        done();
      },
    });
  });

  it('should throw 404 if no user for given id', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const email = 'my@test.com';
    const username = 'My-username';
    const departmentId = 'd4fa4040-610d-4637-a3d4-b3b28f0eaa37';

    const error = { statusCode: 404, message: 'User Not Found' };
    clientProxyMock.send.mockReturnValue(throwError(error));

    const command = new UserUpdateCommand({ email, username, id, departmentId });

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
