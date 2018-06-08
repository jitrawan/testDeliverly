// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: '//dmkeuw46g1lts.cloudfront.net',
  apiGateway: 'https://ad5xsmjzzj.execute-api.ap-southeast-1.amazonaws.com/v1/',
  apiGatewayBaseUrl: 'https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/',
  apiGatewayRegister: 'https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/register',
  apiGatewayHomePage: 'https://kskyyucr18.execute-api.ap-southeast-1.amazonaws.com/latest/get-home',
  apiGatewayAllEvent: 'https://kskyyucr18.execute-api.ap-southeast-1.amazonaws.com/latest/get-all-events',
  apiGatewayCheckEvent: 'https://2za1bogkhk.execute-api.ap-southeast-1.amazonaws.com/latest/check-event',
  apiGatewayGetRound: 'https://2za1bogkhk.execute-api.ap-southeast-1.amazonaws.com/latest/get-round',
  apiGatewayGetZoneAvailable: 'https://2za1bogkhk.execute-api.ap-southeast-1.amazonaws.com/latest/seat-available',
  apiGatewayGetSeat: 'https://2za1bogkhk.execute-api.ap-southeast-1.amazonaws.com/latest/get-seat',
  apiGatewayGetReserve: 'https://2za1bogkhk.execute-api.ap-southeast-1.amazonaws.com/latest/handler-reserve',
  apiGatewayHeader: '//s3-ap-southeast-1.amazonaws.com/atkfullsite/config/HeaderMenu.json',
  bucketS3: '//s3-ap-southeast-1.amazonaws.com/dev.allticketthailand.com',
};
