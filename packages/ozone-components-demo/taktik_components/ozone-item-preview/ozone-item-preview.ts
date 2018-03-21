/**
 * Created by hubert on 8/06/17.
 */

import "polymer/polymer-element.html"
import "paper-item/paper-item.html"
import "paper-icon-button/paper-icon-button.html"
import "iron-image/iron-image.html"

import './ozone-item-preview.html'
import * as Config from 'ozone-config'

import {customElement, property} from 'taktik-polymer-typescript'
import {Item, Media} from 'ozone-type';
import {OzoneMediaUrl, OzonePreviewSize, SizeEnum} from 'ozone-media-url'
import {OzoneApiType, getOzoneApiType} from 'ozone-api-type'

/**
 * `ozone-item-preview` is hight level polymer module to display preview information an ozone item.
 *
 * Example in html:
 * ```html
 * <ozone-item-preview itemData=[[item]]></ozone-item-preview>
 * ```
 *
 * ### Events
 *
 * * *edit-item* fire on click on close button.
 *
 */
@customElement('ozone-item-preview')
export class OzoneItemPreview extends Polymer.Element{

    /**
     * url of the image preview
     */
    @property({type: String})
    previewImage?: string;

    /**
     * the element appear select when set at true
     */
    @property({type: Boolean})
    selected: boolean = false;

    /**
     * item to display
     */
    @property({type: Object})
    itemData: Item | null = null;

    ozoneTypeApi: OzoneApiType = getOzoneApiType();
    static defaultImagePath = ""


    static get observers(){
        return ['_selectionChange(selected)', 'dataChange(itemData)'];
    }

    placeholder(itemData:Item):string {
        let placeholder: string = "";
        switch(itemData.type) {
            case 'organization.info':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMTk5Ljg0NzY1NiwxNTAuODg4NjcyIEMyMDQuNDA0OTcxLDE0Ny43OTYyMDggMjA5LjkzODc3LDE0Ny4zMDc5MzIgMjE2LjQ0OTIxOSwxNDkuNDIzODI4IEwyMjYuMjE0ODQ0LDE1Mi41OTc2NTYgTDIzMS4wOTc2NTYsMTQ3LjEwNDQ5MiBDMjM0LjM1Mjg4MSwxNDMuNDQyMzY1IDIzOS41NjExNjIsMTQxLjYxMTMyOCAyNDYuNzIyNjU2LDE0MS42MTEzMjggQzI1Ni4wMDAwNDYsMTQxLjYxMTMyOCAyNjIuNDY5NzA4LDE0My4xNTc1MzcgMjY2LjEzMTgzNiwxNDYuMjUgTDI3MS42MjUsMTUwLjg4ODY3MiBMMjc4LjIxNjc5NywxNDAuNzU2ODM2IEMyODIuNjExMzUsMTM0LjAwMjI0NSAyOTAuMzQyMzkzLDEzMC42MjUgMzAxLjQxMDE1NiwxMzAuNjI1IEMzMTMuMTI4OTY1LDEzMC42MjUgMzIwLjczNzkzOCwxMzMuNDczMjc5IDMyNC4yMzczMDUsMTM5LjE2OTkyMiBMMzI5LjQ4NjMyOCwxNDcuNzE0ODQ0IEwzMzMuNzU4Nzg5LDE0My4zMjAzMTIgQzMzNi42MDcxMTEsMTQwLjM5MDYxIDM0MS45Mzc0NjEsMTM5LjI1MTI5OSAzNDkuNzUsMTM5LjkwMjM0NCBDMzU4LjM3NjM0NSwxNDAuNzE2MTUgMzYyLjg5MjkwMiwxNDMuODA4NTY3IDM2My4yOTk4MDUsMTQ5LjE3OTY4OCBMMzYzLjkxMDE1NiwxNTcuMjM2MzI4IEwzNzIuNDU1MDc4LDE1OC4yMTI4OTEgQzM3OC4xNTE3MjEsMTU4Ljg2MzkzNiAzODEsMTYyLjY4ODc2NyAzODEsMTY5LjY4NzUgQzM4MSwxNzUuMjIxMzgyIDM3OC4zOTU4NTksMTc4LjQzNTg2OCAzNzMuMTg3NSwxNzkuMzMxMDU1IEwzNjUuMzc1LDE4MC42NzM4MjggTDM2Ni4zNTE1NjIsMTg2Ljg5OTQxNCBDMzY3LjAwMjYwNywxOTEuMDQ5ODI1IDM2My4wMTUwMTcsMTk0LjY3MTIwOCAzNTQuMzg4NjcyLDE5Ny43NjM2NzIgQzM0Mi42Njk4NjMsMjAyLjQ4Mzc0OCAzMzQuODE2NzUyLDIwMi42NDY1MDYgMzMwLjgyOTEwMiwxOTguMjUxOTUzIEwzMjQuODQ3NjU2LDE5MS42NjAxNTYgTDMxNi43OTEwMTYsMTk4Ljk4NDM3NSBDMzExLjQxOTg5NSwyMDMuODY3MjEyIDMwMi4wNjEyNjUsMjA1LjU3NjE3OSAyODguNzE0ODQ0LDIwNC4xMTEzMjggQzI3Ni45OTYwMzUsMjAyLjQ4MzcxNiAyNjkuNjcxODksMTk4LjQxNDc0NiAyNjYuNzQyMTg4LDE5MS45MDQyOTcgTDI2Mi4zNDc2NTYsMTgyLjEzODY3MiBMMjUyLjA5Mzc1LDE4NS40MzQ1NyBDMjQ1LjI1Nzc3OCwxODcuNjMxODQ3IDIzOC43NDc0MjcsMTg2LjA0NDk0OSAyMzIuNTYyNSwxODAuNjczODI4IEMyMjMuMTIyMzQ5LDE3Mi44NjEyODkgMjE1LjIyODU0NywxNjguMTAwNTk0IDIwOC44ODA4NTksMTY2LjM5MTYwMiBDMjAyLjUzMzE3MSwxNjQuNjgyNjA5IDE5Ny40MDYyNywxNjcuMzI3NDM5IDE5My41LDE3NC4zMjYxNzIgQzE5MC40MDc1MzcsMTcxLjIzMzcwOCAxODkuNTEyMzYzLDE2Ny4xNjQ3MzkgMTkwLjgxNDQ1MywxNjIuMTE5MTQxIEMxOTIuMTE2NTQzLDE1Ny4wNzM1NDIgMTk1LjEyNzU4MSwxNTMuMzMwMDkgMTk5Ljg0NzY1NiwxNTAuODg4NjcyIFogTTMxOC41LDMxOS41ODk4NDQgTDM4MSwyODYuODc1IEwzODEsMzgwLjYyNSBMMTMxLDM4MC42MjUgTDEzMSwyODYuODc1IEwxNjguNTk3NjU2LDI4Ni44NzUgTDE3Ny44NzUsMTc3LjUgTDIwOS4xMjUsMTc3LjUgTDIxOC40MDIzNDQsMjg2Ljg3NSBMMjU2LDI4Ni44NzUgTDI1NiwzMTkuNTg5ODQ0IEwzMTguNSwyODYuODc1IEwzMTguNSwzMTkuNTg5ODQ0IFogTTIyNC43NSwzNDkuMzc1IEwyMjQuNzUsMzE4LjEyNSBMMTYyLjI1LDMxOC4xMjUgTDE2Mi4yNSwzNDkuMzc1IEwyMjQuNzUsMzQ5LjM3NSBaIiBpZD0iZmFjdG9yeS0tLVZhYWRpbi1JY29ucyIgZmlsbC1vcGFjaXR5PSIwLjQyIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
                break;

            case 'message':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMzE4LjUsMjE1IEwzMTguNSwxOTQgTDE5My41LDE5NCBMMTkzLjUsMjE1IEwzMTguNSwyMTUgWiBNMzE4LjUsMjQ2LjI1IEwzMTguNSwyMjUuMjUgTDE5My41LDIyNS4yNSBMMTkzLjUsMjQ2LjI1IEwzMTguNSwyNDYuMjUgWiBNMzE4LjUsMjc3LjUgTDMxOC41LDI1Ni41IEwxOTMuNSwyNTYuNSBMMTkzLjUsMjc3LjUgTDMxOC41LDI3Ny41IFogTTM2MCwxNzMgTDM2MCwzNjAuNSBMMzE4LjUsMzE5IEwxNzIuNSwzMTkgQzE2Ni44MzMzMDUsMzE5IDE2Mi4wMDAwMiwzMTYuOTE2Njg3IDE1OCwzMTIuNzUgQzE1My45OTk5OCwzMDguNTgzMzEzIDE1MiwzMDMuNjY2Njk1IDE1MiwyOTggTDE1MiwxNzMgQzE1MiwxNjcuMzMzMzA1IDE1My45OTk5OCwxNjIuNTAwMDIgMTU4LDE1OC41IEMxNjIuMDAwMDIsMTU0LjQ5OTk4IDE2Ni44MzMzMDUsMTUyLjUgMTcyLjUsMTUyLjUgTDMzOS41LDE1Mi41IEMzNDUuMTY2Njk1LDE1Mi41IDM0OS45OTk5OCwxNTQuNDk5OTggMzU0LDE1OC41IEMzNTguMDAwMDIsMTYyLjUwMDAyIDM2MCwxNjcuMzMzMzA1IDM2MCwxNzMgWiIgaWQ9ImNvbW1lbnQtLS1tYXRlcmlhbCIgZmlsbC1vcGFjaXR5PSIwLjQyIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
                break;

            case 'image':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMjE5LjUsMjcyIEwxODMuMjUsMzE5IEwzMjguNzUsMzE5IEwyODIsMjU2LjUgTDI0NS43NSwzMDMuMjUgTDIxOS41LDI3MiBaIE0zNDkuNzUsMzI5LjI1IEMzNDkuNzUsMzM0LjkxNjY5NSAzNDcuNjY2Njg3LDMzOS44MzMzMTMgMzQzLjUsMzQ0IEMzMzkuMzMzMzEzLDM0OC4xNjY2ODcgMzM0LjQxNjY5NSwzNTAuMjUgMzI4Ljc1LDM1MC4yNSBMMTgzLjI1LDM1MC4yNSBDMTc3LjU4MzMwNSwzNTAuMjUgMTcyLjY2NjY4NywzNDguMTY2Njg3IDE2OC41LDM0NCBDMTY0LjMzMzMxMywzMzkuODMzMzEzIDE2Mi4yNSwzMzQuOTE2Njk1IDE2Mi4yNSwzMjkuMjUgTDE2Mi4yNSwxODMuNzUgQzE2Mi4yNSwxNzguMDgzMzA1IDE2NC4zMzMzMTMsMTczLjE2NjY4OCAxNjguNSwxNjkgQzE3Mi42NjY2ODcsMTY0LjgzMzMxMiAxNzcuNTgzMzA1LDE2Mi43NSAxODMuMjUsMTYyLjc1IEwzMjguNzUsMTYyLjc1IEMzMzQuNDE2Njk1LDE2Mi43NSAzMzkuMzMzMzEzLDE2NC44MzMzMTIgMzQzLjUsMTY5IEMzNDcuNjY2Njg3LDE3My4xNjY2ODggMzQ5Ljc1LDE3OC4wODMzMDUgMzQ5Ljc1LDE4My43NSBMMzQ5Ljc1LDMyOS4yNSBaIiBpZD0iaW1hZ2UtLS1tYXRlcmlhbCIgZmlsbC1vcGFjaXR5PSIwLjQyIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
                break;

            case 'video':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMjI0Ljc1LDIzNS41IEwyOTcuNSwyNzcuNSBMMjI0Ljc1LDMxOSBMMjI0Ljc1LDIzNS41IFogTTM0OS43NSwzNDAgTDM0OS43NSwyMTUgTDE2Mi4yNSwyMTUgTDE2Mi4yNSwzNDAgTDM0OS43NSwzNDAgWiBNMzQ5Ljc1LDE5NCBDMzU1LjQxNjY5NSwxOTQgMzYwLjMzMzMxMiwxOTYuMDQxNjQ2IDM2NC41LDIwMC4xMjUgQzM2OC42NjY2ODgsMjA0LjIwODM1NCAzNzAuNzUsMjA5LjE2NjYzOCAzNzAuNzUsMjE1IEwzNzAuNzUsMzQwIEMzNzAuNzUsMzQ1LjY2NjY5NSAzNjguNjY2Njg4LDM1MC40OTk5OCAzNjQuNSwzNTQuNSBDMzYwLjMzMzMxMiwzNTguNTAwMDIgMzU1LjQxNjY5NSwzNjAuNSAzNDkuNzUsMzYwLjUgTDE2Mi4yNSwzNjAuNSBDMTU2LjU4MzMwNSwzNjAuNSAxNTEuNjY2Njg3LDM1OC41MDAwMiAxNDcuNSwzNTQuNSBDMTQzLjMzMzMxMywzNTAuNDk5OTggMTQxLjI1LDM0NS42NjY2OTUgMTQxLjI1LDM0MCBMMTQxLjI1LDIxNSBDMTQxLjI1LDIwOS4xNjY2MzggMTQzLjMzMzMxMywyMDQuMjA4MzU0IDE0Ny41LDIwMC4xMjUgQzE1MS42NjY2ODcsMTk2LjA0MTY0NiAxNTYuNTgzMzA1LDE5NCAxNjIuMjUsMTk0IEwyNDEuMjUsMTk0IEwyMDcuMjUsMTU5Ljc1IEwyMTQuNSwxNTIuNSBMMjU2LDE5NCBMMjk3LjUsMTUyLjUgTDMwNC43NSwxNTkuNzUgTDI3MC43NSwxOTQgTDM0OS43NSwxOTQgWiIgaWQ9ImxpdmVfdHYtLS1tYXRlcmlhbCIgZmlsbC1vcGFjaXR5PSIwLjQyIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
                break;

            case 'channel':
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMzQ5Ljc1LDMwOC43NSBMMzQ5Ljc1LDE4My43NSBMMTYyLjI1LDE4My43NSBMMTYyLjI1LDMwOC43NSBMMzQ5Ljc1LDMwOC43NSBaIE0zNDkuNzUsMTYyLjc1IEMzNTUuNDE2Njk1LDE2Mi43NSAzNjAuMzMzMzEyLDE2NC44MzMzMTIgMzY0LjUsMTY5IEMzNjguNjY2Njg4LDE3My4xNjY2ODggMzcwLjc1LDE3OC4wODMzMDUgMzcwLjc1LDE4My43NSBMMzcwLjI1LDMwOC43NSBDMzcwLjI1LDMxNC40MTY2OTUgMzY4LjI1MDAyLDMxOS4yNDk5OCAzNjQuMjUsMzIzLjI1IEMzNjAuMjQ5OTgsMzI3LjI1MDAyIDM1NS40MTY2OTUsMzI5LjI1IDM0OS43NSwzMjkuMjUgTDI5Ny41LDMyOS4yNSBMMjk3LjUsMzUwLjI1IEwyMTQuNSwzNTAuMjUgTDIxNC41LDMyOS4yNSBMMTYyLjI1LDMyOS4yNSBDMTU2LjU4MzMwNSwzMjkuMjUgMTUxLjY2NjY4NywzMjcuMjUwMDIgMTQ3LjUsMzIzLjI1IEMxNDMuMzMzMzEzLDMxOS4yNDk5OCAxNDEuMjUsMzE0LjQxNjY5NSAxNDEuMjUsMzA4Ljc1IEwxNDEuMjUsMTgzLjc1IEMxNDEuMjUsMTc4LjA4MzMwNSAxNDMuMzMzMzEzLDE3My4xNjY2ODggMTQ3LjUsMTY5IEMxNTEuNjY2Njg3LDE2NC44MzMzMTIgMTU2LjU4MzMwNSwxNjIuNzUgMTYyLjI1LDE2Mi43NSBMMzQ5Ljc1LDE2Mi43NSBaIiBpZD0idHYtLS1tYXRlcmlhbCIgZmlsbC1vcGFjaXR5PSIwLjQyIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
                break;

            default:
                placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4xICg0MzUwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMjY2LjI1LDIyNS4yNSBMMzI0LDIyNS4yNSBMMjY2LjI1LDE2OCBMMjY2LjI1LDIyNS4yNSBaIE0xOTMuNSwxNTIuNSBMMjc3LDE1Mi41IEwzMzkuNSwyMTUgTDMzOS41LDM0MCBDMzM5LjUsMzQ1LjY2NjY5NSAzMzcuNDE2Njg3LDM1MC40OTk5OCAzMzMuMjUsMzU0LjUgQzMyOS4wODMzMTIsMzU4LjUwMDAyIDMyNC4xNjY2OTUsMzYwLjUgMzE4LjUsMzYwLjUgTDE5My41LDM2MC41IEMxODcuODMzMzA1LDM2MC41IDE4Mi45MTY2ODcsMzU4LjUwMDAyIDE3OC43NSwzNTQuNSBDMTc0LjU4MzMxMywzNTAuNDk5OTggMTcyLjUsMzQ1LjY2NjY5NSAxNzIuNSwzNDAgTDE3MywxNzMgQzE3MywxNjcuMzMzMzA1IDE3NC45OTk5OCwxNjIuNTAwMDIgMTc5LDE1OC41IEMxODMuMDAwMDIsMTU0LjQ5OTk4IDE4Ny44MzMzMDUsMTUyLjUgMTkzLjUsMTUyLjUgWiIgaWQ9Imluc2VydF9kcml2ZV9maWxlLS0tbWF0ZXJpYWwiIGZpbGwtb3BhY2l0eT0iMC40MiIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
        }
        return placeholder;
    }
    private _editItem(e: Event){
        this.dispatchEvent(new CustomEvent('edit-item',
            {bubbles: true, detail:this.itemData, composed: true} as CustomEventInit));

        e.preventDefault();
        e.stopPropagation();
    }
    private _infoItem(e: Event){
        this.dispatchEvent(new CustomEvent('info-item',
            {bubbles: true, detail:this.itemData, composed: true} as CustomEventInit));

        e.preventDefault();
        e.stopPropagation();
    }

    private _delete(e: Event){
        this.dispatchEvent(new CustomEvent('delete-item',
            {bubbles: true, detail:this.itemData, composed: true} as CustomEventInit));

        e.preventDefault();
        e.stopPropagation();
    }

    async dataChange(data:Item){
        const config = await Config.OzoneConfig.get();
        if(this.ozoneTypeApi) {
            this.ozoneTypeApi.ifIsTypeInstanceOf(data.type, 'media').then((isTypeInstanceOf) => {
                if(isTypeInstanceOf) {
                    const ozoneMediaUrl = new OzoneMediaUrl(data.id as string, config);
                    this.set('previewImage', ozoneMediaUrl.getPreviewUrlPng(OzonePreviewSize.Small));
                } else {
                    this.set('previewImage', null);
                }
            }).catch(() => {
            });
        } else {
            throw new Error('ozoneTypeApi is not define')
        }
    }
    private _setFocus(){
        this.$.actionsPanel.classList.add("open");
    }

    private _removeFocus(){
        this.$.actionsPanel.classList.remove('open');
    }

    private _selectionChange(selected: boolean){
        if(selected){
            this._setFocus();
        } else {
            this._removeFocus();
        }
    }

}