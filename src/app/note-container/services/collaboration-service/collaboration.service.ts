import { Injectable } from '@angular/core';
import * as SimplePeer from 'simple-peer';
import {AngularFireDatabase} from "@angular/fire/compat/database";




@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  peers: { [key: string]: SimplePeer.Instance } = {};

  constructor(private db: AngularFireDatabase) {}

  createPeer(isInitiator: boolean, stream: MediaStream, signalCallback: (data: any) => void): SimplePeer.Instance {
    const peer = new SimplePeer({
      initiator: isInitiator,
      stream: stream,
      trickle: false
    });

    peer.on('signal', signalCallback);

    peer.on('error', err => {
      console.error('Peer error:', err);
    });

    return peer;
  }

  connectPeer(peer: SimplePeer.Instance, signal: any): void {
    peer.signal(signal);
  }

  // Store signal data in Firebase
  saveSignal(noteId: string, signal: any) {
    this.db.list(`signals/${noteId}`).push(signal);
  }

  // Listen for incoming signals
  listenForSignals(noteId: string) {
    return this.db.list(`signals/${noteId}`).snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const signal = action.payload.val();
        if (signal) {
          this.connectPeer(this.peers[noteId], signal); // Connect using the signal
        }
      });
    });
  }

}
