import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-waiting-room",
  templateUrl: "waiting-room.html"
})
export class WaitingRoomPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
