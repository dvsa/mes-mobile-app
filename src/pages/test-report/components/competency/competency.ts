import { Component, Input, ViewChild, ElementRef, RendererFactory2, Renderer2 } from '@angular/core';

declare const Hammer: any;

@Component({
  selector: 'competency',
  templateUrl: 'competency.html',
})
export class CompetencyComponent {

  @Input()
  label: string;

  faultCount: number = 0;

  private hammerManager: any;
  private renderer: Renderer2;
  private pressTime = 300;

  @ViewChild('competencyButton')
  button: ElementRef;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.init(this.button, this.recordFault);
  }

  init(element: ElementRef, action: Function) {
    this.hammerManager = new Hammer.Manager(element.nativeElement);

    this.hammerManager.add(new Hammer.Press({
      event: 'pressAndHold',
      time: this.pressTime,
    }));

    this.hammerManager.on('pressAndHold', () => {
      this.recordFault();
      this.renderer.removeClass(element.nativeElement, 'press');
    });
  }

  recordFault = () => {
    console.log('I AM RECORDING A FAULT');
    this.faultCount = this.faultCount + 1;
  }
}
