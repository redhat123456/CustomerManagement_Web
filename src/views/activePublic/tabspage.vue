<template>
  <div>
    <!--摄像头基础设置-->
    <el-row type="flex" class="row-bg">摄像头基础设置：</el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="3" class="col1">视频流地址：</el-col
      ><el-col :span="6">
        <el-input v-model="camera_url" style="width:500px"></el-input></el-col
    ></el-row>

    <el-row type="flex" class="row-bg">AI功能设置：</el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="6" class="col1">
        <el-cascader
          placeholder="试试搜索：安全帽检测"
          value="{xuan}"
          :options="options"
          :props="{ multiple: true }"
          filterable
          @change="handleChange"
        ></el-cascader></el-col
      ><el-col :span="3">
        <el-button type="primary" @click="tianjia"
          >添加新AI功能</el-button
        ></el-col
      ></el-row
    >
    <!--AI功能列表-->
    <div v-show="show1">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <div class="zhengwen">
            安全帽检测：
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" round @click="shanchu1">删除</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            阈值 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x1"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            最小阈值 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x2"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            告警间隔时间 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x9"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-button type="primary" @click="setting_image1">设置区域</el-button>
      </el-row>
    </div>

    <div v-show="show2">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <div class="zhengwen">
            人员聚集检测：
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" round @click="shanchu2">删除</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            阈值 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x3"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            最小阈值 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x4"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            告警间隔时间 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x10"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-button type="primary" @click="setting_image2">设置区域</el-button>
      </el-row>
    </div>

    <div v-show="show3">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <div class="zhengwen">
            危险区域闯入检测：
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" round @click="shanchu3">删除</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            阈值 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x5"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            最小阈值 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x6"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            告警间隔时间 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x11"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-button type="primary" @click="setting_image3">设置区域</el-button>
      </el-row>
    </div>

    <el-dialog
      title="手动设置区域"
      :visible.sync="setting_image"
      width="80%"
      :before-close="handleClose"
      ref="box"
    >
      <el-row type="flex" class="row-bg">手动图片配置</el-row>
      <el-row>
        <div class="canvas-box" id="cab">
          <canvas
            id="cvs"
            class="canvas"
            :width="w1"
            :height="h1"
            @dblclick="double"
            @mousedown="mousedownHandler"
            ref="cvsRef"
            v-bind:style="{
              'background-image': `url(${image_url})`,
            }"
          ></canvas>
        </div>
      </el-row>
      <el-row>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="例如：[[100, 100],[100, 900],[900, 900],[900, 100]]"
          v-model="textarea"
        >
        </el-input>
      </el-row>
      <el-row>
        <el-button type="primary" @click="tijiao2">提 交</el-button>
        <el-button type="primary" @click="chongzhi">重 置</el-button></el-row
      >
    </el-dialog>

    <div v-show="show4">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <div class="zhengwen">
            反光衣检测：
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" round @click="shanchu4">删除</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            阈值 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x7"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            最小阈值 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x8"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            告警间隔时间 ：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="x12"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-button type="primary" @click="setting_image4">设置区域</el-button>
      </el-row>
    </div>

    <el-row type="flex" class="row-bg">
      <el-button type="primary" @click="tijiao">保存</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Tabspage',
  created: function() {
    //先赋初值
    console.log(this.$global_msg.ruleform)
    console.log('打开标签页')
    this.initialize()
    console.log(this.tab)
    console.log(this.camera_url)
    console.log(this.select)
  },
  computed: {
    cvs() {
      return document.querySelector('#cvs')
    },
    ctx() {
      let cvs = document.querySelector('#cvs')
      cvt = cvs.getContext('2d')
      return cvt
    },
    cvsClientRect() {
      return this.cvs.getBoundingClientRect()
    },
  },
  data() {
    return {
      camera_url: '',
      box_width: '474',
      box_height: '355',
      image_url: '',
      image_it: '',
      camera: '',
      points: [],
      flag: false,
      w1: '',
      h1: '',
      textarea: '',
      setting_image: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      x1: '',
      x2: '',
      x3: '',
      x4: '',
      x5: '',
      x6: '',
      x7: '',
      x8: '',
      x9: '',
      x10: '',
      x11: '',
      x12: '',
      x13: '',
      x14: '',
      x15: '',
      x16: '',
      tab: '',
      select: '',
      xuan: '',
      options: [
        {
          value: 'helmet-detection',
          label: '安全帽检测',
        },
        {
          value: 'crowd-detection',
          label: '人员聚集检测',
        },
        {
          value: 'invasion-detection',
          label: '危险区域闯入检测',
        },
        {
          value: 'vest-detection',
          label: '反光衣检测',
        },
      ],
    }
  },
  methods: {
    tijiao2() {
      console.log(this.image_it)
      if (this.image_it == 1) this.x13 = this.textarea
      if (this.image_it == 2) this.x14 = this.textarea
      if (this.image_it == 3) this.x15 = this.textarea
      if (this.image_it == 4) this.x16 = this.textarea
      this.$notify({
        title: '成功',
        message: '图片配置保存成功',
        type: 'success',
      })
    },
    chongzhi() {},
    get_size() {
      var axios = require('axios')
      var config = {
        method: 'get',
        url:
          this.$global_msg.myurl +
          '/api/camera/info?camera_src=' +
          this.camera_url,
      }
      axios(config)
        .then((res) => {
          console.log('获取图片尺寸成功')
          console.log(res)
          this.w1 = res.data.data.width
          this.h1 = res.data.data.height
          console.log(this.w1)
        })
        .catch(function(res) {
          console.log(error)
        })
    },
    setting_image1() {
      //获取图片
      this.get_size()
      this.image_url =
        this.$global_msg.myurl +
        '/api/camera/image?camera_src=' +
        this.camera_url
      this.setting_image = true
      this.image_it = 1
      this.textarea = this.x13
    },
    setting_image2() {
      //获取图片
      this.get_size()
      this.image_url =
        this.$global_msg.myurl +
        '/api/camera/image?camera_src=' +
        this.camera_url
      this.setting_image = true
      this.image_it = 2
      this.textarea = this.x14
    },
    setting_image3() {
      //获取图片
      this.get_size()
      this.image_url =
        this.$global_msg.myurl +
        '/api/camera/image?camera_src=' +
        this.camera_url
      this.setting_image = true
      this.image_it = 3
      this.textarea = this.x15
    },
    setting_image4() {
      //获取图片
      this.get_size()
      this.image_url =
        this.$global_msg.myurl +
        '/api/camera/image?camera_src=' +
        this.camera_url
      this.setting_image = true
      this.image_it = 4
      this.textarea = this.x16
    },
    mousedownHandler(event) {
      console.log(this.points)
      if (event.button == 0 && !this.flag) {
        this.points.push({
          x: event.pageX - this.cvsClientRect.x,
          y: event.pageY - this.cvsClientRect.y,
        })
        if (this.points.length >= 1) {
          this.cvs.addEventListener('mousemove', this.mousemoveHandler, false)
        }
        this.drawPolygon(this.points)
      } else if (event.button === 2) {
        this.flag = true
        this.cvs.removeEventListener('mousemove', this.mousemoveHandler)
      }
    },
    drawPolygon(points) {
      this.ctx.clearRect(0, 0, 1080, 1920)
      this.ctx.strokeStyle = '#FF0000	'
      this.ctx.beginPath()
      this.ctx.moveTo(points[0].x, points[0].y)
      for (var i = 1; i < points.length; i++) {
        this.ctx.lineTo(points[i].x, points[i].y)
      }
      this.ctx.closePath()
      this.ctx.stroke()
    },
    mousemoveHandler(event) {
      this.drawPolygon(
        this.points.concat({
          x: event.pageX - this.cvsClientRect.x,
          y: event.pageY - this.cvsClientRect.y,
        })
      )
    },
    // 双击事件
    double() {
      cvs.removeEventListener('mousemove', this.mousemoveHandler)
    },
    shanchu1() {
      this.x1 = 0
      this.x2 = 0
      this.show1 = false
      this.select.remove('helmet-detection')
    },
    shanchu2() {
      this.x3 = 0
      this.x4 = 0
      this.show2 = false
      this.select.remove('crowd-detection')
    },
    shanchu3() {
      this.x5 = 0
      this.x6 = 0
      this.show3 = false
      this.select.remove('invasion-detection')
    },
    shanchu4() {
      this.x7 = 0
      this.x8 = 0
      this.show3 = false
      this.select.remove('vest-detection')
    },
    tijiao() {
      var list = new Array()
      list = this.select
      var list1 = new Array()
      for (var i = 0; i < list.length; i++) {
        if (list[i].value == 'helmet-detection') {
          var parameters = {
            contiguous_threshold: this.x1,
            tiny_threshold: this.x2,
            interval_seconds: this.x9,
            points: this.x13,
          }
        }
        if (list[i].value == 'crowd-detection') {
          var parameters = {
            contiguous_threshold: this.x3,
            tiny_threshold: this.x4,
            interval_seconds: this.x10,
            points: this.x14,
          }
        }
        if (list[i].value == 'invasion-detection') {
          var parameters = {
            contiguous_threshold: this.x5,
            tiny_threshold: this.x6,
            interval_seconds: this.x11,
            points: this.x15,
          }
        }
        if (list[i].value == 'vest-detection') {
          var parameters = {
            contiguous_threshold: this.x7,
            tiny_threshold: this.x8,
            interval_seconds: this.x12,
            points: this.x16,
          }
        }
        var a = { name: list[i].value, parameters: parameters }
        list1.push(a)
      }
      var x = {
        name: this.tab,
        url: this.camera_url,
        functions: list1,
      }
      console.log(x)
      var list2 = new Array()
      list2 = this.$global_msg.ruleform.channels
      for (var i = 0; i < list2.length; i++) {
        if (list2[i].name == this.tab) {
          this.$global_msg.ruleform.channels[i] = x
          break
        }
      }
      console.log(this.$global_msg.ruleform.channels)
    },
    tianjia() {
      var list = new Array()
      list = this.select
      for (var i = 0; i < list.length; i++) {
        if (list[i].value == 'helmet-detection') {
          this.show1 = 'true'
        }
        if (list[i].value == 'crowd-detection') {
          this.show2 = 'true'
        }
        if (list[i].value == 'invasion-detection') {
          this.show3 = 'true'
        }
        if (list[i].value == 'vest-detection') {
          this.show4 = 'true'
        }
      }
    },
    handleChange(value) {
      console.log(value)
      var list = new Array()
      for (var i = 0; i < value.length; i++) {
        var a = { value: value[i][0] }
        list.push(a)
      }
      this.select = list
      console.log(this.select)
    },
    initialize() {
      var list = new Array()
      list = this.$global_msg.ruleform.channels
      for (var i = 0; i < list.length; i++) {
        if (list[i].name == this.$global_msg.tab) {
          this.camera = list[i]
          break
        }
      }
      this.tab = this.camera.name
      this.camera_url = this.camera.url
      console.log(this.tab)
      console.log(this.camera)
      var list1 = this.camera.functions
      console.log(list1)
      var list2 = new Array()
      for (var i = 0; i < list1.length; i++) {
        if (list1[i].name == 'helmet-detection') {
          this.show1 = 'true'
          this.x1 = list1[i].parameters.contiguous_threshold
          this.x2 = list1[i].parameters.tiny_threshold
          this.x9 = list1[i].parameters.interval_seconds
          this.x13 = list1[i].parameters.points
        }
        if (list1[i].name == 'crowd-detection') {
          this.show2 = 'true'
          this.x3 = list1[i].parameters.contiguous_threshold
          this.x4 = list1[i].parameters.tiny_threshold
          this.x10 = list1[i].parameters.interval_seconds
          this.x14 = list1[i].parameters.points
        }
        if (list1[i].name == 'invasion-detection') {
          this.show3 = 'true'
          this.x5 = list1[i].parameters.contiguous_threshold
          this.x6 = list1[i].parameters.tiny_threshold
          this.x11 = list1[i].parameters.interval_seconds
          this.x15 = list1[i].parameters.points
        }
        if (list1[i].name == 'vest-detection') {
          this.show4 = 'true'
          this.x7 = list1[i].parameters.contiguous_threshold
          this.x8 = list1[i].parameters.tiny_threshold
          this.x12 = list1[i].parameters.interval_seconds
          this.x16 = list1[i].parameters.points
        }
      }

      for (var i = 0; i < list1.length; i++) {
        var a = { value: list1[i].name }
        list2.push(a)
      }
      this.select = list2
      console.log(this.camera_url)
    },
  },
}
</script>

<style>
.box {
  width: 474;
  height: 355;
  background-image: url(https://th.bing.com/th/id/OIP.I9A81agbXp1sD7pJlpwFkAHaFj?pid=ImgDet&rs=1);
}
.col1 {
  margin-left: 10px;
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  margin: 0px 0px 22px;
}
.row-bg1 {
  padding: 0px 0px 10px;
  height: 40px;
}
</style>
