import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FilesService } from '@vsp/admin/core/services';

import { FilesActions } from './files.actions';
import { ResponseMessage, ResponseStatus } from '@vsp/clients/core';

@Injectable()
export class FilesEffects {
  constructor(
    private _actions: Actions,
    private _filesService: FilesService
  ) { }
}
