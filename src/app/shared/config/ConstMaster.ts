import { environment } from '../../../environments/environment';

export const ConstMaster = {
    
    HOME_API : {
        endpoint: environment.apiGatewayHomePage
    },
    EVENT_CARD_API : {
        endpoint: environment.apiGatewayAllEvent
    },
    HEADER_API : {
        endpoint: environment.apiGatewayHeader
    }
};