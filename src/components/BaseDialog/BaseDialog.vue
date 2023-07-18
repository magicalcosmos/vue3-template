<template>
  <teleport to="body" :disabled="!isAppendToBody">
    <div
      ref="baseDialogRef"
      v-bind="$attrs"
      v-show="visible"
      :id="state.dialogId"
      :class="`base-dialog ${currentTheme} ${visible ? 'open' : 'close'}`"
      :style="baseDialogStyle"
      @click="handleClosePop($event.target)"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <div :class="`dialog-pop ${type !== 'left' ? 'center' : ''}`">
        <div
          :id="state.contentId"
          :class="['dialog-pop-wrap', state.isMax ? 'is-max' : '']"
          @click="handleClickDialog($event)"
          @mouseup.stop="handleChildMouseUp"
          @mousedown.stop="handleChildMouseDown"
        >
          <div class="dialog-title">
            <span v-dompurify-html="getTitle"></span>
            <span class="closes">
              <i
                v-show="showMaximize"
                :class="['icon', 'iconfont', state.isMax ? 'icon-fullscreen-exit' : 'icon-fullscreen']"
                @click="handleMaximize"
              ></i>
              <i v-if="!positionClose && showClose" class="iconfont icon-close" @click="handleClose"></i>
              <span v-else class="top-right" @click="handleClose">
                <i class="iconfont icon-close"></i>
              </span>
            </span>
          </div>
          <div class="dialog-content">
            <slot></slot>
          </div>
          <div v-show="showDefaultButton" class="buttons">
            <span v-show="isShowCancelButton" class="cancel" @click="handleCancel" v-text="$t(cancel)"></span>
            <span v-show="isShowConfirmButton" class="confirm" @click="handleConfirm" v-text="$t(confirm)"></span>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">  
  import { useVModel } from '@vueuse/core';
  import { StyleValue } from 'vue';
  import { baseDialogEmits, baseDialogProps } from './base-dialog-type';

  const { t } = useI18n();
  const $emit = defineEmits(baseDialogEmits);
  const props = defineProps(baseDialogProps);

  /**
   * 动态生成ID
   * @param content
   */
  const generateId = (content?: string) => {
    return (content ? 'dialog_content_' : 'dialog_id_') + +new Date();
  };

  const baseDialogRef = ref();

  const state = reactive({
    isMax: false,
    dialogId: generateId(),
    contentId: generateId('content'),
    isClick: false,
    firstTime: 0,
  });

  const visible = useVModel(props, 'modelValue', $emit);

  const baseDialogStyle = computed(() => {
    return {
      'z-index': props.zIndex,
    } as StyleValue | undefined;
  });

  const currentTheme = computed(() => {
    return props.theme || '';
  });

  const getTitle = computed(() => {
    let icon = '';
    if (props.title === 'dialog.compile_error') {
      icon = `icon-warning`;
    } else if (props.title === 'dialog.runtime_error') {
      icon = `code-defect`;
    }
    return (
      (icon
        ? `<svg class="icon common-icon-size pointer" aria-hidden="true" style="font-size:20px;position:relative;top:4px"><use xlink:href="#icon-${icon}"></use></svg>`
        : '') + props.title
    );
  });

  const handleConfirm = () => {
    scroll('scroll');
    $emit('handleConfirm');
  };

  const handleCancel = () => {
    scroll('scroll');
    $emit('handleCancel');
  };

  const handleClose = () => {
    scroll('scroll');
    $emit('handleClose');
  };

  const handleMouseDown = () => {
    state.firstTime = +new Date();
  };

  const handleMouseUp = () => {
    if (+new Date() - state.firstTime < 200) {
      state.isClick = true;
    }
  };

  const handleChildMouseDown = () => {
    // stop bubble
  };

  const handleChildMouseUp = () => {
    // stop bubble
  };

  const handleClickDialog = (_evt: Event) => {
    $emit('handleClickDialog');
  };

  /**
   * 点击遮罩部分关闭对话框
   * @param target
   */
  const handleClosePop = (target: EventTarget | null) => {
    const con = document.getElementById(state.contentId);
    if (state.isClick && con) {
      if (target != null && !con.contains(target as Node)) {
        hide();
        handleClose();
      }
      state.isClick = false;
    }
  };

  const handleMaximize = () => {
    state.isMax = !state.isMax;
    $emit('handleMaximize');
  };

  const scroll = (_status: string) => {
    //document.body.style.overflow = status;
  };

  /**
   * 显示对话框
   */
  const show = () => {
    $emit('update:modelValue', true);
  };

  /**
   * 隐藏对话框
   */
  const hide = () => {
    $emit('update:modelValue', false);
  };

  defineExpose({
    show,
    hide,
  });
</script>
