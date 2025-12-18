import Vue from 'vue';
import Vuex from 'vuex';
import { TodoModel } from '@/shared/todoService/Model/TodoModel';

Vue.use(Vuex);

export interface RootState {
  todos: TodoModel[];
}

export default new Vuex.Store<RootState>({
  state: {
    todos: []
  },
  mutations: {
    setTodos(state, todos: TodoModel[]) {
      state.todos = todos;
    },
    addTodo(state, todo: TodoModel) {
      state.todos = [...state.todos, todo];
    },
    updateTodo(state, todo: TodoModel) {
      state.todos = state.todos.map(item => (item.id === todo.id ? todo : item));
    },
    deleteTodo(state, id: string) {
      state.todos = state.todos.filter(item => item.id !== id);
    }
  }
});
