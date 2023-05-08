import { Test } from '@nestjs/testing';
import { DepartmentCreateHandler } from './department-create.handler';
import { DepartmentCreateCommand } from './department-create.command';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { createMock } from '@golevelup/ts-jest';
import { ServiceNameEnum, DepartmentsCommandPatternEnum } from '@app/microservices';
import { of, throwError } from 'rxjs';

describe('DepartmentCreateHandler', () => {
  let handler: DepartmentCreateHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        DepartmentCreateHandler,
        {
          provide: ServiceNameEnum.DEPARTMENTS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(DepartmentCreateHandler);
  });

  it('should send event', () => {
    // Arrange
    const name = 'Finance';

    const commandName = {
      cmd: DepartmentsCommandPatternEnum.DEPARTMENT_CREATE,
    };
    const command = new DepartmentCreateCommand({
      name,
    });

    // Act
    handler.create(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should create department and return id', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const name = 'Finance';
    clientProxyMock.send.mockReturnValue(of({ id }));

    const command = new DepartmentCreateCommand({ name });

    // Act
    const cut = handler.create(command);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toStrictEqual({ id });
        done();
      },
    });
  });

  it('should throw 409 if user exists for given email', (done) => {
    // Arrange
    const error = { statusCode: 409, message: 'Conflict' };
    clientProxyMock.send.mockReturnValue(throwError(error));

    const name = 'HR';

    const command = new DepartmentCreateCommand({ name });

    // Act
    const cut = handler.create(command);

    cut.subscribe({
      error(err) {
        expect(err).toStrictEqual(error);
        done();
      },
    });
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
