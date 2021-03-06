import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetworkDiscoveryService } from './network-discovery.service';

import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { UdpNetworkDiscoveryService } from './udp-network-discovery.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    HttpClientModule 
  ],
  providers: [NetworkDiscoveryService, UdpNetworkDiscoveryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
