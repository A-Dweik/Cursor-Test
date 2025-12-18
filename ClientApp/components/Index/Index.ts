import { Component, Vue, Inject } from 'vue-property-decorator';
import { UserService } from '@/shared/userService/UserService';
import { TelemetryService } from '@/Services/TelemetryService';
import { TodoService } from '@/shared/todoService/TodoService';
import { TodoModel } from '@/shared/todoService/Model/TodoModel';
import { RootState } from '@/store';
import template from './IndexPage.html';

@Component({
  template
})
export default class Index extends Vue {
  @Inject(UserService)
  private userService!: UserService;

  @Inject(TelemetryService)
  private telemetryService!: TelemetryService;

  @Inject(TodoService)
  private todoService!: TodoService;

  private userName: string = '';
  private newTodoTitle: string = '';
  private loadingTodos: boolean = false;
  private creatingTodo: boolean = false;

  public async mounted(): Promise<void> {
    this.telemetryService.trackPageView('Todos Home');
    await Promise.all([this.loadUser(), this.loadTodos()]);
  }

  public get todos(): TodoModel[] {
    return (this.$store.state as RootState).todos;
  }

  public get hasTodos(): boolean {
    return this.todos.length > 0;
  }

  public async addTodo(): Promise<void> {
    if (!this.newTodoTitle.trim()) {
      return;
    }

    this.creatingTodo = true;

    try {
      const todo = await this.todoService.createTodo(this.newTodoTitle.trim());
      this.$store.commit('addTodo', todo);
      this.newTodoTitle = '';
      this.telemetryService.trackEvent('TodoCreated', { todoId: todo.id });
    } finally {
      this.creatingTodo = false;
    }
  }

  public async toggleTodo(todo: TodoModel): Promise<void> {
    const updated = await this.todoService.updateTodo(todo.id, !todo.isCompleted);
    this.$store.commit('updateTodo', updated);
    this.telemetryService.trackEvent('TodoUpdated', { todoId: updated.id, completed: updated.isCompleted });
  }

  public async deleteTodo(todo: TodoModel): Promise<void> {
    await this.todoService.deleteTodo(todo.id);
    this.$store.commit('deleteTodo', todo.id);
    this.telemetryService.trackEvent('TodoDeleted', { todoId: todo.id });
  }

  private async loadUser(): Promise<void> {
    const user = await this.userService.getUserInfo();
    if (user) {
      this.userName = user.name;
      this.telemetryService.setAuthenticatedUserContext(user.userId);
    }
  }

  private async loadTodos(): Promise<void> {
    this.loadingTodos = true;
    try {
      const todos = await this.todoService.getTodos();
      this.$store.commit('setTodos', todos);
    } finally {
      this.loadingTodos = false;
    }
  }

  public formatDate(date: string): string {
    return new Date(date).toLocaleString('ar-SA');
  }
}
