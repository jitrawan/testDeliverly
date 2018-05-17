// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: '//d11aliyfxni7iy.cloudfront.net',
  apiGateway: 'https://ad5xsmjzzj.execute-api.ap-southeast-1.amazonaws.com/v1/',
  apiGatewayRegister: 'https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/register',
  apiGatewayHomePage: 'https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/homepage',
  apiGatewayAllEvent: 'https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/all-event',
  apiGatewayHeader: '//s3-ap-southeast-1.amazonaws.com/atkfullsite/config/HeaderMenu.json',

  bucketS3: '//s3-ap-southeast-1.amazonaws.com/dev.allticketthailand.com',
};
