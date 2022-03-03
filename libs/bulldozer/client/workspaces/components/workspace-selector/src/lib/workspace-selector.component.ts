import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { ConfigStore } from '@bulldozer-client/core-data-access';
import { NotificationStore } from '@bulldozer-client/notifications-data-access';
import {
  WorkspaceApiService,
  WorkspacesStore,
} from '@bulldozer-client/workspaces-data-access';
import { WorkspaceSelectorStore } from './workspace-selector.store';

@Component({
  selector: 'bd-workspace-selector',
  template: `
    <ng-container *ngrxLet="workspace$; let activeWorkspace">
      <button type="button" mat-raised-button [matMenuTriggerFor]="menu">
        {{
          activeWorkspace === null ? 'Select workspace' : activeWorkspace?.name
        }}
      </button>
      <mat-menu #menu="matMenu">
        <div class="px-4 py-2" bdStopPropagation>
          <mat-list role="list">
            <mat-list-item
              *ngFor="let workspace of workspaces$ | ngrxPush"
              role="listitem"
              class="w-full h-auto mb-2 pt-4 pb-3 border-b-4 border-transparent bg-white bg-opacity-5 mat-elevation-z2"
              [ngClass]="{
                'border-b-primary': activeWorkspace?.id === workspace.id
              }"
            >
              <div class="w-full">
                <p class="text-xl font-bold mb-0 flex justify-between">
                  <span
                    class="flex-grow leading-8 overflow-hidden"
                    [matTooltip]="workspace.name"
                    matTooltipShowDelay="500"
                  >
                    {{ workspace.name }}
                  </span>
                  <button
                    mat-icon-button
                    color="primary"
                    class="w-8 h-8 leading-8 flex-shrink-0"
                    [attr.aria-label]="
                      'Download ' + workspace.name + ' workspace'
                    "
                    (click)="onDownloadWorkspace(workspace.id)"
                  >
                    <mat-icon>download</mat-icon>
                  </button>
                </p>

                <p class="mb-2">
                  <a
                    class="text-xs"
                    [routerLink]="['/workspaces', workspace.id]"
                    [ngClass]="{
                      'underline text-primary':
                        activeWorkspace?.id !== workspace.id,
                      'opacity-50 italic': activeWorkspace?.id === workspace.id
                    }"
                    (click)="onActivateWorkspace(workspace.id)"
                  >
                    {{
                      activeWorkspace?.id === workspace.id
                        ? 'Active'
                        : 'Activate'
                    }}
                  </a>
                </p>

                <div>
                  <button
                    class="mr-2"
                    type="button"
                    mat-raised-button
                    color="primary"
                    bdEditWorkspaceTrigger
                    [workspace]="workspace"
                    (editWorkspace)="onUpdateWorkspace(workspace.id, $event)"
                    [disabled]="!connected"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    mat-raised-button
                    color="primary"
                    (click)="onDeleteWorkspace(workspace.id)"
                    [disabled]="!connected"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </mat-list-item>
          </mat-list>

          <button
            class="w-full h-12 mb-2"
            type="button"
            mat-raised-button
            color="primary"
            bdEditWorkspaceTrigger
            (editWorkspace)="onCreateWorkspace($event)"
            [disabled]="!connected"
          >
            New workspace
          </button>

          <button
            class="w-full h-12"
            type="button"
            mat-raised-button
            color="accent"
            bdImportWorkspaceTrigger
            (importWorkspace)="onImportWorkspace($event)"
          >
            Import workspace
          </button>
        </div>
      </mat-menu>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkspacesStore, WorkspaceSelectorStore],
})
export class WorkspaceSelectorComponent {
  @ViewChild(MatMenu) private _workspaceMenu?: MatMenu;

  @Input() connected = false;

  @Input() set workspaceIds(value: string[] | null) {
    if (value !== null) {
      this._workspacesStore.setWorkspaceIds(value);
    }
  }

  readonly workspace$ = this._workspaceSelectorStore.workspace$;
  readonly workspaces$ = this._workspacesStore.workspaces$;

  constructor(
    private readonly _workspacesStore: WorkspacesStore,
    private readonly _workspaceSelectorStore: WorkspaceSelectorStore,
    private readonly _configStore: ConfigStore,
    private readonly _workspaceApiService: WorkspaceApiService,
    private readonly _notificationStore: NotificationStore
  ) {}

  private _closeMenu() {
    if (this._workspaceMenu) {
      this._workspaceMenu.closed.emit('click');
    }
  }

  onCreateWorkspace(workspaceName: string) {
    this._closeMenu();
    this._workspaceSelectorStore.createWorkspace(workspaceName);
  }

  onUpdateWorkspace(workspaceId: string, workspaceName: string) {
    this._closeMenu();
    this._workspaceSelectorStore.updateWorkspace({
      workspaceId,
      workspaceName,
    });
  }

  onDeleteWorkspace(workspaceId: string) {
    this._closeMenu();
    this._workspaceSelectorStore.deleteWorkspace(workspaceId);
  }

  onDownloadWorkspace(workspaceId: string) {
    this._closeMenu();
    this._workspaceSelectorStore.downloadWorkspace(workspaceId);
  }

  onActivateWorkspace(workspaceId: string) {
    this._configStore.setWorkspaceId(workspaceId);
  }

  onImportWorkspace(workspaceId: string) {
    this._workspaceApiService.findById(workspaceId).subscribe((workspace) => {
      if (workspace === null) {
        this._notificationStore.setError('Workspace does not exist.');
      } else {
        this._configStore.addWorkspace(workspaceId);
        this._configStore.setWorkspaceId(workspaceId);
      }
    });
  }
}