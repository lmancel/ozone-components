/// <amd-module name="ozone-media-url"/>
/**
 * Created by hubert on 21/06/17.
 */

import {jsElement} from 'taktik-polymer-typescript'
import {OzoneApiItem} from 'ozone-api-item'
import {OzoneAPIRequest} from 'ozone-api-request'
import * as OzoneType from 'ozone-type'
import * as Config from 'ozone-config';
export type SizeEnum = Number;
@jsElement()
export class  OzonePreviewSize{
    static Small: SizeEnum= 250;
    static Medium: SizeEnum = 500;
    static Large:SizeEnum = 1500;
}

/**
 * JavaScript class to convert media ID to URL
 */
@jsElement()
export class OzoneMediaUrl {

    id:uuid;
    config: Config.ConfigType;
    constructor(id:uuid, config: Config.ConfigType){
        this.id = id;
        this.config = config;
    }
    private ozoneApi?: OzoneApiItem;
    private _getOzoneApi():OzoneApiItem{
        if(! this.ozoneApi){
            this.ozoneApi = new OzoneApiItem();
        }
        return this.ozoneApi;
    }

    getNumericId():number{
        return parseInt('0x' + this.id.split('-')[4])
    }
    private _buildBaseUrl(action:Array<string | number>):string{
        return `${this.config.host}${this.config.view}/${action.join('/')}`;
    }

    getPreviewUrlJpg(size: SizeEnum):string{
        const preview = this.config.format.type.jpg.replace('{SIZE}', size.toString());
        return this
            ._buildBaseUrl([this.getNumericId(), preview])

    }
    getOriginalFormat():string{
        return this
            ._buildBaseUrl([this.getNumericId(),
                this.config.format.type.original])

    }
    getPreviewUrlPng(size: SizeEnum):string{
        const preview = this.config.format.type.png.replace('{SIZE}', size.toString());
        return this
            ._buildBaseUrl([this.getNumericId(), preview])

    }
    async getPreviewUrl(size: SizeEnum): Promise<string>{
        //TODO default is png
        return this.getPreviewUrlJpg(size);
    }
    async getVideoUrl():Promise<string>{

        const formatName = await this.getPreferedVideoFormat();
        if(formatName) {
            return this
                ._buildBaseUrl([this.getNumericId(),
                    formatName,
                    'index.m3u8']);
        } else {
            throw new Error('Video Format is undefined')
        }
    }
    getVideoUrlMp4():string{
        return this
            ._buildBaseUrl([this.getNumericId(),
                this.config.format.type.mp4])
    }

    private _fileTypeRequest(filetypeIdentifier: string){
        const url = `${this.config.host}${this.config.endPoints.fileType}/identifier/${filetypeIdentifier}`;

        const ozoneAPIRequest = new OzoneAPIRequest();
        ozoneAPIRequest.url = url;
        ozoneAPIRequest.method = 'GET';
        return ozoneAPIRequest.sendRequest();
    }

    private _getVideoFileType():Promise<object>{
        const videoFormat =  this.config.format.priority.video;
        const promises = videoFormat.map((format: string)=> {
            const filetypeIdentifier = this.config.format.type[format];
            return this._fileTypeRequest(filetypeIdentifier)
                .catch(()=>{
                    console.log(format, 'not found')
                })
        });
        return Promise.all(promises);
    }

    private _referedVideoFormat?:string;

    async getPreferedVideoFormat(): Promise<string | undefined>{
        if(this._referedVideoFormat){
            return this._referedVideoFormat
        }
        const ozoneApi = this._getOzoneApi();
        const video = (await ozoneApi
            .on('video')
            .getOne(this.id)) as OzoneType.Video;

        var avaliableRessourceId = [];
        if(video.file) avaliableRessourceId.push(video.file);
        if(video.derivedFiles) avaliableRessourceId = avaliableRessourceId.concat(video.derivedFiles);

        const avaliableRessource = (await ozoneApi
                    .on('file')
                    .bulkGet(avaliableRessourceId)) as Array<OzoneType.File>;


        const videoFileTypes = (await this._getVideoFileType()) as Array<OzoneType.FileType>;

        for (let format of this.config.format.priority.video){
            const ressourceToUse = avaliableRessource.find((ressource)=>{

                const fileType = videoFileTypes.find((videoFileType)=>{
                    if(videoFileType && videoFileType.id)
                        return videoFileType.id == ressource.fileType;
                    return false;
                });
                const filetypeIdentifier:string = this.config.format.type[format];
                if(!fileType ) return false;
                return fileType.identifier === filetypeIdentifier;
            });
            if(ressourceToUse){
                const fileTypeToUse = videoFileTypes.find((videoFileType) => {
                    return videoFileType.id == ressourceToUse.fileType
                });
                if(fileTypeToUse && fileTypeToUse.identifier) {
                    this._referedVideoFormat = fileTypeToUse.identifier;
                    return this._referedVideoFormat;
                }
            }
        }

        //if no result found
        throw new Error('no video file found')
    }

}