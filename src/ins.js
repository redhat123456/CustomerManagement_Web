export default {
  //获取返回值
    getRedisInformation()
    {
      return window.localStorage.redisData;
    },
    /**
   1. 将需要存储的数据赋给localStorage中的redisData
   2. data:需要存储的数据（String类型）
     **/
    setRedisInformation(data) {
      window.localStorage.redisData = data;
    },
  }