export function nameJtoEColor(colorName) {
    switch(colorName){
        case 'ホワイト':
          return 'white';
        case 'グレー':
            return 'gray';
        case 'ブラウン':
            return 'brown';
        case 'パープル':
            return 'purple';
        case 'ピンク':
            return 'pink';
        case 'レッド':
            return 'red';
        case 'オレンジ':
            return 'orange';
        case 'イエロー':
            return 'yellow';
        case 'グリーン':
            return 'green';
        case 'ブルー':
            return 'blue';
        case 'ブラック':
            return 'black';
        default:
          return null;
      }
}

