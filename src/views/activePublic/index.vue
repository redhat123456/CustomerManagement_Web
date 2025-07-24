<template>
  <div class="camera-system">
    <el-row :gutter="20">
      <el-col :span="8" class="camera-list">
        <el-card shadow="hover" style="height: 600px; overflow-y: auto;">
          <div class="header">
            <span>摄像头列表</span>
            <el-button size="mini" type="primary" @click="addCamera">添加摄像头</el-button>
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
  </div>
</template>

<script>


export default {
  name: 'CameraSystem',
  data() {
    return {
      cameras: [
        { id: 1, name: '主入口摄像头' },
        { id: 2, name: '停车场摄像头' },
      ],
      selectedCamera: null,
      cameraConfig: {
        resolution: '',
        fps: null,
        remark: '',
      },
      cameraImage: 'https://s2.loli.net/2022/12/20/EqxNvAYwcTI5Mkz.jpg',
      nextCameraId: 3,
    }
  },
  methods: {
    selectCamera(id) {
      this.selectedCamera = this.cameras.find((c) => c.id === Number(id))
      if (this.selectedCamera) {
        // 加载默认配置，实际可以改成从服务器拉取
        this.cameraConfig = {
          resolution: '1920x1080',
          fps: 30,
          remark: '',








        }
















      }



























    },
    addCamera() {
      this.cameras.push({
        id: this.nextCameraId,
        name: `新摄像头${this.nextCameraId}`,
      })
      this.nextCameraId++
      this.$message.success('添加摄像头成功')
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
      // 模拟保存逻辑
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
}
.camera-list .menu {
  max-height: 520px;
  overflow-y: auto;
}
.camera-detail {
  background: #fff;
}
</style>
