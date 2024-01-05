import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos_tabView: [],
  todos_tableView: [],
  todos_category: [],
  isTodoAdded: false,
  isTodoFetched: false,
  isTodoChecked: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    storeTodo: (state, action) => {
      state.todos_tabView = action.payload;
      state.isTodoFetched = true;
    },
    addedTodo: (state, action) => {
      state.isTodoAdded = action.payload;
    },
    storeTodoTableView: (state, action) => {
      state.todos_tableView = action.payload;
    },
    storeTodoCategory: (state, action) => {
      const category = state.todos_category;
      if (!category.includes(action.payload)) {
        state.todos_category.push(action.payload);
      }
    },
    todoChecked: (state, action) => {
      state.isTodoChecked = action.payload;
    },
  },
});

export const {
  storeTodo,
  addedTodo,
  storeTodoCategory,
  storeTodoTableView,
  todoChecked,
} = todoSlice.actions;
export default todoSlice.reducer;
