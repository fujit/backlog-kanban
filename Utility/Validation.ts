/**
 * バリデーション処理
 * 1つでも引っかかればfalseを返す
 * @param validation バリデーションのルール
 */
// TODO: 型修正
export default function validate(validation: any): boolean {
  const fields = Object.keys(validation);

  let valid = true;

  for (let i = 0, len = fields.length; i < len; i++) {
    const field = fields[i];
    valid = Object.keys(validation[field]).every(
      (key) => validation[field][key]
    );

    if (!valid) {
      break;
    }
  }

  return valid;
}
