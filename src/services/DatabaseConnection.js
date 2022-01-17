import mongoose from 'mongoose';

class DatabaseConnection {
  constructor() {
    mongoose.connect(
      `mongodb+srv://${process.env.USER_DATABASE}:${process.env.PASSWORD_DATABASE}@testlinkapi.zcwrx.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
    ).catch(err => console.log(err));
  }
}

export default new DatabaseConnection();
