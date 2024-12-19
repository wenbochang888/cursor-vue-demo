<template>
  <div id="app">
    <div class="center-container">
      <h1 class="rainbow-text">{{ message }}</h1>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="loading" class="loading">加载中...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
      error: null,
      loading: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/api/hello');
        this.message = response.data;
      } catch (err) {
        this.error = '获取数据失败：' + err.message;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    const element = this.$el.querySelector('.rainbow-text');
    if (element) {
      element.setAttribute('data-text', this.message);
    }
  },
  watch: {
    message(newVal) {
      const element = this.$el.querySelector('.rainbow-text');
      if (element) {
        element.setAttribute('data-text', newVal);
      }
    }
  }
};
</script>

<style>
/* 居中容器样式 */
.center-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

/* 彩虹文字基础样式 */
.rainbow-text {
  font-size: 4em;
  background: linear-gradient(
    to right,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #4b0082,
    #8f00ff,
    #ff0000
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: 
    rainbow 5s linear infinite,
    snakeWave 12s cubic-bezier(0.645, 0.045, 0.355, 1.000) infinite;
  background-size: 200% 100%;
  display: inline-block;
  position: relative;
  letter-spacing: 4px;
}

/* 更自然的蛇形波浪动画 */
@keyframes snakeWave {
  0% {
    transform: translate3d(0, 0, 0) skewX(0deg);
  }
  12.5% {
    transform: translate3d(-10px, -8px, 0) skewX(-1deg);
  }
  25% {
    transform: translate3d(-15px, -12px, 0) skewX(-2deg);
  }
  37.5% {
    transform: translate3d(-10px, -8px, 0) skewX(-1deg);
  }
  50% {
    transform: translate3d(0, 0, 0) skewX(0deg);
  }
  62.5% {
    transform: translate3d(10px, 8px, 0) skewX(1deg);
  }
  75% {
    transform: translate3d(15px, 12px, 0) skewX(2deg);
  }
  87.5% {
    transform: translate3d(10px, 8px, 0) skewX(1deg);
  }
  100% {
    transform: translate3d(0, 0, 0) skewX(0deg);
  }
}

/* 简化残影效果 */
.rainbow-text::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  z-index: -1;
  opacity: 0.08;
  animation: snakeWave 12s cubic-bezier(0.645, 0.045, 0.355, 1.000) infinite;
  animation-delay: -0.2s;
}

/* 优化动画过渡 */
.rainbow-text {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 添加鼠标悬停效果 */
.rainbow-text:hover {
  transform: scale(1.05);
}

/* 彩虹动画 */
@keyframes rainbow {
  0% {
    background-position: 200% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 修改S形波浪动画，使用更柔和的曲线和渐变效果 */
@keyframes wave {
  0% {
    transform: translateX(0) skewY(0deg) scaleY(1);
  }
  25% {
    transform: translateX(8px) skewY(2deg) scaleY(1.02);
  }
  50% {
    transform: translateX(-5px) skewY(-1.5deg) scaleY(0.98);
  }
  75% {
    transform: translateX(8px) skewY(2deg) scaleY(1.02);
  }
  100% {
    transform: translateX(0) skewY(0deg) scaleY(1);
  }
}

/* 修改波浪效果 */
.rainbow-text {
  position: relative;
  transform-origin: center;
  transition: all 0.3s ease;
}

.rainbow-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  animation: 
    rainbow 5s linear infinite,
    wave 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  animation-delay: -0.8s;
  transform-origin: center;
  transition: all 0.3s ease;
}

.error {
  color: red;
  margin: 10px 0;
}

.loading {
  color: #666;
  margin: 10px 0;
}
</style>
