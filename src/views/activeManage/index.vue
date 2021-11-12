<template>
  <div class="allActive">
    <el-card class="box-card">
      <h3>事件列表</h3>
      <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
      </el-row>
      <el-table :data="showData" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="Id">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="编号">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="名称">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="误报">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="待审核">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="Id" align="center"></el-table-column>
        <el-table-column
          prop="type"
          label="编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="readNum"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="signUpNum"
          label="误报"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[
            { text: '火灾', value: '火灾' },
            { text: '闯入', value: '闯入' },
            {
              text: '离岗',
              value: '离岗',
            },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.tag === '闯入'">
              <el-tag disable-transitions>{{ scope.row.tag }}</el-tag>
            </div>
            <div v-else-if="scope.row.tag === '火灾'">
              <el-tag :type="success" disable-transitions>{{
                scope.row.tag
              }}</el-tag>
            </div>
            <div v-else-if="scope.row.tag === '离岗'">
              <el-tag :type="info" disable-transitions>{{
                scope.row.tag
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="auditNum"
          label="待审核"
          align="center"
        ></el-table-column>
        <el-table-column inline-template label="操作" align="center" prop="id">
          <el-button type="text" size="mini">查看详情</el-button>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="end" style="padding:20px 0 0 0; ">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagesize"
          layout="sizes, prev, pager, next,jumper"
          :total="44"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'allActive',
  data: function() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //初始分页
      totalActiveNum: 3,
      totalSignUp: 204,
      auditNum: 15,
      activeNum: 0,
      currentType: '全部',
      selectItems: [],
      showData: [],
      tableData: [
        {
          id: '001',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '002',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '003',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '004',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '005',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '006',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '007',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '008',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '009',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0010',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0011',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0012',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0013',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0014',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0015',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0016',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0017',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0018',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0019',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0020',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '闯入',
        },
        {
          id: '0021',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0022',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0023',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0024',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0025',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0026',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0027',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0028',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0029',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0030',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '火灾',
        },
        {
          id: '0031',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0032',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0033',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0034',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0035',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0036',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0037',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0038',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0039',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0040',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0041',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0042',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0043',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
        {
          id: '0044',
          title: '王小虎',
          type: '测试活动',
          status: '已结束',
          readNum: 200,
          signUpNum: 100,
          auditNum: 100,
          tag: '离岗',
        },
      ],
    }
  },
  created: function() {
    console.log('打开page')
    this.ChangeList()
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value
    },
    ChangeList: function(res) {
      var _this = this
      var x1 = _this.currentPage
      var x2 = _this.pagesize
      var list = new Array()
      const list1 = _this.tableData
      for (var i = x2 * (x1 - 1); i < x2 * x1; i++) {
        if (i == list1.length) break
        var a = list1[i]
        list.push(a)
      }
      _this.showData = list
    },
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) //每页下拉显示数据
      this.ChangeList()
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) //点击第几页
      this.ChangeList()
    },
  },
}
</script>
<style>
.allActive > .head > .el-col > .el-col {
  padding: 20px 0;
  border-right: solid 1px #fff;
}

.allActive .head {
  text-align: center;
  color: #fff;
  font-size: 30px;
  margin-bottom: 50px;
}

.allActive .head span {
  font-size: 16px;
}
</style>
