import BaseModel from '../BaseModel';

class User extends BaseModel {
  static get tableName() {
    return 'user';
  }

  static jsonSchema() {
    return {
      type: 'object',
      required: ['email, password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 25 },
        email: { type: 'email', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default User;
