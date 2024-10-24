import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  //#no need to create instance for service like under.
  // private tasksService: TasksService;

  //#no need to use this.
  // constructor() {
  //   this.tasksService = new TasksService();
  // }

  //#use this instead because In Angular Service Dependency Injection will be created a Service by itself automatically
  // constructor(private tasksService: TasksService) {}

  //#use case IDServiceToken version
  constructor(@Inject(TasksServiceToken) private tasksService: TasksService) {}

  onAddTask(title: string, description: string) {
    this.tasksService.addTask({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
