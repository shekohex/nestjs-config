import 'reflect-metadata';
import {
    MetadataScanner,
} from '@nestjs/core/metadata-scanner';
import {
    CONFIG_PARAMETER_METADATA,
} from './../constants';

export default class ConfigMetadataExplorer {
    constructor(private readonly metaDataScanner: MetadataScanner) {}
}