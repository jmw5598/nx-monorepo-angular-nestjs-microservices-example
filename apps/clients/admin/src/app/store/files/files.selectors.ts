import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filesFeature, FilesState } from './files.reducer';

export const selectFilesState = createFeatureSelector<FilesState>(
  filesFeature.name
);

export const FilesSelectors = {
  selectFilesState
};
