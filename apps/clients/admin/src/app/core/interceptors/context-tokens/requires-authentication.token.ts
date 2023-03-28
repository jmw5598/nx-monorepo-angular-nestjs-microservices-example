import { HttpContextToken } from '@angular/common/http';

export const REQUIRES_AUTHENTICATION: HttpContextToken<boolean> = 
        new HttpContextToken<boolean>(() => true);
