import { Model } from 'objection';
import path from 'path';
import BaseModel from '../BaseModel';

class User extends BaseModel {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'Post'),
        join: {
          from: 'user.id',
          to: 'post.userId',
        },
      },
    };
  }

  userToJSON() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      created_at: this.created_at,
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'username'],
      properties: {
        id: { type: 'integer', description: 'The unique identifier in base' },
        username: { type: 'string', minLength: 1, maxLength: 25 },
        email: {
          type: 'string',
          format: 'email',
          minLength: 1,
          maxLength: 255,
        },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default User;
