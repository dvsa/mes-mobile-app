import { Injectable } from '@angular/core';
import { File, DirectoryEntry, FileEntry, Entry } from '@ionic-native/file';
import { MediaObject } from '@ionic-native/media';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AudioRecorderProvider {
  public isRecordingChange$: Subject<boolean> = new Subject();
  public fileLengthChange$: Subject<number> = new Subject();

  isRecording = false;
  playing = false;

  audio: MediaObject;
  fileName: string;
  fileLength: number = 0;
  fileSize: string = '';

  constructor(private file: File) {}

  // audio debrief
  recordAudio() {
    this.fileName = `audio_recording_${new Date().getTime()}.m4a`;
    if (!this.isRecording) {
      this.file
        .createFile(this.file.dataDirectory, this.fileName, true)
        .then(() => {
          const src = this.file.dataDirectory.replace(/^file:\/\//, '') + this.fileName;
          // ionic media.create is buggy (getDuration returns always -1), the solution is to use raw cordova API
          this.audio = new (<any>window).Media(
            src,
            this.mediaSuccess,
            this.mediaError,
            this.mediaStatus,
          );
          this.audio.startRecord();
          this.isRecordingChange$.next(true);
        })
        .catch(this.logError);
    }
  }

  stopRecordingAudio() {
    if (!this.audio) {
      return;
    }
    this.audio.stopRecord();

    this.countDuration();

    this.file
      .resolveLocalFilesystemUrl(this.file.dataDirectory)
      .then((directoryEntry: DirectoryEntry) => {
        return this.file.getFile(directoryEntry, this.fileName, { create: false });
      })
      .then((fileEntry: FileEntry) => {
        fileEntry.file((fileObject) => {
          this.fileSize = `${fileObject.size} bytes`;
        }, this.logError);
        this.isRecordingChange$.next(false);
      })
      .catch(this.logError);
  }

  // Workaround In order to get file duration, we need to play recording
  countDuration() {
    let counter = 0;
    this.audio.play();

    const timerDur = setInterval(() => {
      // workaround we can't stop playback just after call .play(). We trying to do it in interval...
      this.audio.pause();
      this.audio.stop();
      counter = counter + 100;
      if (counter > 2000) {
        clearInterval(timerDur);
      }
      this.audio.getDuration();
      const dur = this.audio.getDuration();
      if (dur > 0) {
        clearInterval(timerDur);
        this.fileLengthChange$.next(dur);
      }
    }, 100);
  }

  playAudio() {
    this.playing = true;
    this.audio.play();
  }

  pauseAudio() {
    this.playing = false;
    this.audio.pause();
  }

  deleteAudio() {
    this.audio.stop();
    this.audio.release();
    this.file.removeFile(this.file.dataDirectory, 'audio_recording.m4a');
    this.isRecordingChange$.next(false);
    this.fileLengthChange$.next(null);
    this.fileSize = null;
  }

  pauseRecording() {
    this.audio.pauseRecord();
  }

  resumeRecording() {
    this.audio.resumeRecord();
  }

  getFileList(): Promise<Entry[]> {
    return new Promise((resolve, reject) => {
      this.file
        .resolveLocalFilesystemUrl(this.file.dataDirectory)
        .then((directoryEntry: DirectoryEntry) => {
          // console.log('directoryEntry', JSON.stringify(directoryEntry));
          const reader = directoryEntry.createReader();
          reader.readEntries(resolve, reject);
        })
        .catch((err) => {
          this.logError(err);
          reject(err);
        });
    });
  }

  mediaSuccess(e) {
    console.log('media success ', e);
  }

  mediaError(e) {
    console.log('media error ', e);
  }

  mediaStatus(e) {
    console.log('media status ', e);
  }

  logError(error) {
    console.log(error);
  }
}
