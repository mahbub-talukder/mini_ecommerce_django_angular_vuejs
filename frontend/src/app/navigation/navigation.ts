import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'dashboard',
        title    : 'Dashboard',
        type     : 'item',
        icon     : 'dashboard',
        url     : '/dashboard'
    },
    {
        id       : 'products',
        title    : 'Products',
        type     : 'group',
        icon      : 'group',
        children : [
                    {
                        id       : 'create_product',
                        title    : 'Create Product',
                        type     : 'item',
                        icon     : 'post_add',
                        url      : '/product/create_product',
                  
                    },
                    {
                        id       : 'product_list',
                        title    : 'Product List',
                        type     : 'item',
                        icon     : 'view_list',
                        url      : '/product/productslist',
                  
                    },  
                
          
                ]
    }
   
];
