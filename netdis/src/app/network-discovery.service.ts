import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { collectExternalReferences } from '@angular/compiler';

export class NetworkedDevice {
  constructor(public ipAddress: string,
    public versions: DeviceVersion[]) {

    }
}

export class DeviceVersion {
  constructor(public name: string,
    public version: string) {

    }
}

@Injectable({
  providedIn: 'root'
})
export class NetworkDiscoveryService {

  constructor(private electronService: ElectronService,
    private http: HttpClient) { }

  discover(): Observable<NetworkedDevice[]> {


    return new Observable<NetworkedDevice[]>((observer : any) => {

      let devices = new Array<NetworkedDevice>();
      if(this.electronService.isElectronApp) {
        const netList =  this.electronService.remote.require('network-list');
        netList.scan({}, (err: any, arr: any[]) => {
          forkJoin(arr.map(x => this.checkForSoftware(x.ip).subscribe(device => {
            if(device) {
              console.log(device);
              devices.push(device);
            }
          }, error => {
            console.error(error);
          }
          ))).subscribe(done => {
            observer.next(devices);
            observer.complete();
          }, error => {
            
            console.error(error);
            observer.next(devices);
            observer.complete();
          });
        });
      }
      else {
        
        observer.next(devices);
        observer.complete();
      }
      
    });
    
  }

  private checkForSoftware(ip: string): Observable<NetworkedDevice> {
    return new Observable<any>(observer => {
      this.http.get<DeviceVersion[]>('http://' + ip + ':4601/api/v1/softwareVersions').subscribe((versions : any) => {
        observer.next(new NetworkedDevice(ip, versions));
        observer.complete();
      },
      error => {
        observer.complete();
      });
    });
  }
}
