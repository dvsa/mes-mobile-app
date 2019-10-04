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
  ) {
    super(platform, navController, authenticationProvider);
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
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

}
