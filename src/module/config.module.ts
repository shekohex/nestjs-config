import 'reflect-metadata';
import { DynamicModule, Module, Global } from '@nestjs/common';
import {
  Module as NestModule,
  ComponentMetatype,
} from '@nestjs/core/injector/module';
import { ConfigService } from './config.service';
import { DotenvOptions } from 'dotenv';

@Global()
@Module({})
export class ConfigModule {
  /**
   * From Glob
   * @param glob
   * @param {DotenvOptions} options
   * @returns {DynamicModule}
   */
  static load(glob?: string, options?: DotenvOptions): DynamicModule {
    const configProvider = {
      provide: ConfigService,
      useFactory: async (): Promise<ConfigService> => {
        return ConfigService.load(glob, options);
      },
    };
    return {
      module: ConfigModule,
      providers: [configProvider],
      exports: [configProvider],
    };
  }
}
