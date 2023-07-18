import { ComputedRef, InjectionKey } from 'vue';

export const SortFilesTreeDataKey: InjectionKey<ComputedRef<TObject>> = Symbol('TObject');
export const SortRulesTreeDataKey: InjectionKey<ComputedRef<TObject>> = Symbol('TObject');
