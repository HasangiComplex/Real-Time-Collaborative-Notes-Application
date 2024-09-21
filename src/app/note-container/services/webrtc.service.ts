import { Injectable } from '@angular/core';
import * as SimplePeer from "simple-peer";

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {

  peers: { [key: string]: SimplePeer.Instance } = {};

  constructor() {}

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
}
