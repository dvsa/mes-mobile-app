import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ModalEvent } from './upload-rekey-modal.constants';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { Observable } from 'rxjs/Observable';
import { getRekeyReasonState } from './../../rekey-reason.reducer';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { getIsUploading, getHasTriedUploading, getHasUploaded } from './../../rekey-reason.selector';
import { merge } from 'rxjs/observable/merge';
import { SendCurrentTest } from '../../../../modules/tests/tests.actions';
import { UploadRekeyModalViewWillEnter } from '../../rekey-reason.actions';

interface UploadRekeyModalPageState {
  isUploading$: Observable<boolean>;
  hasUploaded$: Observable<boolean>;
  hasTriedUploading$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'upload-rekey-modal',
  templateUrl: 'upload-rekey-modal.html',
})
export class UploadRekeyModal {

  pageState: UploadRekeyModalPageState;
  subscription: Subscription = Subscription.EMPTY;

  isUploading: boolean = false;
  hasUploaded: boolean = false;
  hasTriedUploading: boolean = false;

  success: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    public store$: Store<StoreModel>,
    public params: NavParams,
  ) {
    this.success = params.get('success');
  }

  ngOnInit(): void {
    this.pageState = {
      isUploading$: this.store$.pipe(
        select(getRekeyReasonState),
        map(getIsUploading),
      ),
      hasUploaded$: this.store$.pipe(
        select(getRekeyReasonState),
        map(getHasUploaded),
      ),
      hasTriedUploading$: this.store$.pipe(
        select(getRekeyReasonState),
        map(getHasTriedUploading),
      ),
    };

    const { isUploading$, hasUploaded$, hasTriedUploading$ } = this.pageState;

    this.subscription = merge(
      isUploading$.pipe(map((result) => {
        console.log('isUploading$', result);
        this.isUploading = result;
      })),
      hasUploaded$.pipe(map((result) => {
        console.log('hasUploaded$', result);
        this.hasUploaded = result;
      })),
      hasTriedUploading$.pipe(map((result) => {
        console.log('hasTriedUploading$', result);
        this.hasTriedUploading = result;
      })),
    ).subscribe();
  }

  ionViewWillEnter() {
    this.store$.dispatch(new UploadRekeyModalViewWillEnter());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onUpload() {
    this.store$.dispatch(new SendCurrentTest(this.success));
  }

  onContinue() {
    // return to journal
    // this.store$.dispatch(new SendCurrentTest());
    this.viewCtrl.dismiss(ModalEvent.CONTINUE);
  }

}
