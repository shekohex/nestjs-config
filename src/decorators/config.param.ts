import 'reflect-metadata';
import {
    CONFIG_PARAMETER_METADATA,
} from './../constants';

/**
 * Add reflect metadata to parameter 
 */
const ConfigParam = (parameter: string, def?: any): ParameterDecorator => (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    Reflect.defineMetadata(
        CONFIG_PARAMETER_METADATA, 
        {
            parameter,
            def,
        }, 
        target, 
        propertyKey,
    );
}

export default ConfigParam;