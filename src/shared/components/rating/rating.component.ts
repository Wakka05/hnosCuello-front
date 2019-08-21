import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.less']
})
export class RatingComponent implements OnInit, OnChanges {

  // If control is null, is not editable
  @Input() control: FormControl;
  @Input() numRange: number = 5;
  // Init value
  @Input() valueRating: number = 0;

  constructor() { }

  ngOnInit() {
    this.initRating();
  }

  public rangeValue: boolean[];

  ngOnChanges(changes) {
    if (changes.valueRating && changes.valueRating.currentValue >= 0) {
      this.initRating();
    }
  }

  initRating(): void {
    this.rangeValue = Array(this.numRange).fill(false);
    if (this.valueRating) {
      for (let i = 0; i < Math.floor(this.valueRating); i++) {
        this.rangeValue[i] = true;
      }
    }
  }

  selected(index: number): void {
    if (this.control) {
      index = index + 1;
      this.control.setValue(index);
      const selected: boolean[] = Array(index).fill(true);
      const unSelected: boolean[] = Array(this.numRange - index).fill(false);
      this.rangeValue = selected.concat(unSelected);
    }
  }

  haveDecimals(i: number): number {
    if (i === Math.floor(this.valueRating)) {
      if (this.valueRating !== Math.floor(this.valueRating)) {
        return Math.floor(this.valueRating) + 1;
      }
    }
    return 0;
  }
}
