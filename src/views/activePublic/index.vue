<template>
  <div class="activePublic ">
    <el-steps :space="200" :active="step" class="step">
      <el-step title="基本设置" description=""></el-step>
      <el-step title="摄像头系统设置" description=""></el-step>
    </el-steps>

    <transition name="fade">
      <div v-if="step === 1" class="step-content">
        <h3>基本设置内容区域</h3>
        <p>这里填写摄像头参数设置表单等内容</p>
      </div>

      <div v-if="step === 2" class="step-content">
        <!-- 添加摄像头按钮 -->
        <el-button
          type="primary"
          @click="showAddCameraDialog = true"
          style="margin-bottom: 20px"
        >
          添加摄像头
        </el-button>

        <!-- 添加摄像头弹窗 -->
        <el-dialog
          title="添加摄像头 - 设置报警区域"
          :visible.sync="showAddCameraDialog"
          width="700px"
          @close="resetDialog"
        >
          <div
            class="image-area"
            ref="imageArea"
            @mousedown="startDrag"
            @mousemove="drag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
          >
            <img
              :src="cameraImgUrl"
              alt="摄像头图"
              style="width: 100%; user-select: none"
            />
            <div
              v-if="dragging || alarmRegion"
              class="alarm-region"
              :style="alarmRegionStyle"
            ></div>
          </div>

          <div style="margin-top: 10px;">
            <el-input v-model="newCameraName" placeholder="请输入摄像头名称" />
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="showAddCameraDialog = false">取消</el-button>
            <el-button type="primary" @click="confirmAddCamera">确认添加</el-button>
          </span>
        </el-dialog>

        <!-- 告警平台摄像头列表 -->
        <el-card shadow="hover" style="margin-top: 20px;">
          <h3>告警平台 - 摄像头列表</h3>
          <el-menu
            :default-active="selectedCameraId ? selectedCameraId.toString() : ''"
            @select="selectCamera"
            class="camera-list"
          >
            <el-menu-item
              v-for="camera in cameras"
              :key="camera.id"
              :index="camera.id.toString()"
            >
              {{ camera.name }}
            </el-menu-item>
          </el-menu>
        </el-card>

        <!-- 显示选中摄像头详情和报警区域 -->
        <div v-if="selectedCamera" style="margin-top: 20px">
          <h3>摄像头详情：{{ selectedCamera.name }}</h3>
          <div
            style="position: relative; width: 700px; border: 1px solid #ccc"
          >
            <img
              :src="cameraImgUrl"
              alt="摄像头图"
              style="width: 100%; user-select: none"
            />
            <div
              v-if="selectedCamera.alarmRegion"
              class="alarm-region"
              :style="selectedCamera.alarmRegion"
            ></div>
          </div>
        </div>
      </div>
    </transition>

    <div class="but-group">
      <el-button @click.native.prevent="handlePreview" v-show="preview">
        预览
      </el-button>
      <el-button @click.native.prevent="handlePreStep" v-show="preStep">
        上一步
      </el-button>
      <el-button
        @click.native.prevent="handleNextStep"
        v-show="nextStep"
        type="primary"
      >
        下一步
      </el-button>
      <el-button
        @click.native.prevent="handlePublish"
        v-show="publish"
        type="primary"
      >
        完成设置，并提交
      </el-button>
      <el-button @click.native.prevent="chongzhi" type="primary">
        重置所有配置
      </el-button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'activePublic',
  data() {
    return {
      isRouter: false,
      preview: false,
      preStep: false,
      nextStep: true,
      publish: false,
      step: 1,

      // 新增摄像头弹窗数据和拖拽
      showAddCameraDialog: false,
      cameraImgUrl: 'https://s2.loli.net/2022/12/20/EqxNvAYwcTI5Mkz.jpg',
      dragging: false,
      dragStart: { x: 0, y: 0 },
      dragEnd: { x: 0, y: 0 },
      alarmRegion: null, // 警戒区域位置
      newCameraName: '',

      cameras: [], // 告警平台摄像头列表
      nextCameraId: 1,
      selectedCameraId: null,
    }
  },
  computed: {
    alarmRegionStyle() {
      if (!this.alarmRegion) return {}
      return {
        position: 'absolute',
        border: '2px dashed red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        top: this.alarmRegion.top + 'px',
        left: this.alarmRegion.left + 'px',
        width: this.alarmRegion.width + 'px',
        height: this.alarmRegion.height + 'px',
        pointerEvents: 'none',
      }
    },
    selectedCamera() {
      return this.cameras.find(c => c.id === this.selectedCameraId) || null
    },
  },
  methods: {
    handlePreview() {
      console.log('预览')
    },
    handlePreStep() {
      this.step--
      this.goStep(this.step)
      this.$router.go(-1)
      $('html,body').animate({ scrollTop: 0 }, 500)
    },
    handleNextStep() {
      this.step++
      this.goStep(this.step)
      this.$router.push('/activePublic/step' + this.step)
      $('html,body').animate({ scrollTop: 0 }, 500)
    },
    handlePublish() {
      console.log('完成设置并提交')
      // 这里可以整合上传 cameras 和其他数据的逻辑
      this.$message.success('完成设置并提交！')
    },
    chongzhi() {
      this.$confirm('确认要重置所有配置吗？', '提示', {
        type: 'warning',
      })
        .then(() => {
          this.$message.success('已重置所有配置')
          this.step = 1
          this.goStep(this.step)
          this.cameras = []
          this.selectedCameraId = null
        })
        .catch(() => {})
    },
    goStep(n) {
      switch (n) {
        case 1:
          this.preview = false
          this.preStep = false
          this.nextStep = true
          this.publish = false
          break
        case 2:
          this.preview = false
          this.preStep = true
          this.nextStep = false
          this.publish = true
          break
      }
    },

    // 拖拽事件相关
    resetDialog() {
      this.dragging = false
      this.dragStart = { x: 0, y: 0 }
      this.dragEnd = { x: 0, y: 0 }
      this.alarmRegion = null
      this.newCameraName = ''
    },
    startDrag(e) {
      const rect = this.$refs.imageArea.getBoundingClientRect()
      this.dragging = true
      this.dragStart = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      this.dragEnd = { ...this.dragStart }
      this.updateAlarmRegion()
    },
    drag(e) {
      if (!this.dragging) return
      const rect = this.$refs.imageArea.getBoundingClientRect()
      this.dragEnd = {
        x: Math.min(Math.max(e.clientX - rect.left, 0), rect.width),
        y: Math.min(Math.max(e.clientY - rect.top, 0), rect.height),
      }
      this.updateAlarmRegion()
    },
    endDrag() {
      this.dragging = false
    },
    updateAlarmRegion() {
      const top = Math.min(this.dragStart.y, this.dragEnd.y)
      const left = Math.min(this.dragStart.x, this.dragEnd.x)
      const width = Math.abs(this.dragEnd.x - this.dragStart.x)
      const height = Math.abs(this.dragEnd.y - this.dragStart.y)
      this.alarmRegion = { top, left, width, height }
    },

    confirmAddCamera() {
      if (!this.newCameraName) {
        this.$message.warning('请输入摄像头名称')
        return
      }
      if (!this.alarmRegion) {
        this.$message.warning('请在图片上拖拽设置报警区域')
        return
      }
      this.cameras.push({
        id: this.nextCameraId++,
        name: this.newCameraName,
        alarmRegion: { ...this.alarmRegion },
      })
      this.$message.success('摄像头添加成功！')
      this.showAddCameraDialog = false
      this.resetDialog()
    },

    selectCamera(id) {
      this.selectedCameraId = Number(id)
    },
  },
  watch: {
    $route(to, from) {
      this.isRouter = true
    },
  },
  mounted() {
    this.goStep(this.step)
  },
}
</script>

<style scoped>
.image-area {
  position: relative;
  width: 100%;
  max-height: 400px;
  user-select: none;
  cursor: crosshair;
}

.alarm-region {
  box-sizing: border-box;
}

.camera-list {
  max-height: 300px;
  overflow-y: auto;
}

.step-content {
  padding: 20px;
}

.but-group {
  margin-top: 30px;
  text-align: right;
}

.but-group .el-button {
  margin-left: 10px;
}
</style>
