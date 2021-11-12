<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <ul class="legals">
          <li>
            <a class="a1" href="https://anview.ai/" target="_blank">关于</a>
          </li>
          <li>
            <a class="a2" href="http://blog.zuimeia.com" target="_blank"
              >博客</a
            >
          </li>
          <li>
            <a class="a3" href="https://anview.ai/" target="_blank">网站</a>
          </li>
        </ul>
        <div class="line"></div>
        <ul class="legals_social">
          <li>
            <a href="http://weibo.com/briniceapp" title="微博"
              ><i class="fa fa-weibo"></i
            ></a>
          </li>
          <!--TODO：加入微信-->
          <li>
            <a href="mailto:open@zuimeia.com" title="联系我们"
              ><i class="fa fa-envelope-o"></i
            ></a>
          </li>
        </ul>
        <p class="copy">
          © 2016 - 2021 · 桂林安维科技有限公司 · All Rights Reserved
        </p>
        <p class="copy"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  padding: 0px 0px;
}

.row {
  margin-left: -15px;
  margin-right: -15px;
}

.col-md-12 {
  width: 100%;
}

.legals {
  list-style: none;
  color: #e9ecf1; /*#8c9398 */
  font-size: 14px;
  margin: 5px auto;
  padding: 0px !important;
  text-align: center;
  height: 20px;
  flex-flow: row nowrap;
  text-align: center;
}

.legals_social {
  list-style: none;
  color: #e9ecf1;
  font-size: 14px;
  margin: 5px auto;
  padding: 0px !important;
  text-align: center;
  height: 20px;
  flex-flow: row nowrap;
  text-align: center;
}

.line {
  border-bottom: 1px solid #ababab;
  width: 170px;
  margin: 0 auto;
}

a {
  text-decoration: none;
  margin: 5px auto;
}

.legals li a {
  color: #353535;
}

.a1:hover {
  color: #fc0000;
}

.a2:hover {
  color: #0100fc;
}

.a3:hover {
  color: #00fe00;
}

.legals li {
  list-style: none;
  color: #e9ecf1;
  text-align: center;
  display: inline;
  line-height: 20px;
  width: 68px;
  height: 20px;
  padding: 0px 20px;
}

.legals_social li {
  list-style: none;
  color: #353535;
  text-align: center;
  display: inline;
  line-height: 28px;
  width: 68px;
  height: 28px;
  padding: 0px 5px;
}

.legals_social li a {
  color: #353535;
}

.legals_social li a:hover {
  color: #20a0ff;
}

.legals_social li a i {
  font-size: 20px;
}

.copy {
  height: 25px;
  font: 16px 'Varela Round', sans-serif;
  margin: 10px 0px;
  text-align: center;
  color: #404142;
}
</style>
