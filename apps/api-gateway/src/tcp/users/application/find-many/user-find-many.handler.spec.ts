import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { ServiceNameEnum, UsersCommandPatternEnum } from '@app/microservices';
import { of } from 'rxjs';
import { UserFindManyHandler } from './user-find-many.handler';
import { UserFindManyCommand } from './user-find-many.command';
import { IUser } from '@app/ddd';

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
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';

    const commandName = {
      cmd: UsersCommandPatternEnum.USER_FIND_MANY,
    };
    const command = new UserFindManyCommand({});

    // Act
    handler.findMany({});

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should return multiple user data', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const email = 'test@test.com';
    const username = 'IamGroot';
    const user: IUser = {
      id,
      email,
      username,
    };
    clientProxyMock.send.mockReturnValue(of([user]));

    // Act
    const cut = handler.findMany({});

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toStrictEqual([user]);
        done();
      },
    });
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should throw 404 if no user for given id', (done) => {
    // Arrange

    clientProxyMock.send.mockReturnValue(of([]));

    // Act
    const cut = handler.findMany({});

    cut.subscribe({
      next(data) {
        expect(data).toStrictEqual([]);
        done();
      },
    }),
      expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
