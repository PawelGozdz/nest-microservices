import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { TestLoggerModule } from '@app/testing';
import { ServiceNameEnum, DepartmentsCommandPatternEnum } from '@app/microservices';
import { DepartmentFindManyHandler } from './department-find-many.handler';
import { DepartmentFindManyCommand } from './department-find-many.command';
import { IDepartment } from '@app/ddd';
import { of } from 'rxjs';

describe('DepartmentFindManyHandler', () => {
  let handler: DepartmentFindManyHandler;
  let clientProxyMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = createMock();

    const app = await Test.createTestingModule({
      imports: [TestLoggerModule.forRoot()],
      providers: [
        DepartmentFindManyHandler,
        {
          provide: ServiceNameEnum.DEPARTMENTS,
          useValue: clientProxyMock,
        },
      ],
    }).compile();

    handler = app.get(DepartmentFindManyHandler);
  });

  it('should send event', () => {
    // Arrange
    const commandName = {
      cmd: DepartmentsCommandPatternEnum.DEPARTMENT_FIND_MANY,
    };
    const command = new DepartmentFindManyCommand();

    // Act
    handler.findMany(command);

    // Assert
    expect(clientProxyMock.send).toHaveBeenCalledWith(commandName, command);
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });

  it('should return multiple department data', (done) => {
    // Arrange
    const id = '0ed9d105-d215-41b5-849d-15b8ff6d12c6';
    const name = 'HR';

    const department: IDepartment = {
      id,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    clientProxyMock.send.mockReturnValue(of([department]));
    const command = new DepartmentFindManyCommand();

    // Act
    const cut = handler.findMany(command);

    cut.subscribe({
      next(value) {
        // Assert
        expect(value).toStrictEqual([department]);
        done();
      },
    });
    expect(clientProxyMock.send).toBeCalledTimes(1);
  });
});
