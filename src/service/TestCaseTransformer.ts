import { TestCaseTransformer } from 'smart-rocket-unit';

class Transformer extends TestCaseTransformer {
  constructor(
    testCaseData?: { data: any },
    variablesData?: { [key: string]: any; variables: any; output: any; malloc: any; fixedAddrs: any; stubs: any },
    typeSystemData?: { types: any },
    vueObj?: any,
  ) {
    super(testCaseData, variablesData, typeSystemData);
    //(this as any).vueObj = vueObj;
  }
  // protected setThis(thisObj: any) {
  //   (this as any).vueObj = thisObj;
  // }
  // protected setField(obj, key, value) {
  //   (this as any).vueObj.$set(obj, key, value);
  // }
}
export default Transformer;
