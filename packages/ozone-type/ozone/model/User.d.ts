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
    createdDate?: Date;
    expirationDate?: Date;
    lastLoginDate?: Date;
    password?: string;
    passwordToken?: string;
    passwordTokenExpirationDate?: Date;
    activationToken?: string;
    activationTokenExpirationDate?: Date;
    termsOfUseDate?: Date;
    roles?: Array<string>;
    grants?: Array<models.Permission>;
    revokes?: Array<models.Permission>;
    scopes?: Array<models.Permission>;
}
export declare namespace User {
    enum TypeEnum {
        Database,
        Ldap,
        Token,
        Saml,
    }
    enum StatusEnum {
        ACTIVE,
        DISABLED,
        REGISTERING,
    }
}
