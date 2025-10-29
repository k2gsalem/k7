export declare const k7Backend: {
    readonly name: "k7-platform";
    readonly authorizationModes: {
        readonly defaultAuthorizationMode: "userPool";
        readonly apiKeyAuthorizationMode: {
            readonly expiresInDays: 30;
        };
    };
    readonly storage: {
        readonly productAssets: {
            readonly name: "productAssets";
            readonly access: "protected";
            readonly path: "catalog/";
        };
        readonly marketingAssets: {
            readonly name: "marketingAssets";
            readonly access: "guest";
            readonly path: "public/";
        };
    };
    readonly data: {
        readonly models: {
            readonly Product: {
                readonly fields: {
                    readonly id: "ID";
                    readonly name: "String";
                    readonly description: "String";
                    readonly price: "Float";
                    readonly stock: "Int";
                    readonly sku: "String";
                    readonly imageKey: "String";
                };
                readonly authorizationRules: readonly [{
                    readonly allow: "owner";
                }, {
                    readonly allow: "groups";
                    readonly groups: readonly ["admin", "merchant"];
                }];
            };
            readonly Order: {
                readonly fields: {
                    readonly id: "ID";
                    readonly status: "String";
                    readonly total: "Float";
                    readonly customerId: "String";
                    readonly storeId: "String";
                };
                readonly authorizationRules: readonly [{
                    readonly allow: "groups";
                    readonly groups: readonly ["admin", "staff"];
                }, {
                    readonly allow: "owner";
                    readonly ownerField: "customerId";
                    readonly operations: readonly ["read"];
                }];
            };
            readonly CreditAccount: {
                readonly fields: {
                    readonly id: "ID";
                    readonly customerId: "String";
                    readonly balance: "Float";
                    readonly limit: "Float";
                    readonly status: "String";
                };
                readonly authorizationRules: readonly [{
                    readonly allow: "groups";
                    readonly groups: readonly ["admin", "finance"];
                }];
            };
        };
    };
    readonly functions: {
        readonly orderWorkflow: {
            readonly name: "orderWorkflow";
            readonly entry: "handlers/orderWorkflow.handler";
            readonly environment: {
                readonly TABLE_NAME: "OrdersTable";
            };
        };
        readonly notificationsDispatcher: {
            readonly name: "notificationsDispatcher";
            readonly entry: "handlers/notificationsDispatcher.handler";
            readonly environment: {
                readonly PINPOINT_APP_ID: "pinpoint-app-id";
            };
        };
    };
    readonly api: {
        readonly rest: {
            readonly OrdersService: {
                readonly path: "/orders";
                readonly lambdaFunction: "orderWorkflow";
            };
            readonly NotificationsService: {
                readonly path: "/notifications";
                readonly lambdaFunction: "notificationsDispatcher";
            };
            readonly CreditService: {
                readonly path: "/credit";
                readonly lambdaFunction: "orderWorkflow";
            };
        };
    };
};
export declare const amplifyExports: {
    Auth: {
        region: string;
        userPoolId: string;
        userPoolWebClientId: string;
        identityPoolId: string;
        oauth: {
            domain: string;
            scope: string[];
            redirectSignIn: string[];
            redirectSignOut: string[];
            responseType: string;
        };
    };
    API: {
        endpoints: {
            name: string;
            endpoint: string;
            region: string;
        }[];
    };
    geo: {
        AmazonLocationService: {
            maps: {
                items: {
                    defaultMap: {
                        style: string;
                    };
                };
                default: string;
            };
        };
    };
    Storage: {
        productAssets: {
            bucket: string;
            region: string;
        };
    };
    PushNotification: {
        Pinpoint: {
            appId: string;
            region: string;
        };
    };
};
export type AmplifyExports = typeof amplifyExports;
export default amplifyExports;
