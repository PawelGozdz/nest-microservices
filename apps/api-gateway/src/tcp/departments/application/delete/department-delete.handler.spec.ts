import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { DepartmentDeleteHandler } from './department-delete.handler';
import { DepartmentDeleteCommand } from './department-delete.command';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { DepartmentsCommandPatternEnum, ServiceNameEnum } from '@app/microservices';

describe('DepartmentDeleteHandler', () => {
  let handler: DepartmentDeleteHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        DepartmentDeleteHandler,
        {
          provide: ServiceNameEnum.DEPARTMENTS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(DepartmentDeleteHandler);
  });

  it('should send event', () => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';

    const commandName = {
      cmd: DepartmentsCommandPatternEnum.DEPARTMENT_DELETE,
    };
    const command = new DepartmentDeleteCommand({ id });

    // Act
    handler.delete(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should return void', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';

    clientProxyMock.send.mockReturnValue(of(void 0));
    const command = new DepartmentDeleteCommand({ id });

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

  it('should throw 404 if no department for given id', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const error = { statusCode: 404, message: 'Department Not Found' };

    clientProxyMock.send.mockReturnValue(throwError(error));
    const command = new DepartmentDeleteCommand({ id });

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
