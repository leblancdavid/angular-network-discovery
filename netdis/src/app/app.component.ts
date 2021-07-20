import { Component, OnInit } from '@angular/core';
import { NetworkedDevice } from './network-discovery.service';
import { UdpNetworkDiscoveryService } from './udp-network-discovery.service';

declare const broadcastInstrumentDiscovery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'netdis';

  public devices: NetworkedDevice[];
  public isScanning = false;
  public errorMessage = '';

  constructor(private networkDiscoveryService: UdpNetworkDiscoveryService) {
    this.devices = [];
    this.devices.push(new NetworkedDevice('localhost', []));
  }

  ngOnInit(): void {
    this.refresh();
  }


  refresh() {
    broadcastInstrumentDiscovery(JSON.stringify({
      status: 'discover'
    }));
    this.isScanning = true;
    //this.networkDiscoveryService.startDiscovering();
    /*
    this.networkDiscoveryService.discover().subscribe(x => {
      this.devices = x;
      this.isScanning = false;
    }, error => {
      this.errorMessage = error;
      this.isScanning = false;
    });
    */
  }
}
