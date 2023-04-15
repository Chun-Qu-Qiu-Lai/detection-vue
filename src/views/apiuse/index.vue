<template>
  <div style="padding-bottom: 2rem;padding-left: 2rem;">
    <a-button type="primary" @click="openModel()" style="background: rgb(255,151,0);border: none;border-radius: 1.25rem;">创建Key</a-button>
    <img src="@/assets/images/notice.png"
      style="width: 30px;height: 30px;border:#30a5a7 2px solid;border-radius: 1rem;margin-left: 1rem;cursor: pointer;"
      @click="opneNoticeModel()" />
  </div>
  <!--  -->
  <a-table :columns="columns" :data-source="tokens" style="">

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tokenId'">
        <a>
          {{ record.tokenId }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag v-for="tag in record.tags" :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-divider type="vertical" />
          <a-button type="primary" @click="copyToken(record.tokenValue)">复制key</a-button>
          <a-divider type="vertical" />
          <a-popconfirm title="确认删除?" ok-text="确认" cancel-text="取消" @confirm="confirmDelete(record.tokenId)">
            <a-button danger>删除</a-button>
          </a-popconfirm>
        </span>
      </template>
    </template>
  </a-table>
  <!--  -->
  <a-modal title="创建Key" style="border-radius: 1rem;" wrapClassName="weipay" v-model:visible="visible" ok-text="确认"
    cancel-text="取消" :destroyOnClose="true" @ok="createToken()" @cancel="cancelCreate()">
    <a-form>
      <a-form-item label="Key名称" name="tokenName">
        <a-input v-model:value="tokenName" style="border-radius: 1rem;">
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
  <!--  -->
  <a-modal title="接口使用" style="border-radius: 1rem;" wrapClassName="weipay" v-model:visible="noticeVisible"
    :destroyOnClose="true" :footer="null">
    <div>
      <div style="padding: 1rem 0px;">地址：https://www.zscyun.com:5206/oss/admin/token/upload</div>
      <div>
        <div style="padding: .3rem 0px;">请求头参数</div>
        <div style="padding: .3rem 0px;">Authorization:{Key}</div>
        <div style="padding: .3rem 0px;">表单参数</div>
        <div style="padding: .3rem 0px;">imgFile</div>
      </div>
    </div>
  </a-modal>
</template>
<script >
import { message } from 'ant-design-vue'
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import { addToken, getTokens, deleteToken } from '@/api/api'
const columns = [{
  title: '序号',
  dataIndex: 'tokenId',
  key: 'tokenId',
  align: 'center'
}, {
  title: '名称',
  dataIndex: 'tokenName',
  key: 'tokenName',
  align: 'center'
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  key: 'createTime',
  align: 'center'
}, {
  title: '操作',
  key: 'action',
  align: 'center'
}]
export default defineComponent({
  name: 'apiuseIndex',
  setup () {
    const data = reactive({
      visible: false,
      noticeVisible: false,
      tokenName: '',
      tokens: []
    })
    const { proxy } = getCurrentInstance()
    const openModel = () => {
      data.visible = true
    }
    onMounted(function () {
      getTokenList()
    })
    // 获取token
    const getTokenList = async () => {
      const { data: res } = await getTokens()
      if (res.code === 200) {
        data.tokens = res.data
      }
    }
    // 创建token
    const createToken = async () => {
      console.log(data.tokenName)
      if (data.tokenName === '') {
        message.error('不能为空')
        return
      }
      if (data.tokenName.length > 15) {
        message.error('名称过长')
        return
      }
      const { data: res } = await addToken(data.tokenName)
      if (res.code === 200) {
        data.visible = false
        message.success('创建成功')
        getTokenList()
        data.tokenName = ''
      } else {
        message.error('创建失败')
      }
    }
    //  取消创建token
    const cancelCreate = () => {
      data.tokenName = ''
    }
    // 确认删除
    const confirmDelete = async (tokenId) => {
      const { data: res } = await deleteToken(tokenId)
      if (res.code === 200) {
        message.success('删除成功')
        getTokenList()
      } else {
        message.error('删除失败')
      }
    }
    // 复制token
    const copyToken = (tokenValue) => {
      proxy.$copyText(tokenValue).then(() => {
        message.success('复制成功')
      })
    }
    // 打开提示对话框
    const opneNoticeModel = () => {
      data.noticeVisible = true
    }
    return {
      ...toRefs(data),
      openModel,
      createToken,
      columns,
      cancelCreate,
      confirmDelete,
      copyToken,
      opneNoticeModel
    }
  }

})
</script>
<style lang="scss" scoped>
img:hover {
  box-shadow: 0px 0px 2px 2px #959393;
  transition: 0.3s;
}
</style>
