import {Page} from 'ionic-angular';
import {Data} from '../../providers/data/data';


@Page({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  static get parameters(){
    return [[Data]];
  }

  reload() {
    return this.dataService.getAll().then(docs => {
      this.items = docs;
    });
  }

  constructor(dataService) {
    this.items = [];
    this.dataService = dataService;

    this.reload();
    this.dataService.registerChange(() => this.reload());
  }

  itemSelected(item) {
    alert(item._id);
  }

  addData() {
    const id = new Date();
    const pizza = {
      _id: id
    };

    pizza.title = prompt('Which pizza do you want to add?');

    if (!pizza.title)
        return;

    this.dataService.add(pizza)
        .then(() => this.reload());
  }
}
