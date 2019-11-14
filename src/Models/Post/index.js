import { Model } from 'objection';
import BaseModel from '../BaseModel';
import User from '../User';

class Post extends BaseModel {
  static get tableName() {
    return 'post';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'post.userId',
          to: 'user.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'title', 'body'],
      properties: {
        id: { type: 'integer', description: 'The unique identifier in base' },
        userId: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        body: { type: 'string', minLength: 1, maxLength: 10000 },
      },
    };
  }
}

export default Post;
