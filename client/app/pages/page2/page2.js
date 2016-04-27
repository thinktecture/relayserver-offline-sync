import {Page} from 'ionic-angular';
import {Data} from '../../providers/data/data';


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  static get parameters(){
    return [[Data]];
  }

  constructor(dataService) {
    this.dataService = dataService;
  }

  sync() {
    this.dataService.sync();
  }
}
