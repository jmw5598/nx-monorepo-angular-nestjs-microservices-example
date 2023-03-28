import { createActionGroup, emptyProps } from '@ngrx/store';

export const FilesActions = createActionGroup({
  source: 'Files',
  events: {
    'Upload Avatar Request': emptyProps(),
    'Upload Avatar Request Success': emptyProps(),
    'Upload Avatar Request Failure': emptyProps(), 
  }
});
