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

export interface User {
    id?: string;

    name?: string;

    tenantId?: string;

    createdByUser?: string;

    type?: User.TypeEnum;

    status?: User.StatusEnum;

    login?: string;

    email?: string;

    createdDate?: models.Date;

    expirationDate?: models.Date;

    lastLoginDate?: models.Date;

    password?: string;

    passwordHash?: string;

    passwordToken?: string;

    passwordTokenExpirationDate?: models.Date;

    activationToken?: string;

    activationTokenExpirationDate?: models.Date;

    termsOfUseDate?: models.Date;

    roles?: Array<string>;

    grants?: Array<models.Permission>;

    revokes?: Array<models.Permission>;

    scopes?: Array<models.Permission>;

}
export namespace User {
    export enum TypeEnum {
        Database = <any> 'database',
        Ldap = <any> 'ldap',
        Token = <any> 'token',
        Saml = <any> 'saml'
    }
    export enum StatusEnum {
        ACTIVE = <any> 'ACTIVE',
        DISABLED = <any> 'DISABLED',
        REGISTERING = <any> 'REGISTERING'
    }
}
