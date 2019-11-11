import { Model } from 'objection';
import knex from '../../start/db';

class BaseModel extends Model {
  $beforeUpdate() {
    this.updated_at = knex.fn.now();
  }
}

export default BaseModel;
