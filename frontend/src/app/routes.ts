import { NotFoundComponent } from './not-found/not-found.component';

export const routes = [
    { 
        path: '', 
        redirectTo: '/public', pathMatch: 'full'
    },
    { 
        path: 'public', 
        loadChildren: () => import('app/main/public/public.module').then(m => m.PublicModule)   
    },
    { 
        path: 'dashboard', 
        loadChildren: () => import('app/main/dashboard/dashboard.module').then(m => m.DashboardModule)   
    },
    { 
        path: 'login',
        loadChildren: () => import('app/main/login/login.module').then(m => m.LoginModule)        
    },
    { 
        path: 'registration', 
        loadChildren: () => import('app/main/app-registration/app-registration.module').then(m => m.AppRegistrationModule)        
    },
    { 
        path: 'product', 
        loadChildren: () => import('app/main/products/products.module').then(m => m.ProductsModule)        
    },
    { 
        path: 'product/create_product', 
        loadChildren: () => import('app/main/products/products.module').then(m => m.ProductsModule)        
    },
    { 
        path: 'product/update_product/:id', 
        loadChildren: () => import('app/main/products/products.module').then(m => m.ProductsModule)        
    },
    { 
        path: 'product/productslist', 
        loadChildren: () => import('app/main/products/products.module').then(m => m.ProductsModule)        
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    { 
        path: '**', 
        redirectTo: 'not-found' 
    }
    
];
