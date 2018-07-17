import 'reflect-metadata';
import {
    MetadataScanner,
} from '@nestjs/core/metadata-scanner';
import {
    CONFIG_PARAMETER_METADATA,
} from './../constants';

export default class ConfigMetadataExplorer {
    constructor(private readonly metadataScanner: MetadataScanner) {}

    public explore(instance: Controller) {
        const prototype = Object.getPrototypeOf(instance);
        return this.metadataScanner.scanFromPrototype<Controller>(
            instance,
            prototype,
            (method) => (instance, prototype, method) => {
                console.log('method', method);
                console.log('prototype', prototype);
                console.log('instance', instance);
            },
        );
    }
}