import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";
import { v4 as uuidv4 } from "uuid";

export class TodoService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createTodo({ title, category, status, user }) {
    const todoId = uuidv4();
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        todoId,
        {
          title,
          category,
          status,
          todoId,
          user,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createTodo :: error", error);
    }
  }

  async readTodos(query = []) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        query
      );
    } catch (error) {
      console.log("Appwrite service :: readTodos :: error", error);
    }
  }

  async updateTodo(id, { title, category, status, user }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        {
          title,
          category,
          status,
          user,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateTodo :: error", error);
    }
  }

  async updateStatus(id, status) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        {
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateStatus :: error", error);
    }
  }

  async deleteTodo(id) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: deleteTodo :: error", error);
    }
  }
}

const todoService = new TodoService();
export default todoService;
