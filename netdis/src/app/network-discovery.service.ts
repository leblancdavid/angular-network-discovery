import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

//const nmap = require('libnmap');

@Injectable({
  providedIn: 'root'
})
export class NetworkDiscoveryService {

  constructor(private electronService: ElectronService) { }

  discover() {
    if(this.electronService.isElectronApp) {
      const nmap = this.electronService.remote.require('libnmap');
  
      nmap.discover(function(err: string | undefined, report: { [x: string]: any; }) {
        if (err) {
          console.error(err);
        }
       
        for (let item in report) {
          console.log(JSON.stringify(report[item]));
        }
      });
    }
    
  }
}
