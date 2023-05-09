import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { UserFindManyHandler } from './find-many.handler';
import { UserFindManyCommand } from './find-many.command';
import { IUser } from '@app/ddd';
import { of } from 'rxjs';

describe('UserFindManyHandler', () => {
  let handler: UserFindManyHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        UserFindManyHandler,
        {
          provide: ServiceNameEnum.USERS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(UserFindManyHandler);
  });

  it('should send event', () => {
    // Arrange
    const departmentId = 'd4fa4040-610d-4637-a3d4-b3b28f0eaa37';

    const commandName = {
      cmd: UsersCommandPatternEnum.USER_FIND_MANY,
    };
    const command = new UserFindManyCommand({ departmentId });

    // Act
    handler.execute(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should return multiple user data', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const email = 'test@test.com';
    const username = 'IamGroot';
    const departmentId = 'd4fa4040-610d-4637-a3d4-b3b28f0eaa37';

    const user: IUser = {
      id,
      email,
      username,
      departmentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    clientProxyMock.send.mockReturnValue(of([user]));
    const command = new UserFindManyCommand({ departmentId });

    // Act
    const cut = handler.execute(command);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toStrictEqual([user]);
        done();
      },
    });
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
