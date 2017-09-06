/**
 * Ozone
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 3.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface MatchQuery extends models.Query {
    field: string;

    text: any;

    operator?: MatchQuery.OperatorEnum;

}
export namespace MatchQuery {
    export enum OperatorEnum {
        OR = <any> 'OR',
        AND = <any> 'AND'
    }
}
