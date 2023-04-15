<template>
  <div
    style="background-color: #f3f4f6;width: 50%;display: flex;align-items: center;margin: 0 auto;
    border-radius: 0.5rem;flex-direction: column;padding: 20px 20px;box-shadow: 1px 2px 5px #727272;">
    <a-form style="width: 100%;" autocomplete="off" name="basic" @finish="submitForm" :model="data.formState"
      :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
      <a-form-item  :rules="[{ required: true, message: '请输入新密码' }, { max: 10, message: '长度最大10位' }]" label="新密码"
        name="password" :label-col="{ span: 8 }" :wrapper-col="{ offset: 0, span: 10 }">
        <a-input v-model:value="data.formState.password" style="border-radius: 1rem;">
        </a-input>
      </a-form-item>
      <a-form-item  :rules="[{ required: true, message: '请再次输入新密码' }, { max: 10, message: '长度最大10位' }]" label="再次输入"
        name="checkPassword" :label-col="{ span: 8 }" :wrapper-col="{ offset: 0, span: 10 }">
        <a-input v-model:value="data.formState.checkPassword" style="border-radius: 1rem;">
        </a-input></a-form-item>
      <a-form-item :wrapper-col="{ offset: 9, span: 4 }">
        <a-button style="display: flex;align-items: center;margin-left: 50%;border-radius: 1.25rem;" type="primary" html-type="submit">修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { defineComponent, reactive } from 'vue'
import { updatePsw } from '@/api/api'
export default defineComponent({
  name: 'updatePasswordIndex',
  setup () {
    const data = reactive({
      formState: {
        password: '',
        checkPassword: ''
      }
    })
    const submitForm = async (value) => {
      const tempPassword = value.password.replace(/\s*/g, '')
      if (tempPassword !== value.password) {
        message.error('输入不合法w(ﾟДﾟ)w')
        return
      }
      if (value.password !== value.checkPassword) {
        message.error('两次密码输入不相同(°ー°〃)')
        return
      }
      console.log(value.password)
      const { data: res } = await updatePsw(value.password, value.checkPassword)
      if (res.code === 200) {
        message.success('修改成功')
        data.formState.password = ''
        data.formState.checkPassword = ''
      } else {
        message.error(res.msg)
      }
    }
    return {
      data,
      submitForm
    }
  }
})
</script>
<style scoped lang="scss"></style>
<!-- <template>
  <div class="echarts-box">
    <div id="curveEcharts" :style="{ width: '100%', height: '300px' }"></div>
    <div style="display: flex;justify-content: space-around;">
      <div id="circularEcharts" :style="{ width: '40%', height: '300px', transform: 'scale(0.9)' }"></div>
      <div id="albumEcharts" :style="{ width: '40%', height: '300px' }"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { defineComponent, onMounted, reactive } from 'vue'
import { getCatalogues, getUserInfo, getDownloadOperation, getUploadOperation } from '@/api/api'
import { message } from 'ant-design-vue'
export default defineComponent({
  name: 'homeIndex',
  setup () {
    const echart = echarts
    const data = reactive({
      ablbumInfo: [],
      uploadAndDowloadInfo: [],
      downloadValue: [],
      downloadTime: [],
      uploadValue: [],
      uploadTime: []

    })

    onMounted(function () {
      getCurveData()
      getCurveDataK()
      getAblbumTable()
      getUploadAndDowloadNumber()
      setTimeout(() => {
        initChart()
      }, 500)
    })

    const getAblbumTable = async () => {
      const s = []
      const { data: res } = await getCatalogues()
      if (res.code === 200) {
        for (let index = 0; index < res.data.length; index++) {
          const temp = { value: null, name: '' }
          temp.value = res.data[index].count
          temp.name = res.data[index].name
          s.push(temp)
        }
        data.ablbumInfo = s
      }
    }
    const getUploadAndDowloadNumber = async () => {
      const s = []
      const { data: res } = await getUserInfo()
      if (res.code === 200) {
        for (let index = 0; index < 2; index++) {
          const temp = { value: null, name: '' }
          if (index === 0) {
            temp.value = res.data.userInfo.downloadNumber
            temp.name = '下载总数'
          } else {
            temp.value = res.data.userInfo.uploadNumber
            temp.name = '上传总数'
          }
          s.push(temp)
        }
        data.uploadAndDowloadInfo = s
      }
    }

    const getCurveData = async () => {
      const { data: res } = await getUploadOperation()
      if (res.code === 200) {
        data.uploadTime = res.data.uploadTime
        data.uploadValue = res.data.uploadValue
      } else {
        message.error('系统出错')
      }
    }
    const getCurveDataK = async () => {
      const { data: res } = await getDownloadOperation()
      if (res.code === 200) {
        data.downloadValue = res.data.downloadValue
        data.downloadTime = res.data.downloadTime
      } else {
        message.error('系统出错')
      }
    }

    // 初始化图表
    const initChart = () => {
      // 曲线图
      const curveEcharts = echart.init(document.getElementById('curveEcharts'))
      curveEcharts.setOption({
        title: {
          text: '2015-2021年中国互联网理财用户规模',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        xAxis: {
          name: '年',
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: [2015, 2016, 2017, 2018, 2019, 2020, 2021]
        },
        yAxis: {
          name: '亿人',
          type: 'value',
          axisLabel: {
            formatter: '{value} '
          }
        },
        series: [
          {
            name: '上传总数',
            type: 'bar',
            stack: '上传总数',
            data: [2.4, 3.1, 3.8, 4.6, 5.3, 6.1, 6.3],
            areaStyle: {
              normal: {
                color: ['#121218']
              }
            }
          }
        ]
      })
      window.onresize = function () {
        curveEcharts.resize()
      }
    }

    return {
      initChart,
      getAblbumTable,
      getUploadAndDowloadNumber,
      getCurveData
    }
  }
})
</script>

<style scoped lang="scss"></style> -->
