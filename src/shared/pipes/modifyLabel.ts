import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyLabel',
})
export class ModifyLabel implements PipeTransform {

  /**
   * Pipe to convert competency label dynamically
   * @param value
   * @param isBikeCategory
   * @param fault
   */
  transform(value: string, isBikeCategory: boolean, fault: string): string {
    // For CatA tests change move off to move away
    if (isBikeCategory && (fault === 'moveOffSafety' ||
                           fault === 'moveOffControl' ||
                           fault === 'Move off - Safety' ||
                           fault === 'Move off - Control')) {
      return value.replace('off', 'away');
    }
    return value;
  }

}
