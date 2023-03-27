import { QueryParamsHandling } from '@angular/router';
import { NavigationLink } from './navigation-link.model';

export interface TabNavigationLink extends NavigationLink {
  queryParams?: {[key: string]: string},
  queryParamsHandling?: QueryParamsHandling | null | undefined
}
