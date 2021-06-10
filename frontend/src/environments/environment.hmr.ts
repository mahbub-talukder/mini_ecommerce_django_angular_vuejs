const api = 'http://localhost:8000/api/'; 
export const environment = {
    production: false,
    hmr       : true,
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
