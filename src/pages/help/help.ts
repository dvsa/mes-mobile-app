import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../../shared/models/store.model';
import {
  HelpViewDidEnter,
  RecordingToggled,
  MessageHistoryToggled,
  RecordingHistoryToggled,
} from './help.actions';
import { Observable } from 'rxjs/Observable';
import { getHelpState } from './help.reducer';
import { getIsRecording, getIsMessageHistoryVisible, getIsRecordingHistoryVisible } from './help.selector';
import { map, tap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import {
  MessageTypeModel,
  MessageType,
  messageTypeOptions,
  MessageTypeDescription,
  MessageModel,
} from './help.constants';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';
import { AudioRecorderProvider } from '../../providers/audio-recorder/audio-recorder';
import { DateTime } from '../../shared/helpers/date-time';
import { CameraOptions, Camera } from '@ionic-native/camera';
// import { DeviceProvider } from '../../providers/device/device';

interface HelpPageState {
  isRecording$: Observable<boolean>;
  isMessageHistoryVisible$: Observable<boolean>;
  isRecordingHistoryVisible$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage extends BasePageComponent implements OnInit {

  pageState: HelpPageState;
  formGroup: FormGroup;
  messageTypeOptions: MessageTypeModel[] = messageTypeOptions;
  messageType: MessageType;
  message: string = '';
  sentMessages: MessageModel[] = [];
  disableASAM: boolean = false;

  location$: Observable<Geoposition>;
  position: Geoposition;
  subscription: Subscription = Subscription.EMPTY;

  isRecording: boolean = false;
  recordings = [];

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private store$: Store<StoreModel>,
    private geolocation: Geolocation,
    private audioRecorder: AudioRecorderProvider,
    private alertController: AlertController,
    private camera: Camera,
    // private deviceProvider: DeviceProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.disableASAM = navParams.get('disableASAM');
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    this.pageState = {
      isRecording$: this.store$.pipe(
        select(getHelpState),
        map(getIsRecording),
        tap(isRecording => this.isRecording = isRecording),
      ),
      isMessageHistoryVisible$: this.store$.pipe(
        select(getHelpState),
        map(getIsMessageHistoryVisible),
      ),
      isRecordingHistoryVisible$: this.store$.pipe(
        select(getHelpState),
        map(getIsRecordingHistoryVisible),
      ),
    };

    this.getFiles();

    this.formGroup.addControl('messageType', new FormControl());

    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      console.log(position.coords.latitude, position.coords.longitude);
      this.position = position;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.location$ = this.geolocation.watchPosition();
    this.subscription = this.location$.subscribe((position: Geoposition) => {
      console.log('Geo location data updated', position);
      this.position = position;
    });
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new HelpViewDidEnter());
    if (this.disableASAM) {
      console.log('need to disable ASAM to allow examiner to leave app and use camera');
      // this.deviceProvider.disableSingleAppMode();
    }
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.disableASAM) {
      console.log('need to re-enable ASAM');
      // this.deviceProvider.enableSingleAppMode();
    }
  }

  handleDoneButtonClick(): void {
    this.navController.pop();
  }

  emergencyAlert(): void {
    console.log('emergency alert');
    const alert = this.alertController.create({
      title: 'Emergency Alert',
      message: 'Your message has been sent',
      buttons: ['Dismiss'],
    });
    alert.present();
  }

  toggleRecording(): void {
    if (!this.isRecording) {
      this.audioRecorder.recordAudio();
    } else {
      this.audioRecorder.stopRecordingAudio();
    }
    this.getFiles();
    this.store$.dispatch(new RecordingToggled());
  }

  showSavedRecordings(): void {
    console.log('show saved recordings');
  }

  sendMessage(): void {
    if (!this.message) {
      return;
    }
    this.sentMessages.push({
      body: this.message,
      date: new Date(),
    });
    this.formGroup.controls['messageType'].reset();

    const alert = this.alertController.create({
      title: 'Success',
      message: 'Your message has been sent',
      buttons: ['Dismiss'],
    });
    alert.present();
  }

  messageTypeChanged(val: MessageType): void {
    this.messageType = val;
    this.message = MessageTypeDescription[val] || '';
  }

  messageChanged(val: string) {
    this.message = val;
  }

  showPreviousMessages(): void {
    this.store$.dispatch(new MessageHistoryToggled());
  }

  showPreviousRecordings(): void {
    this.store$.dispatch(new RecordingHistoryToggled());
  }

  getFormattedMessageDate(date: Date): string {
    return new DateTime(date).format('DD/MM/YYYY HH:mm');
  }

  getLocation(): string {
    if (!this.position || !this.position.coords) {
      return 'unknown';
    }
    const lat = this.position.coords.latitude.toFixed(6).toString();
    const lng = this.position.coords.longitude.toFixed(6).toString();
    return `${lat}, ${lng}`;
  }

  getFiles(): void {
    this.audioRecorder.getFileList()
      .then((files) => {
        this.recordings = files.filter(entry => !entry.isDirectory).map(entry => entry.name);
        console.log('list', JSON.stringify(this.recordings));
      })
      .catch(err => console.log(err));
  }

  openCamera(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
      const base64Image = `data:image/jpeg;base64,${imageData}`;
      console.log(base64Image.length);
    }, (err) => {
      console.log('camera error', err);
    });
  }

}
