import { Injectable } from '@angular/core';
import * as SimplePeer from 'simple-peer';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class PeerServiceService {

  peer: any;
  roomRef: any;

  constructor(private db: AngularFireDatabase) {}

  createPeer(isInitiator: boolean, roomId: string) {
    this.roomRef = this.db.object(`rooms/${roomId}`);

    this.peer = new SimplePeer({ initiator: isInitiator, trickle: false });

    // Send signal data to Firebase
    this.peer.on('signal', (data: any) => {
      this.roomRef.update({ [isInitiator ? 'offer' : 'answer']: JSON.stringify(data) });
    });

    // Listen for peer connection
    this.peer.on('data', (data: any) => {
      const receivedData = JSON.parse(data.toString());
      this.updateLocalDocument(receivedData);
    });

    // Listen for signals from Firebase
    this.roomRef.valueChanges().subscribe((room: any) => {
      if (isInitiator && room?.answer) {
        this.peer.signal(JSON.parse(room.answer));
      } else if (!isInitiator && room?.offer) {
        this.peer.signal(JSON.parse(room.offer));
      }
    });
  }

  sendMessage(update: any) {
    this.peer.send(JSON.stringify(update));
  }

  updateLocalDocument(data: any) {
    console.log('Received update from peer:', data);
  }
}
