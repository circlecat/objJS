import { Model } from 'objection';
import BaseModel from '../BaseModel';
import Dictionary from '../Dictionary';

class Word extends BaseModel {
  static get tableName() {
    return 'word';
  }

  static get relationMappings() {
    return {
      dictionary: {
        relation: Model.BelongsToOneRelation,
        modelClass: Dictionary,
        join: {
          from: 'word.dictionaryId',
          to: 'dictionary.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'word', 'translation'],
      properties: {
        id: { type: 'integer', description: 'The unique identifier in base' },
        userId: { type: 'integer' },
        dictionaryId: { type: 'integer' },
        word: { type: 'string', minLength: 1, maxLength: 255 },
        translation: { type: 'string', minLength: 1, maxLength: 255 },
        public: { type: 'boolean' },
      },
    };
  }
}

export default Word;
