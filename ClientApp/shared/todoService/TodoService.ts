import { Inject, Service } from 'vue-di-container';
import { AxiosService } from '@/Services/AxiosService';
import { TodoModel } from './Model/TodoModel';

interface CreateTodoPayload {
  title: string;
}

interface UpdateTodoPayload {
  isCompleted: boolean;
}

@Service()
export class TodoService {
  @Inject(AxiosService)
  private axiosService!: AxiosService;

  public async getTodos(): Promise<TodoModel[]> {
    const response = await this.axiosService.axios.get<TodoModel[]>('/api/Todos');
    return response.data;
  }

  public async createTodo(title: string): Promise<TodoModel> {
    const payload: CreateTodoPayload = { title };
    const response = await this.axiosService.axios.post<TodoModel>('/api/Todos', payload);
    return response.data;
  }

  public async updateTodo(id: string, isCompleted: boolean): Promise<TodoModel> {
    const payload: UpdateTodoPayload = { isCompleted };
    const response = await this.axiosService.axios.put<TodoModel>(`/api/Todos/${id}`, payload);
    return response.data;
  }

  public async deleteTodo(id: string): Promise<void> {
    await this.axiosService.axios.delete(`/api/Todos/${id}`);
  }
}
