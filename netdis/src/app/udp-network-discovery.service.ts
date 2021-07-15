import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';
import { NetworkedDevice } from './network-discovery.service';

@Injectable({
  providedIn: 'root'
})
export class UdpNetworkDiscoveryService {
  
  devices = new Array<NetworkedDevice>();
  constructor(private electronService: ElectronService,
    private http: HttpClient) { }

  discover(): Observable<NetworkedDevice[]> {


    return new Observable<NetworkedDevice[]>((observer : any) => {

      if(this.electronService.isElectronApp) {
        this.devices = [];
        const netList =  this.electronService.remote.require('network-list');
        netList.scan({}, (err: any, arr: any[]) => {
          console.log('scanning network...');
          forkJoin(arr.map(x => this.checkForSoftware(x.ip))).subscribe(done => {
            observer.next(this.devices);
            observer.complete();
          }, error => {
            
            console.error(error);
            observer.next(this.devices);
            observer.complete();
          });
        });
      }
      else {
        
        observer.next(this.devices);
        observer.complete();
      }
      
    });
    
  }

  private checkForSoftware(ip: string): Observable<NetworkedDevice> {
    return new Observable<any>(observer => {
      this.http.get<DeviceVersion[]>('http://' + ip + ':4601/api/v1/softwareVersions').subscribe((versions : any) => {
        var d = new NetworkedDevice(ip, versions);
        this.devices.push(d);
        observer.next(d);
        observer.complete();
      },
      error => {
        observer.next(null);
        observer.complete();
      });
    });
  }
}
