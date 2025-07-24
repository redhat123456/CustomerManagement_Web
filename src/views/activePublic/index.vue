<template>
  <div class="camera-system">
    <el-row :gutter="20">
      <el-col :span="8" class="camera-list">
        <el-card shadow="hover" style="height: 600px; overflow-y: auto;">
          <div class="header">
            <span>摄像头列表</span>
            <el-button size="mini" type="primary" @click="openAddDialog">添加摄像头</el-button>
          </div>
          <el-menu
            :default-active="selectedCamera ? selectedCamera.id.toString() : ''"
            @select="selectCamera"
            class="menu"
            router
          >
            <el-menu-item
              v-for="camera in cameras"
              :key="camera.id"
              :index="camera.id.toString()"
            >
              {{ camera.name }}
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click.stop="removeCamera(camera.id)"
              />
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>

      <el-col :span="16" class="camera-detail">
        <el-card shadow="hover" style="min-height: 600px;">
          <div v-if="selectedCamera">
            <h3>{{ selectedCamera.name }} 详情</h3>
            <div
              class="image-container"
              ref="imageContainer"
              @mousedown="startDraw"
              @mousemove="drawing"
              @mouseup="endDraw"
              @mouseleave="endDraw"
              style="position: relative; user-select: none;"
            >
              <img
                ref="imageRef"
                :src="cameraImage"
                alt="摄像头图"
                style="width: 100%; max-height: 400px; object-fit: contain; display: block;"
              />
              <svg
                v-if="rectangles.length > 0"
                :style="{ position: 'absolute', top: 0, left: 0, width: imageSize.width + 'px', height: imageSize.height + 'px', pointerEvents: 'none' }"
              >
                <rect
                  v-for="(rect, idx) in rectangles"
                  :key="idx"
                  :x="rect.x"
                  :y="rect.y"
                  :width="rect.width"
                  :height="rect.height"
                  stroke="red"
                  stroke-width="2"
                  fill="rgba(255,0,0,0.3)"
                />
              </svg>
              <!-- 绘制中的矩形 -->
              <svg
                v-if="isDrawing && currentRect"
                :style="{ position: 'absolute', top: 0, left: 0, width: imageSize.width + 'px', height: imageSize.height + 'px', pointerEvents: 'none' }"
              >
                <rect
                  :x="currentRect.x"
                  :y="currentRect.y"
                  :width="currentRect.width"
                  :height="currentRect.height"
                  stroke="blue"
                  stroke-width="2"
                  fill="rgba(0,0,255,0.3)"
                />
              </svg>
            </div>

            <el-form :model="cameraConfig" label-width="100px" style="margin-top: 20px;">
              <el-form-item label="分辨率">
                <el-input v-model="cameraConfig.resolution" placeholder="请输入分辨率" />
              </el-form-item>
              <el-form-item label="帧率 (FPS)">
                <el-input v-model.number="cameraConfig.fps" placeholder="请输入帧率" type="number" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  v-model="cameraConfig.remark"
                  placeholder="请输入备注"
                />
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="saveConfig" style="margin-top: 10px;">保存配置</el-button>
          </div>
          <div v-else>
            <p>请选择左侧摄像头查看详情</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加摄像头对话框 -->
    <el-dialog
      title="添加摄像头"
      :visible.sync="addDialogVisible"
      width="400px"
      @close="resetAddDialog"
    >
      <el-form :model="newCamera" label-width="80px">
        <el-form-item label="摄像头名称">
          <el-input v-model="newCamera.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddCamera">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CameraSystem',
  data() {
    return {
      cameras: [
        {
          id: 1,
          name: '主入口摄像头',
          alertRegion: { x: 50, y: 50, width: 100, height: 80 },
        },
        { id: 2, name: '停车场摄像头', alertRegion: null },
      ],
      selectedCamera: null,
      cameraConfig: {
        resolution: '',
        fps: null,
        remark: '',
      },
      cameraImage: 'https://s2.loli.net/2022/12/20/EqxNvAYwcTI5Mkz.jpg',
      nextCameraId: 3,

      // 绘制相关
      isDrawing: false,
      startPoint: null,
      currentRect: null,

      rectangles: [],

      // 添加摄像头对话框
      addDialogVisible: false,
      newCamera: {
        name: '',
      },

      imageSize: {
        width: 0,
        height: 0,
      },
    }
  },
  watch: {
    selectedCamera(newVal) {
      if (newVal) {
        // 初始化详情区域配置
        this.cameraConfig = {
          resolution: '1920x1080',
          fps: 30,
          remark: '',
        }
        // 设置已有警戒区域
        this.rectangles = []
        if (newVal.alertRegion) {
          this.rectangles.push({ ...newVal.alertRegion })
        }
        this.$nextTick(() => {
          const img = this.$refs.imageRef
          this.imageSize.width = img.clientWidth
          this.imageSize.height = img.clientHeight
        })
      } else {
        this.rectangles = []
      }
    },
  },
  methods: {
    selectCamera(id) {
      this.selectedCamera = this.cameras.find((c) => c.id === Number(id))
    },
    openAddDialog() {
      this.addDialogVisible = true
      this.newCamera.name = ''
    },
    confirmAddCamera() {
      if (!this.newCamera.name.trim()) {
        this.$message.warning('摄像头名称不能为空')
        return
      }
      this.cameras.push({
        id: this.nextCameraId++,
        name: this.newCamera.name.trim(),
        alertRegion: null,
      })
      this.$message.success('添加摄像头成功')
      this.addDialogVisible = false
    },
    removeCamera(id) {
      this.$confirm('确定删除该摄像头吗？', '删除确认', {
        type: 'warning',
      })
        .then(() => {
          this.cameras = this.cameras.filter((c) => c.id !== id)
          if (this.selectedCamera && this.selectedCamera.id === id) {
            this.selectedCamera = null
          }
          this.$message.success('删除摄像头成功')
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    saveConfig() {
      if (!this.selectedCamera) {
        this.$message.warning('请先选择一个摄像头')
        return
      }
      // 保存配置和警戒区域
      this.selectedCamera.alertRegion = this.rectangles[0] || null
      this.$message.success(`摄像头【${this.selectedCamera.name}】配置已保存`)
      console.log('保存配置:', this.cameraConfig, '警戒区域:', this.selectedCamera.alertRegion)
    },

    // 绘制区域相关
    startDraw(e) {
      if (!this.selectedCamera) return
      const rect = this.$refs.imageRef.getBoundingClientRect()
      this.isDrawing = true
      this.startPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      this.currentRect = {
        x: this.startPoint.x,
        y: this.startPoint.y,
        width: 0,
        height: 0,
      }
    },
    drawing(e) {
      if (!this.isDrawing) return
      const rect = this.$refs.imageRef.getBoundingClientRect()
      const currentPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      this.currentRect.x = Math.min(this.startPoint.x, currentPoint.x)
      this.currentRect.y = Math.min(this.startPoint.y, currentPoint.y)
      this.currentRect.width = Math.abs(currentPoint.x - this.startPoint.x)
      this.currentRect.height = Math.abs(currentPoint.y - this.startPoint.y)
    },
    endDraw() {
      if (!this.isDrawing) return
      this.isDrawing = false
      // 如果矩形有效才保存
      if (this.currentRect.width > 5 && this.currentRect.height > 5) {
        // 只允许一个区域，替换已有
        this.rectangles = [Object.assign({}, this.currentRect)]
      } else {
        this.currentRect = null
      }
    },
  },
}
</script>

<style scoped>
.camera-system {
  padding: 20px;
}
.camera-list .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  user-select: none;
}
.camera-list .menu {
  max-height: 520px;
  overflow-y: auto;
}
.camera-detail {
  background: #fff;
}
.image-container {
  cursor: crosshair;
  user-select: none;
  position: relative;
}
</style>
