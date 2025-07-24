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
            <img
              :src="cameraImage"
              alt="摄像头图"
              style="width: 100%; max-height: 300px; object-fit: contain; margin-bottom: 20px;"
            />
            <el-form :model="cameraConfig" label-width="100px">
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
            <el-button type="primary" @click="saveConfig">保存配置</el-button>
          </div>
          <div v-else>
            <p>请选择左侧摄像头查看详情</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加摄像头对话框 -->
    <el-dialog
      title="添加摄像头并选择警戒区域"
      :visible.sync="addDialogVisible"
      width="700px"
      @close="resetAddDialog"
    >
      <div style="position: relative; user-select: none;">
        <!-- 图片 -->
        <img
          ref="imageRef"
          :src="cameraImage"
          alt="警戒区域选择图"
          style="width: 100%; max-height: 400px; object-fit: contain; border: 1px solid #ccc;"
          @click="onImageClick"
        />
        <!-- SVG覆盖层，用来绘制矩形 -->
        <svg
          v-if="points.length > 0"
          :style="{ position: 'absolute', top: 0, left: 0, width: imageSize.width + 'px', height: imageSize.height + 'px', pointerEvents: 'none' }"
        >
          <rect
            v-if="points.length === 2"
            :x="rectX"
            :y="rectY"
            :width="rectWidth"
            :height="rectHeight"
            stroke="red"
            stroke-width="2"
            fill="rgba(255, 0, 0, 0.3)"
          />
          <!-- 标记点 -->
          <circle
            v-for="(p, i) in points"
            :key="i"
            :cx="p.x"
            :cy="p.y"
            r="5"
            fill="red"
            stroke="white"
            stroke-width="1"
          />
        </svg>
      </div>
      <div style="margin-top: 15px; text-align: right;">
        <el-button @click="resetPoints" size="small">重置选择</el-button>
        <el-button type="primary" :disabled="points.length !== 2" @click="confirmAddCamera"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CameraSystem',
  data() {
    return {
      cameras: [
        { id: 1, name: '主入口摄像头', alertRegion: null },
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

      // 添加摄像头弹框控制
      addDialogVisible: false,
      points: [], // 存储两个点 {x,y}
      imageSize: { width: 0, height: 0 }, // 图片实际显示尺寸
      newCameraName: '',
    }
  },
  computed: {
    // 计算矩形左上角坐标和宽高
    rectX() {
      return Math.min(this.points[0]?.x ?? 0, this.points[1]?.x ?? 0)
    },
    rectY() {
      return Math.min(this.points[0]?.y ?? 0, this.points[1]?.y ?? 0)
    },
    rectWidth() {
      return Math.abs((this.points[1]?.x ?? 0) - (this.points[0]?.x ?? 0))
    },
    rectHeight() {
      return Math.abs((this.points[1]?.y ?? 0) - (this.points[0]?.y ?? 0))
    },
  },
  methods: {
    selectCamera(id) {
      this.selectedCamera = this.cameras.find((c) => c.id === Number(id))
      if (this.selectedCamera) {
        this.cameraConfig = {
          resolution: '1920x1080',
          fps: 30,
          remark: '',
        }
      }
    },
    openAddDialog() {
      this.addDialogVisible = true
      this.$nextTick(() => {
        const img = this.$refs.imageRef
        this.imageSize.width = img.clientWidth
        this.imageSize.height = img.clientHeight
      })
    },
    onImageClick(event) {
      if (this.points.length >= 2) return
      // 计算点击相对于图片左上角的坐标
      const rect = event.target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      this.points.push({ x, y })
    },
    resetPoints() {
      this.points = []
    },
    confirmAddCamera() {
      if (this.points.length !== 2) {
        this.$message.warning('请先选定两个点来确定警戒区域')
        return
      }
      const newName = prompt('请输入新摄像头名称', `新摄像头${this.nextCameraId}`)
      if (!newName) {
        this.$message.warning('摄像头名称不能为空')
        return
      }
      // 保存摄像头及警戒区域（相对坐标）
      this.cameras.push({
        id: this.nextCameraId,
        name: newName,
        alertRegion: {
          x: this.rectX,
          y: this.rectY,
          width: this.rectWidth,
          height: this.rectHeight,
        },
      })
      this.nextCameraId++
      this.$message.success('添加摄像头成功，警戒区域已设置')
      this.addDialogVisible = false
      this.points = []
    },
    addCamera() {
      // 原先的直接添加功能可以删除或保留，看你需要
      this.openAddDialog()
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
      this.$message.success(`摄像头【${this.selectedCamera.name}】配置已保存`)
      console.log('保存配置:', this.cameraConfig)
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
</style>
