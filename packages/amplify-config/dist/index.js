export const k7Backend = {
    name: 'k7-platform',
    authorizationModes: {
        defaultAuthorizationMode: 'userPool',
        apiKeyAuthorizationMode: {
            expiresInDays: 30
        }
    },
    storage: {
        productAssets: {
            name: 'productAssets',
            access: 'protected',
            path: 'catalog/'
        },
        marketingAssets: {
            name: 'marketingAssets',
            access: 'guest',
            path: 'public/'
        }
    },
    data: {
        models: {
            Product: {
                fields: {
                    id: 'ID',
                    name: 'String',
                    description: 'String',
                    price: 'Float',
                    stock: 'Int',
                    sku: 'String',
                    imageKey: 'String'
                },
                authorizationRules: [
                    { allow: 'owner' },
                    { allow: 'groups', groups: ['admin', 'merchant'] }
                ]
            },
            Order: {
                fields: {
                    id: 'ID',
                    status: 'String',
                    total: 'Float',
                    customerId: 'String',
                    storeId: 'String'
                },
                authorizationRules: [
                    { allow: 'groups', groups: ['admin', 'staff'] },
                    { allow: 'owner', ownerField: 'customerId', operations: ['read'] }
                ]
            },
            CreditAccount: {
                fields: {
                    id: 'ID',
                    customerId: 'String',
                    balance: 'Float',
                    limit: 'Float',
                    status: 'String'
                },
                authorizationRules: [{ allow: 'groups', groups: ['admin', 'finance'] }]
            }
        }
    },
    functions: {
        orderWorkflow: {
            name: 'orderWorkflow',
            entry: 'handlers/orderWorkflow.handler',
            environment: {
                TABLE_NAME: 'OrdersTable'
            }
        },
        notificationsDispatcher: {
            name: 'notificationsDispatcher',
            entry: 'handlers/notificationsDispatcher.handler',
            environment: {
                PINPOINT_APP_ID: 'pinpoint-app-id'
            }
        }
    },
    api: {
        rest: {
            OrdersService: {
                path: '/orders',
                lambdaFunction: 'orderWorkflow'
            },
            NotificationsService: {
                path: '/notifications',
                lambdaFunction: 'notificationsDispatcher'
            },
            CreditService: {
                path: '/credit',
                lambdaFunction: 'orderWorkflow'
            }
        }
    }
};
export const amplifyExports = {
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_example',
        userPoolWebClientId: 'exampleclientid',
        identityPoolId: 'us-east-1:example-identity',
        oauth: {
            domain: 'example.auth.us-east-1.amazoncognito.com',
            scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
            redirectSignIn: ['http://localhost:4000/', 'https://admin.example.com/'],
            redirectSignOut: ['http://localhost:4000/', 'https://admin.example.com/'],
            responseType: 'code'
        }
    },
    API: {
        endpoints: [
            {
                name: 'OrdersService',
                endpoint: 'https://api.example.com/orders',
                region: 'us-east-1'
            },
            {
                name: 'NotificationsService',
                endpoint: 'https://api.example.com/notifications',
                region: 'us-east-1'
            },
            {
                name: 'CreditService',
                endpoint: 'https://api.example.com/credit',
                region: 'us-east-1'
            },
            {
                name: 'CatalogService',
                endpoint: 'https://api.example.com/catalog',
                region: 'us-east-1'
            }
        ]
    },
    geo: {
        AmazonLocationService: {
            maps: {
                items: {
                    defaultMap: {
                        style: 'VectorEsriStreets'
                    }
                },
                default: 'defaultMap'
            }
        }
    },
    Storage: {
        productAssets: {
            bucket: 'k7-product-assets',
            region: 'us-east-1'
        }
    },
    PushNotification: {
        Pinpoint: {
            appId: 'pinpoint-app-id',
            region: 'us-east-1'
        }
    }
};
export default amplifyExports;
