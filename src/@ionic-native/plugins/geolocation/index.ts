import { Injectable } from '@angular/core';
import { Cordova, Plugin, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';

declare const navigator: any;

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;

}

export interface Geoposition {
  timestamp: number;
}

export interface PositionError {
  code: number;
  message: string;
}

export interface GeolocationOptions {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;

}

@Plugin({
  pluginName: 'Geolocation',
  plugin: 'cordova-plugin-geolocation',
  pluginRef: 'navigator.geolocation',
  repo: 'https://github.com/apache/cordova-plugin-geolocation',
  install: 'ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"',
  installVariables: ['GEOLOCATION_USAGE_DESCRIPTION'],
  platforms: ['Amazon Fire OS', 'Android', 'Browser', 'iOS', 'Windows']
})
@Injectable()
export class Geolocation extends IonicNativePlugin {

 
  @Cordova({
    callbackOrder: 'reverse'
  })
  getCurrentPosition(options?: GeolocationOptions): Promise<Geoposition> { return; }

  watchPosition(options?: GeolocationOptions): Observable<Geoposition> {
    return new Observable<Geoposition>(
      (observer: any) => {
        let watchId = navigator.geolocation.watchPosition(observer.next.bind(observer), observer.next.bind(observer), options);
        return () => navigator.geolocation.clearWatch(watchId);
      }
    );
  }

}
