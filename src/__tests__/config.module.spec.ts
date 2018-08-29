import { Test } from '@nestjs/testing';
import * as path from 'path';
import { ConfigModule, ConfigService } from '../index';
import { Injectable } from '@nestjs/common';
import { ConfigParam, Configurable } from '../decorators';

describe('Config Nest Module', () => {
  it('Will boot nest-config modoule succesfully', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.load(path.resolve(__dirname, '__stubs__', '**/*.ts')),
      ],
    }).compile();

    const configService = module.get<ConfigService>(ConfigService);

    expect(configService.get('config.server')).toBeTruthy();
    expect(configService.get('config.stub')).toBeTruthy();
  });

  it('Will boot without glob', async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.load()],
    }).compile();

    const configService = module.get<ConfigService>(ConfigService);

    expect(configService).toBeInstanceOf(ConfigService);
  });

  it('Will Setup Modules with its Components', async () => {
    @Injectable()
    class ComponentTest {
      constructor() {}

      @Configurable()
      testConfig(@ConfigParam('config.server') configKey: string) {
        return configKey;
      }
    }

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.load(path.resolve(__dirname, '__stubs__', '**/*.ts')),
      ],
      providers: [ComponentTest],
    }).compile();
    const componentTest = module.get<ComponentTest>(ComponentTest);
    expect(componentTest.testConfig(null)).toEqual({ port: 2000 });
  });

  it('ConfigParam decorator default value', async () => {
    @Injectable()
    class ComponentTest {
      constructor() {}

      @Configurable()
      testConfig(
        @ConfigParam('config.doesntexists', 'test123')
        configKey: string,
      ) {
        return configKey;
      }
    }

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.load(path.resolve(__dirname, '__stubs__', '**/*.ts')),
      ],
      providers: [ComponentTest],
    }).compile();
    const componentTest = module.get<ComponentTest>(ComponentTest);
    expect(componentTest.testConfig(null)).toEqual('test123');
  });
});
