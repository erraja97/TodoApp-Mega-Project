import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  //declare members
  client = new Client();
  account;

  //call the constructor
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //create new account method
  async createAccount({ email, password, name }) {
    try {
      //create userAccount using appwrite create function
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      //validate if user already exist or not
      if (userAccount) {
        //if user is already exist call login function
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("appwrite/auth :: createAccount :: error", error);
    }
  }

  //user login method
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("appwrite/auth :: login :: error", error);
    }
  }

  //get current user detail method
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite/auth :: getCurrentUser :: error", error);
    }
  }

  //logout method
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite/auth :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
