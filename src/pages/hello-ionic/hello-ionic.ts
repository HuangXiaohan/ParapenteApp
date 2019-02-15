import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  socket:any
  socketRasp: any
  public myUserId: string;
  chats = [];
  chat_input:string;

  constructor(public navCtrl: NavController) {
    if(this.myUserId == null){
      this.myUserId = Date.now().toString();
    }

    this.socket = io('http://10.212.104.223:8000');
    this.socketRasp = io('http://192.168.137.226:8080');

    //this.Receive();
  }

  send(msg) {
    if(msg!='') {
      // Assign user typed message along with generated user id
      //let saltedMsg = msg;
      // Push the message through socket
      this.socket.emit('test', msg);
      console.log(msg);

      this.socketRasp.emit('test', msg);
      console.log("Raspberry: "+ msg);

    }

    this.chat_input =  '';
  }

  Receive(){
    // Socket receiving method
    this.socket.on('message', (msg) => {
      // separate the salted message with "#" tag
      //console.log(msg);
      let saletdMsgArr = msg.split('#');
      var item= {};
      // check the sender id and change the style class
      if(saletdMsgArr[0] == this.myUserId){
        item = { "styleClass":"chat-message right", "msgStr":saletdMsgArr[1] };
      }
      else{
        item= { "styleClass":"chat-message left", "msgStr":saletdMsgArr[1] };
      }
      // push the bind object to array
      // Final chats array will iterate in the view
      console.log(item);
      this.chats.push(item);
    });
  }
}
