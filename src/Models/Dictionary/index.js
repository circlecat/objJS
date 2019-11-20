import path from 'path';
import { Model } from 'objection';
import BaseModel from '../BaseModel';
import User from '../User';
import Folder from '../Folder';

class Dictionary extends BaseModel {
  static get tableName() {
    return 'dictionary';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'dictionary.userId',
          to: 'user.id',
        },
      },
      folder: {
        relation: Model.BelongsToOneRelation,
        modelClass: Folder,
        join: {
          from: 'dictionary.userId',
          to: 'folder.id',
        },
      },
      words: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'Word'),
        join: {
          from: 'dictionary.id',
          to: 'word.dictionaryId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'title', 'public'],
      properties: {
        id: { type: 'integer', description: 'The unique identifier in base' },
        userId: { type: 'integer' },
        folderId: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 3000 },
        public: { type: 'boolean' },
      },
    };
  }
}

export default Dictionary;
