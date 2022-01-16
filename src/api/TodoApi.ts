import { CommonProps } from "./BaseApi";

export interface TodoRes extends CommonProps {
  id: string;
  todoList: Todo[];
}

export type Todo = {
  todoName: string;
  isComplete: boolean;
}
