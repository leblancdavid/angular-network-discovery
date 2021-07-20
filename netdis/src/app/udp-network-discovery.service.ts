import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';
import { NetworkedDevice } from './network-discovery.service';

@Injectable({
  providedIn: 'root'
})
export class UdpNetworkDiscoveryService {
  
  private discovery?: any;
  devices = new Array<NetworkedDevice>();
  constructor(private electronService: ElectronService,
    private http: HttpClient) { 

    }

  startDiscovering() {
    if(this.electronService.isElectronApp) {
      if(this.discovery == null) {
        var Discovery = this.electronService.remote.require('udp-discovery').Discovery;
        this.discovery = new Discovery(4602);
      }

      var name = 'test';
      var interval = 500;
      var available = true;

      var serv = {
        port: 4602,
        proto: 'tcp',
        addrFamily: 'IPv4',
        bonus: {
          name: 'Edmond',
        }
      };
      this.discovery.announce(name, serv, interval, available);

      this.discovery.on('MessageBus', function(event: any, data: any) {
        console.log('event:',event);
        console.log('data:',data);
      });

      this.discovery.on('available', (name: any, data: any, reason: any) => {
        console.log('available ',name);
        console.log('data',data);
        console.log('reason',reason);
        var obj = {a: 1, b: '2', c: true, d: {e: 333}};
        this.discovery.sendEvent('Hello', obj);
      
        console.log(name,':','available:',reason);
        console.log(data);
      });
      
      this.discovery.on('unavailable', function(name: any, data: any, reason: any) {
        console.log(name,':','unavailable:',reason);
        console.log(data);
      });
    }
  }
}
