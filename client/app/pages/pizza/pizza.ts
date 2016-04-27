import {Page} from 'ionic-angular';
import {Data} from '../../providers/data/data';


@Page({
  templateUrl: 'build/pages/pizza/pizza.html',
})
export class Pizza {
  private items: Array<any>;
  private dataService: Data;

  reload() {
    return this.dataService.getAll().then(docs => {
      this.items = docs;
    });
  }

  constructor(dataService: Data) {
    this.items = [];
    this.dataService = dataService;

    this.reload();
  }

  itemSelected(item) {
    alert(item._id);
  }

  addData() {
    const id = new Date();
    const pizza: any = {
      _id: id
    };

    pizza.title = prompt('Which pizza do you want to add?');

    if (!pizza.title)
      return;

    this.dataService.add(pizza)
        .then(() => this.reload());
  }

  sync() {
    this.dataService.sync()
        .then(() => this.reload());
  }
}
