import { createFeature, createReducer, on } from '@ngrx/store';

import { FilesActions } from './files.actions';

export interface FilesState {

}

export const initialFilesState: FilesState = {

}

export const filesFeature = createFeature({
  name: 'files',
  reducer: createReducer(
    initialFilesState
  )
});
