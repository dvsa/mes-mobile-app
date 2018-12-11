import { Directive, ElementRef, HostListener, Input } from '@angular/core';

enum KeyCode {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  ESC = 27,
  Space = 32,
  Dot = 46,
  Zero = 48,
  Nine = 57,
  A = 65,
  C = 67,
  V = 86,
  X = 88,
  Z = 90,
  a = 97,
  n = 110,
  z = 122
}
@Directive({
  selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {
  inputElement: ElementRef;

  @Input('appInputRestriction') appInputRestriction: string;
  arabicRegex = '[\u0600-\u06FF]';

  constructor(el: ElementRef) {
    this.inputElement = el;
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event) {
    if (this.appInputRestriction === 'integer') {
      this.integerOnly(event);
    } else if (this.appInputRestriction === 'noSpecialChars') {
      this.noSpecialChars(event);
    }
  }

  integerOnly(event) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }

    if (
      [KeyCode.Dot, KeyCode.Backspace, KeyCode.Tab, KeyCode.ESC, KeyCode.Enter, KeyCode.n].indexOf(
        e.keyCode
      ) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === KeyCode.A && e.ctrlKey) ||
      // Allow: Ctrl+C
      (e.keyCode === KeyCode.C && e.ctrlKey) ||
      // Allow: Ctrl+V
      (e.keyCode === KeyCode.V && e.ctrlKey) ||
      // Allow: Ctrl+X
      (e.keyCode === KeyCode.X && e.ctrlKey)
    ) {
      // let it happen, don't do anything
      return;
    }

    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
  }

  noSpecialChars(event) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }

    const k = event.keyCode;
    if (
      (k >= KeyCode.A && k <= KeyCode.Z) ||
      (k >= KeyCode.a && k <= KeyCode.z) ||
      k === KeyCode.Backspace ||
      k === KeyCode.Space ||
      (k >= KeyCode.Zero && k <= KeyCode.Nine)
    ) {
      return;
    }

    const ch = String.fromCharCode(e.keyCode);
    const regEx = new RegExp(this.arabicRegex);

    if (regEx.test(ch)) {
      return;
    }

    e.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(event) {
    let regex;

    if (this.appInputRestriction === 'integer') {
      regex = /[0-9]/g;
    } else if (this.appInputRestriction === 'noSpecialChars') {
      regex = /[a-zA-Z0-9\u0600-\u06FF]/g;
    }

    const e = <ClipboardEvent>event;
    const pasteData = e.clipboardData.getData('text/plain');
    let m;
    let matches = 0;

    while ((m = regex.exec(pasteData)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex += 1;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match) => (matches += 1));
    }

    if (matches !== pasteData.length) {
      e.preventDefault();
    } else {
      return;
    }
  }
}
