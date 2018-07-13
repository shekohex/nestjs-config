import { Test } from '@nestjs/testing';
import * as path from 'path';
import { ConfigModule, ConfigService } from '../index';
import { Injectable, Module } from '@nestjs/common';
import { ConfigParam } from '../decorators';

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

  describe('Will boot using decorator', async () => {

    @Injectable()
    class Provider {
      addParameter(@ConfigParam('config.server') server) {
        return server;
      }
    }

    @Module({})
    class TestModule {}

    const module = await Test.createTestingModule({
      imports: [ConfigModule.load(path.resolve(__dirname, '__stubs__', '**/*.ts')), Provider],
    }).compile();

    const injectedParameter = module.get<Provider>(Provider).addParameter();
    const parameter = module.get<ConfigService>(ConfigService).get('config.server');

    expect(injectedParameter).toBe(parameter);

  });
});
