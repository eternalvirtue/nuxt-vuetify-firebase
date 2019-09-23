// 環境変数MODEがDEVの場合のみ、console.log等のconsole系処理が実行される。それ以外の場合は無効になる
(function(){
  function isDEV(){
    if(process.env.LOGMODE === 'DEV') {
      return true
    } else {
      return false
    }
  }
  for(let key in console){
    if(typeof console[key] === 'function'){
      override(key);
    }
  }
  function override(key){
    let proto = console[key];
    console[key] = function(){
      if(isDEV()){
        proto.apply(this, arguments);
      }
    };
  }
})();

// 循環参照を取り除く処理。以下参照
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  }
}

const logUtil = {
  stringify(data) {
    if (typeof data === 'object') {
      return JSON.stringify(data, getCircularReplacer())
    } else {
      return data
    }
  }
}

export default logUtil