<template>
  <section class="top-step">
    <n-steps :current="state.current" status="process">
      <n-step title="选择用户及产品" />
      <n-step title="填写工单信息" />
    </n-steps>
  </section>
  <section v-show="state.current === 1">
    <section class="choose-product">
      <n-form
        ref="formUserRef"
        :model="state.model"
        :rules="state.rules"
        label-placement="top"
        label-width="auto"
        require-mark-placement="left"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item label="选择用户：" path="customerUser">
          <n-select
            v-model:value="state.model.customerUser"
            placeholder="请选择用户"
            :options="userOptions"
            :style="{
              width: '250px',
            }"
          />
        </n-form-item>
      </n-form>
      <section class="m_b_20">用户订购的产品</section>
      <section class="user-product-container clearfix">
        <section
          v-for="item in state.productListArr"
          :key="item.id"
          class="product-item f_l"
          :class="{ 'is-checked': item.isChecked }"
          @click="onClickProduct(item)"
        >
          <img :src="item.url" class="f_l" alt="product-img" width="200" height="50" />
          <span class="f_l">{{ item.name }}</span>
        </section>
      </section>
      <n-collapse>
        <n-collapse-item title="查看全部产品" name="1">
          <section class="user-product-container clearfix">
            <section
              v-for="item in state.allProductListArr"
              :key="item.id"
              class="product-item f_l"
              :class="{ 'is-checked': item.isChecked }"
              @click="onClickProduct(item)"
            >
              <img :src="item.url" class="f_l" alt="product-img" width="200" height="50" />
              <span class="f_l">{{ item.name }}</span>
            </section>
          </section>
        </n-collapse-item>
      </n-collapse>
    </section>
    <n-button type="info" class="f_r" @click="onNext"> 下一步 </n-button>
  </section>
  <section v-show="state.current === 2" class="form-container">
    <section class="user-product">
      <span>已选择用户：</span>{{ customerValueLabel[state.model.customerUser] }}
      <span class="m_l_20">已选择产品：</span>{{ checkedProduct.name }}
      <n-button quaternary type="info" class="m_l_20" @click="onPrevious"> 重新选择 </n-button>
    </section>
    <NDivider />
    <n-form
      ref="formRef"
      :model="state.model"
      :rules="state.rules"
      label-placement="left"
      label-width="130px"
      require-mark-placement="left"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item label="问题分类：" path="questionType">
        <n-radio-group v-model:value="state.model.questionType" name="radiogroup1">
          <n-space>
            <n-radio value="1"> 问题咨询 </n-radio>
            <n-radio value="2"> 报障 </n-radio>
            <n-radio value="3"> 解决方案 </n-radio>
            <n-radio value="4"> 投诉 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="工单处理人：" path="nextUser">
        <n-select
          v-model:value="state.model.nextUser"
          placeholder="请选择工单处理人"
          :options="generalOptions"
          :style="{
            width: '250px',
          }"
        />
      </n-form-item>
      <n-form-item label="紧急程度：" path="emergencyDegree">
        <n-radio-group v-model:value="state.model.emergencyDegree" name="radiogroup1">
          <n-space>
            <n-radio value="1"> 一般 </n-radio>
            <n-radio value="2"> 较紧急 </n-radio>
            <n-radio value="3"> 非常紧急 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="问题描述：" path="description">
        <n-input
          v-model:value="state.model.description"
          placeholder="请输入问题描述"
          type="textarea"
          maxlength="1000"
          show-count
          :autosize="{
            minRows: 6,
            maxRows: 9,
          }"
        />
      </n-form-item>
      <n-form-item label="备注：" path="comments">
        <n-input
          v-model:value="state.model.comments"
          placeholder="请输入备注"
          type="textarea"
          maxlength="500"
          show-count
          :autosize="{
            minRows: 3,
            maxRows: 6,
          }"
        />
      </n-form-item>
      <n-form-item label="附件：" path="fileAddress"> 附件地址 </n-form-item>
      <n-form-item label="通知方式：" path="contactType">
        <n-radio-group v-model:value="state.model.contactType" name="radiogroup1">
          <n-space>
            <n-radio value="1"> 邮箱 </n-radio>
            <n-radio value="2"> 电话 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item v-show="state.model.contactType === '1'" label="邮箱地址：" path="email" first>
        <n-input v-model:value="state.model.email" placeholder="请输入邮箱地址" :style="{ width: '250px' }" />
      </n-form-item>
      <n-form-item v-show="state.model.contactType === '2'" label="联系电话：" path="phone" first>
        <n-input v-model:value="state.model.phone" placeholder="请输入联系电话" :style="{ width: '250px' }" />
      </n-form-item>
      <div style="padding-left: 130px">
        <n-button @click="onPrevious"> 上一步 </n-button>
        <n-button type="info" class="m_l_20" @click="onSubmit"> 提交 </n-button>
      </div>
    </n-form>
  </section>
</template>

<script setup>
import { reactive, ref, watch, computed } from 'vue'
import { submitOrder } from '@/api'
import { generalOptions, userOptions, productList, allProductList, regexpEmail, regexpPhone } from './constanst'

const staffValueLabel = {}
generalOptions.forEach((item) => {
  staffValueLabel[item.value] = item.label
})
const customerValueLabel = {}
userOptions.forEach((item) => {
  customerValueLabel[item.value] = item.label
})
const formRef = ref(null)
const formUserRef = ref(null)
const state = reactive({
  current: 1,
  model: {
    customerUser: null,
    questionType: '1',
    nextUser: null,
    emergencyDegree: '1',
    description: '',
    comments: '',
    fileAddress: [''],
    contactType: '1',
    email: '',
    phone: '',
  },
  rules: {
    customerUser: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择用户',
    },
    questionType: {
      required: true,
      trigger: 'change',
    },
    nextUser: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择工单处理人',
    },
    emergencyDegree: {
      required: true,
      trigger: 'change',
    },
    description: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入问题描述',
    },
    contactType: {
      required: true,
      trigger: 'change',
    },
    email: [
      {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入邮箱地址',
      },
      {
        validator: regexpEmail,
        trigger: ['blur', 'input'],
        message: '请输入正确的邮箱地址',
      },
    ],
    phone: [],
  },
  productListArr: [],
  allProductListArr: [],
})
state.productListArr = productList
state.allProductListArr = allProductList

const checkedProduct = computed(() => {
  let product = {}
  state.productListArr.forEach((item) => {
    if (item.isChecked) {
      product = item
    }
  })
  state.allProductListArr.forEach((item) => {
    if (item.isChecked) {
      product = item
    }
  })
  return product
})

watch(
  () => state.model.contactType,
  (_new, _old) => {
    if (_new === '1') {
      state.rules.email = [
        {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入邮箱地址',
        },
        {
          validator: regexpEmail,
          trigger: ['blur', 'input'],
          message: '请输入正确的邮箱地址',
        },
      ]
      state.rules.phone = []
    } else if (_new === '2') {
      state.rules.email = []
      state.rules.phone = [
        {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系电话',
        },
        {
          validator: regexpPhone,
          trigger: ['blur', 'input'],
          message: '请输入正确的手机号码',
        },
      ]
    }
  }
)

function onNext() {
  formUserRef.value?.validate((errors) => {
    if (!errors) {
      state.current = 2
    } else {
      console.log(errors)
    }
  })
}
function onPrevious() {
  state.current = 1
}
function onSubmit(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const params = {
        product: checkedProduct.value.name,
        customerUser: state.model.customerUser,
        customerUserName: customerValueLabel[state.model.customerUser],
        questionType: state.model.questionType,
        nextUser: state.model.nextUser,
        nextUserName: staffValueLabel[state.model.nextUser],
        emergencyDegree: state.model.emergencyDegree,
        description: state.model.description,
        comments: state.model.comments,
        fileAddress: state.model.fileAddress,
        contactType: state.model.contactType,
        contactInfo: state.model.contactType === '1' ? state.model.email : state.model.phone,
      }
      submitOrder(params)
        .then((res) => {
          window.$message.success('提交成功')
          state.current = 1
          state.model = {
            customerUser: null,
            questionType: '1',
            nextUser: null,
            emergencyDegree: '1',
            description: '',
            comments: '',
            fileAddress: [''],
            contactType: '1',
            email: '',
            phone: '',
          }
          onInitData()
        })
        .catch((err) => {
          window.$message.error('提交失败')
        })
    } else {
      console.log(errors)
      window.$message.error('请正确填写工单信息')
    }
  })
}
function onClickProduct(data) {
  if (data.isChecked) {
    data.isChecked = false
    return
  }
  onInitData()
  data.isChecked = !data.isChecked
}
function onInitData() {
  state.productListArr.forEach((item) => {
    item.isChecked = false
  })
  state.allProductListArr.forEach((item) => {
    item.isChecked = false
  })
}
</script>

<style lang="less" scoped>
.top-step {
  padding: 20px;
  // background-color: rgb(253 246 246);
  margin-bottom: 20px;
}
.choose-product {
  padding: 0 20px;
  font-size: 14px;
  // height: 400px;
  .user-product-container {
    .product-item {
      width: 200px;
      height: 50px;
      overflow: hidden;
      margin-right: 50px;
      margin-bottom: 20px;
      cursor: pointer;
      &.is-checked {
        border: 3px solid blue;
      }
      &:hover {
        opacity: 0.8;
      }
      span {
        float: left;
        margin-top: -20px;
        background-color: rgba(255, 255, 255, 0.8);
        width: 200px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        color: black;
        font-size: 12px;
      }
    }
  }
}
.form-container {
  // background-color: rgb(253 246 246);
  // height: 900px;
  padding: 20px;
  .user-product {
    font-weight: bold;
  }
}
</style>
