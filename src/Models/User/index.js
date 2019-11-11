import BaseModel from '../BaseModel';

class User extends BaseModel {
  static get tableName() {
    return 'user';
  }
}

export default User;
