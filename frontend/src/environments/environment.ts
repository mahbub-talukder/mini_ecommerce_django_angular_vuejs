// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const api = 'http://127.0.0.1:8000/api/'; 
export const environment = {
    production: false,
    hmr       : false,
    domain: api,
    login: api + 'login',
    logout : api + 'logout',
    register: api + 'registration',
    fileUploadApi: api + 'file_upload',
    create_products : api + 'create_products',
    allproductList : api + 'allproductList',
    getproductbyId : api + 'getproductbyId',
    update_products : api + 'update_products',
    product_delete  : api + 'product_delete'
    

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
