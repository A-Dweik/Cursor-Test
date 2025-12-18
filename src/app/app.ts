import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Task,
  TaskActivity,
  TaskCardView,
  TaskColumn,
  TaskFilters,
  TaskInsight,
  Milestone,
  ServicePulse,
  TaskManagerService
} from './task-manager.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly taskManager = inject(TaskManagerService);

  readonly tasks = signal<Task[]>(this.taskManager.getTasks());
  readonly filters = signal<TaskFilters>({
    search: '',
    status: 'all',
    priority: 'all',
    owner: 'all'
  });

  readonly filteredTasks = computed<Task[]>(() =>
    this.taskManager.applyFilters(this.tasks(), this.filters())
  );
  readonly boardColumns = computed<TaskColumn[]>(() =>
    this.taskManager.getColumns(this.filteredTasks())
  );
  readonly insightCards = computed<TaskInsight[]>(() => this.taskManager.getInsights(this.tasks()));
  readonly milestones = computed<Milestone[]>(() => this.taskManager.getMilestones(this.filteredTasks()));
  readonly activityFeed = computed<TaskActivity[]>(() => this.taskManager.getActivityFeed(this.tasks()));
  readonly servicePulse = computed<ServicePulse>(() => this.taskManager.getServicePulse(this.tasks()));

  readonly owners = this.taskManager.getOwners();
  readonly statuses = this.taskManager.getStatusFilters();
  readonly priorities = this.taskManager.getPriorityFilters();

  updateFilters(patch: Partial<TaskFilters>): void {
    this.filters.update((current) => ({ ...current, ...patch }));
  }

  clearFilters(): void {
    this.filters.set({
      search: '',
      status: 'all',
      priority: 'all',
      owner: 'all'
    });
  }

  syncBoard(): void {
    this.tasks.set(this.taskManager.getTasks());
    this.clearFilters();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.updateFilters({ search: value });
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement | null)?.value ?? 'all';
    this.updateFilters({ status: value as TaskFilters['status'] });
  }

  onPriorityChange(event: Event): void {
    const value = (event.target as HTMLSelectElement | null)?.value ?? 'all';
    this.updateFilters({ priority: value as TaskFilters['priority'] });
  }

  onOwnerChange(event: Event): void {
    const value = (event.target as HTMLSelectElement | null)?.value ?? 'all';
    this.updateFilters({ owner: value });
  }

  boardTrackBy = (_: number, column: TaskColumn) => column.key;
  taskTrackBy = (_: number, task: TaskCardView) => task.id;

  trendIcon(trend: TaskInsight['trend']): string {
    if (trend === 'up') {
      return '↑';
    }
    if (trend === 'down') {
      return '↓';
    }
    return '→';
  }

  dueLabel(task: TaskCardView): string {
    if (task.daysRemaining === 0) {
      return 'Due today';
    }
    if (task.isOverdue) {
      return `Overdue by ${Math.abs(task.daysRemaining)}d`;
    }
    return `Due in ${task.daysRemaining}d`;
  }
}
