export type VspDatatableSize = 'middle' | 'small' | 'default';

export interface VspDatatableScrollConfig {
  x?: string,
  y?: string
}

export interface VspDatatablePageSizeChanger {
  show: boolean,
  options: number[]
}

export interface VspDatatableSettings {
  bordered: boolean,
  size: VspDatatableSize,
  scroll: VspDatatableScrollConfig,
  pageSizeChanger: VspDatatablePageSizeChanger
}

export const DEFAULT_PJO_DATATABLE_SETTINGS: VspDatatableSettings = {
  bordered: true,
  size: 'middle',
  scroll: {
    y: '500px'
  },
  pageSizeChanger: {
    show: true,
    options: [10, 25, 50, 100]
  }
};
