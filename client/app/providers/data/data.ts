import {Injectable} from 'angular2/core';


@Injectable()
export class Data {
  private db;
  private remote: string;

  constructor() {
    var PouchDB = require('pouchdb');
    this.db = new PouchDB('pizzas');
    this.remote = '';
  }

  sync() {
    const options = {
      live: false,
      retry: true
    };

    return this.db.sync(this.remote, options);
  }

  add(doc){
    return this.db.put(doc);
  }

  getAll(){
    return this.db.allDocs({
      include_docs: true
    }).then((res) => {
      return res.rows.map((row) => {
        return row.doc;
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}
