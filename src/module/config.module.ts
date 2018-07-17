import { DynamicModule, Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { DotenvOptions } from 'dotenv';
import ConfigRegisterProvider from './config.register.provider';

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
      useFactory: async (): Promise<any> => {
        return ConfigService.load(glob, options);
      },
    };

    return {
      module: ConfigModule,
      providers: [configProvider, ConfigRegisterProvider],
      exports: [configProvider],
    };
  }
}
