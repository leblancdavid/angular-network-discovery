import { Component } from '@angular/core';
import { NetworkDiscoveryService } from './network-discovery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netdis';

  constructor(private networkDiscoveryService: NetworkDiscoveryService) {
    networkDiscoveryService.discover();
  }
}
