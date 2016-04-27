import {Injectable} from 'angular2/core';

var PouchDB = require('pouchdb');

@Injectable()
export class Data {
  constructor() {
    this.db = new PouchDB('pizzas');
    this.remote = '';
    this.changeCallback = () => {};
  }

  registerChange(callback) {
    this.changeCallback = callback;
  }

  sync() {
    const options = {
      live: false,
      retry: true
    };

    return this.db.sync(this.remote, options)
        .then(() => this.changeCallback());
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
