<template>
  <div class="camera-setting">
    <h2>摄像头设置</h2>

    <div class="camera-canvas-container">
      <canvas
        ref="canvas"
        width="640"
        height="360"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="endDrawing"
        @mouseleave="endDrawing"
      ></canvas>
      <p v-if="!cameraSet">鼠标拖拽创建灵敏区域</p>
    </div>

    <button @click="saveCamera" class="save-btn">保存摄像头</button>

    <div v-if="cameras.length" class="camera-list">
      <h3>已设置的摄像头</h3>
      <ul>
        <li v-for="(cam, index) in cameras" :key="index">
          摄像头 {{ index + 1 }}
          <span>[区域: ({{ cam.x }}, {{ cam.y }}) 宽: {{ cam.width }} 高: {{ cam.height }}]</span>
          <button @click="viewCamera(cam)">查看</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CameraSettingView",
  data() {
    return {
      drawing: false,
      startX: 0,
      startY: 0,
      currentRect: null,
      cameras: [],
      cameraSet: false,
    };
  },
  methods: {
    startDrawing(e) {
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.startX = e.clientX - rect.left;
      this.startY = e.clientY - rect.top;
      this.drawing = true;
    },
    draw(e) {
      if (!this.drawing) return;
      const rect = this.$refs.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      const width = x - this.startX;
      const height = y - this.startY;
      ctx.strokeStyle = "#00BFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(this.startX, this.startY, width, height);
      this.currentRect = { x: this.startX, y: this.startY, width, height };
    },
    endDrawing() {
      if (this.drawing && this.currentRect) {
        this.cameraSet = true;
      }
      this.drawing = false;
    },
    saveCamera() {
      if (this.currentRect) {
        this.cameras.push({ ...this.currentRect });
        this.currentRect = null;
        this.cameraSet = false;
        const ctx = this.$refs.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      }
    },
    viewCamera(cam) {
      alert(您选中了摄像头区域： + JSON.stringify(cam));
    },
  },
};
</script>

<style scoped>
.camera-setting {
  padding: 20px;
}
.camera-canvas-container {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  width: fit-content;
}
.save-btn {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}
.camera-list ul {
  list-style-type: none;
  padding: 0;
}
.camera-list li {
  margin-bottom: 10px;
}
.camera-list button {
  margin-left: 10px;
  padding: 4px 8px;
}
</style>
