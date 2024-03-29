import path from 'path';
import { Model } from 'objection';
import BaseModel from '../BaseModel';
import User from '../User';

class Folder extends BaseModel {
  static get tableName() {
    return 'folder';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'folder.userId',
          to: 'user.id',
        },
      },
      dictionaries: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'Dictionary'),
        join: {
          from: 'folder.id',
          to: 'dictionary.folderId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'title'],
      properties: {
        id: { type: 'integer', description: 'The unique identifier in base' },
        userId: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 3000 },
      },
    };
  }
}

export default Folder;
