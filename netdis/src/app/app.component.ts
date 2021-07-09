import { Component, OnInit } from '@angular/core';
import { DeviceVersion, NetworkDiscoveryService, NetworkedDevice } from './network-discovery.service';

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

  constructor(private networkDiscoveryService: NetworkDiscoveryService) {
    this.devices = [];
    this.devices.push(new NetworkedDevice('localhost', []));
  }

  ngOnInit(): void {
    this.refresh();
  }


  refresh() {
    this.isScanning = true;
    this.networkDiscoveryService.discover().subscribe(x => {
      this.devices = x;
      this.isScanning = false;
    }, error => {
      this.errorMessage = error;
      this.isScanning = false;
    });
  }
}
