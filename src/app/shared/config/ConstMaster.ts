import { environment } from '../../../environments/environment';

export const ConstMaster = {
    
    STORAGE_KEY : {
        HOMEPAGE: 'atk:homepage'
    },
    HOME_API : {
        endpoint: environment.apiGatewayHomePage
    },
    EVENT_CARD_API : {
        endpoint: environment.apiGatewayAllEvent
    },
    HEADER_API : {
        endpoint: environment.apiGatewayHeader
    },
    EVENT_INFO_API : {
        getEventStatus: environment.apiGatewayCheckEvent
    },
    BOOKING_API : {
        getRound: environment.apiGatewayGetRound
    },
    DEFAULT_IMAGES : {
        banner: environment.bucketS3+'/assets/images/placeholder/place-holder-1440x480.jpg.jpg',
        ticketCard: environment.bucketS3+'/assets/images/placeholder/place-holder-410x600.jpg',
        eventLogo: environment.bucketS3+'/assets/images/placeholder/place-holder-650x450.jpg'
    },
    S3_PATH: environment.bucketS3
};