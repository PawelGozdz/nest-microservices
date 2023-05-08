import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { IDepartment } from '@app/ddd';
import { DepartmentsCommandPatternEnum, ServiceNameEnum } from '@app/microservices';
import { of, throwError } from 'rxjs';
import { DepartmentFindOneHandler } from './department-find-one.handler';
import { DepartmentFindOneCommand } from './department-find-one.command';

describe('DepartmentFindOneHandler', () => {
  let handler: DepartmentFindOneHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        DepartmentFindOneHandler,
        {
          provide: ServiceNameEnum.DEPARTMENTS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(DepartmentFindOneHandler);
  });

  it('should send event', () => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';

    const commandName = {
      cmd: DepartmentsCommandPatternEnum.DEPARTMENT_FIND_ONE,
    };
    const command = new DepartmentFindOneCommand({ id });

    // Act
    handler.findOne(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should return department data', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const name = 'IT';

    const department: IDepartment = {
      id,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    clientProxyMock.send.mockReturnValue(of(department));
    const command = new DepartmentFindOneCommand({ id });

    // Act
    const cut = handler.findOne(command);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toStrictEqual(department);
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
    const command = new DepartmentFindOneCommand({ id });

    // Act
    const cut = handler.findOne(command);

    cut.subscribe({
      error(err) {
        expect(err).toStrictEqual(error);
        done();
      },
    }),
      expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
