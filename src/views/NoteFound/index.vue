<template>
  <div class="not-found">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" :src="img_404" alt="404" />
        <img class="pic-404__child left" :src="img_404_cloud" alt="404" />
        <img class="pic-404__child mid" :src="img_404_cloud" alt="404" />
        <img class="pic-404__child right" :src="img_404_cloud" alt="404" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">
          {{ $t('not_found.copyright') }}
          <a class="link-type" href="http://www.ticpsh.com" target="_blank">{{ $t('not_found.ticpsh') }}</a>
        </div>
        <div class="bullshit__info">{{ $t('not_found.message') }}</div>
        <a class="bullshit__return-home" href="/">{{ $t('not_found.return_home') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
  import img_404 from '@img/404.png';
  import img_404_cloud from '@img/404_cloud.png';
</script>
