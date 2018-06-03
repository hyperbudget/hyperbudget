import * as Loki from 'lokijs';
import * as path from 'path';
import * as del from 'del';

import * as jwt from 'jsonwebtoken';
import { SystemConfig } from './config/system';

export class Utils {
  static loadCollection (colName, db: Loki): Promise<Collection<any>> {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
          const _collection = db.getCollection(colName) || db.addCollection(colName);
          resolve(_collection);
        });
    });
  }

  static delete_csv_upload(filename: string): void {
    const file = path.join(__dirname, '/../../csvs/', filename);

    del.sync([file]);
  }

  static getDB(): Loki {
    const db = new Loki(path.join(__dirname, '/../../db/db.db'), { persistenceMethod: 'fs' });
    return db;
  }

  static JWTSign(data: any): string {
    return jwt.sign(
      data,
      SystemConfig.config.app.token_secret,
      {
        expiresIn: SystemConfig.config.app.token_expiry,
      }
    );
  }
}
