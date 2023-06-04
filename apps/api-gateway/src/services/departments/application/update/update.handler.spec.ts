import { Test } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { createMock } from '@golevelup/ts-jest';
import { DepartmentsCommandPatternEnum, ServiceNameEnum } from '@app/microservices';
import { of, throwError } from 'rxjs';
import { IDepartment } from '@app/ddd';
import { DepartmentUpdateHandler } from './update.handler';
import { DepartmentUpdateCommand } from './update.command';

describe('DepartmentUpdateHandler', () => {
  let handler: DepartmentUpdateHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        DepartmentUpdateHandler,
        {
          provide: ServiceNameEnum.DEPARTMENTS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(DepartmentUpdateHandler);
  });

  it('should send event', () => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const name = 'IT';

    const commandName = {
      cmd: DepartmentsCommandPatternEnum.DEPARTMENT_UPDATE,
    };
    const command = new DepartmentUpdateCommand({
      id,
      name,
    });

    // Act
    handler.execute(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should update department name', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const name = 'IT';
    const updatedName = 'Finance';
    const updatedAt = new Date();
    const createdAt = new Date();

    const department: IDepartment = {
      id,
      name,
      updatedAt,
      createdAt,
    };
    clientProxyMock.send.mockReturnValue(of(void 0));

    const command = new DepartmentUpdateCommand({
      id,
      name: updatedName,
    });

    // Act
    const cut = handler.execute(command);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toBeUndefined();
        done();
      },
    });
  });

  it('should throw 404 if no department for given id', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const name = 'IT';

    const error = { statusCode: 404, message: 'Department Not Found' };
    clientProxyMock.send.mockReturnValue(throwError(error));

    const command = new DepartmentUpdateCommand({ id, name });

    // Act
    const cut = handler.execute(command);

    cut.subscribe({
      error(err) {
        expect(err).toStrictEqual(error);
        done();
      },
    }),
      expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
