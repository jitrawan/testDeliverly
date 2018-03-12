export const ConstMaster = {
    S3_ENDPOINT : {
        url : 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/'
    },
    header : {
        jsonFileEndPoints: 'https://s3-ap-southeast-1.amazonaws.com/titiphong-assets/json/headerMenu.json'
    },
    home : {
        jsonFileEndPoints: 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/json/EventBanner.json'
    },
    imageBreakpoint : [
        {
            breakpoint: 768,
            beakpointName: 'sd'
        },
        {
            breakpoint: 1366,
            beakpointName: 'hd'
        },
        {
            breakpoint: 1920,
            beakpointName: 'fullhd'
        }
    ]
};