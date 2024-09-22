import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as SimplePeer from "simple-peer";


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

  sendSignalToFirebase(signal: any, uid: string): void {
    this.db.list(`signals/${uid}`).set('signal', signal);
  }

  clearSignal(uid: string): void {
    this.db.list(`signals/${uid}`).remove();
  }
}
