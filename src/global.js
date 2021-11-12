const password = '';
const user = 'admin';
const myurl = '';
const token = '';
const myform = '';
const tab = '';
const form = {
    "infer": {
        // 选择显卡ID
        "gpu": 0,
        // 置信度阈值
        "conf": 0.5,
        // 交并比阈值
        "iou": 0.45
    },
    // 告警反馈组件, 这是个列表, 以后可以扩展
    "reports": [
        {
            // 组件名称
            "name": "caih",
            // 链接
            "base_url": "http://anview.tech/api/"
        }
    ],
};
const tijiao = {
    "infer":"",
    "reports":"",
    "channels":"",
};
const ruleform = {
    // 推理引擎配置
    "infer": {
        // 选择显卡ID
        "gpu": 0,
        // 置信度阈值
        "conf": 0.5,
        // 交并比阈值
        "iou": 0.45
    },
    // 告警反馈组件, 这是个列表, 以后可以扩展
    "reports": [
        {
            // 组件名称
            "name": "caih",
            // 链接
            "base_url": "http://anview.tech/api/"
        },
        {
            // 组件名称
            "name": "4564",
            // 链接
            "base_url": "http://anview.tech/api/"
        }
    ],
    // 摄像头列表
    "channels": [
        {
            // 摄像头备注名称
            "name": "路边",
            // 视频流地址
            "url": "rtsp://admin:Anview.123456@10.0.0.251/Streaming/Channels/101",
            // AI功能列表
            "functions": [
                {
                    // 功能名称
                    "name": "helmet-detection",
                    // 功能参数
                    "parameters": {
                        // 连续触发阈值
                        "contiguous_threshold": 1,
                        // 小目标阈值
                        "tiny_threshold": 0.0125
                    }
                },
                {
                    "name": "crowd-detection",
                    "parameters": {
                        "contiguous_threshold": 1,
                        "tiny_threshold": 0.0125
                    }
                },
                {
                    "name": "invasion-detection",
                    "parameters": {
                        "contiguous_threshold": 1,
                        "tiny_threshold": 0.0125,
                        // 危险区域坐标
                        "points": [
                            [
                                100,
                                100
                            ],
                            [
                                100,
                                900
                            ],
                            [
                                900,
                                900
                            ],
                            [
                                900,
                                100
                            ]
                        ]
                    }
                }
            ]
        }
    ]
}

export default{
    password,
    user,
    myurl,
    token,
    form,
    myform,
    ruleform,
    tijiao
}
