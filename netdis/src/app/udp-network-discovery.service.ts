import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { NetworkedDevice } from './network-discovery.service';

//declare var instrumentDiscoveryClient: any;

@Injectable({
  providedIn: 'root'
})
export class UdpNetworkDiscoveryService {
  
  devices = new Array<NetworkedDevice>();
  instrumentDiscoveryClient: any;
  constructor(private electronService: ElectronService,
    private http: HttpClient) { 
      if(this.electronService.isElectronApp) {
        this.devices = [];
          const dgram =  this.electronService.remote.require('dgram');
  
          this.instrumentDiscoveryClient = dgram.createSocket("udp4");
          this.instrumentDiscoveryClient.bind(4603, '0.0.0.0', () => {
            this.instrumentDiscoveryClient.setBroadcast(true);
          });

          this.instrumentDiscoveryClient.on('message', (msg: any, rinfo: any) => {
            console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
          });
        }
    }

  startDiscovering() {
    console.log('Starting discovery');
    if(this.instrumentDiscoveryClient) {
      const discoveryMessage = JSON.stringify({
        status: 'discover'
      });
      console.log('Sending message: ' + discoveryMessage);
      this.instrumentDiscoveryClient.send(Buffer.from(discoveryMessage), 0, discoveryMessage.length, 4602, "0.0.0.0", 
       (err: any) => {
          if (err) {
              console.log(err);
          } else {
              console.log("Message sent");
          }
      });
    }
  }
}
