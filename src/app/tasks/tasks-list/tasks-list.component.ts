import { Component, computed, inject, signal } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksServiceToken } from '../../../main';
import {
  TASK_STATUS_OPTION,
  TaskStatusOptionsProvider,
} from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionsProvider],
})
export class TasksListComponent {
  private tasksService = inject(TasksServiceToken);
  selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTION);

  // using computed and service manage a status.
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'OPEN':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
