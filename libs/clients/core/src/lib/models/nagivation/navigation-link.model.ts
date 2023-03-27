export interface NavigationLink {
  label: string,
  icon?: string,
  routerLink?: string | string[],
  children?: NavigationLink[]
}
