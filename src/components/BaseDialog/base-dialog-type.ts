import { ExtractPropTypes } from 'vue';

export const baseDialogProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'left',
  },
  title: {
    type: String,
    default: 'dialog.tip',
  },
  confirm: {
    type: String,
    default: 'button.sure',
  },
  cancel: {
    type: String,
    default: 'button.cancel',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showMaximize: {
    type: Boolean,
    default: false,
  },
  showDefaultButton: {
    type: Boolean,
    default: true,
  },
  isShowConfirmButton: {
    type: Boolean,
    default: true,
  },
  isShowCancelButton: {
    type: Boolean,
    default: true,
  },
  positionClose: {
    type: String,
    default: '',
  },
  zIndex: {
    type: String,
    default: '1999',
  },
  isAppendToBody: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    theme: 'annie',
  },
} as const;

export type TBaseDialogProps = Partial<ExtractPropTypes<typeof baseDialogProps>>;

export const baseDialogEmits = {
  handleConfirm: () => true,
  handleCancel: () => true,
  handleClose: () => true,
  handleClickDialog: () => true,
  handleMaximize: () => true,
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
};
