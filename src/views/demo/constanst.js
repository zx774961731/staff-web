export const generalOptions = [
  {
    label: '客服1',
    value: 'staff1',
  },
  {
    label: '客服2',
    value: 'staff2',
  },
  {
    label: '客服3',
    value: 'staff3',
  },
  {
    label: '客服4',
    value: 'staff4',
  },
  {
    label: '客服5',
    value: 'staff5',
  },
  {
    label: '客服6',
    value: 'staff6',
  },
  {
    label: '客服7',
    value: 'staff7',
  },
  {
    label: '客服8',
    value: 'staff8',
  },
  {
    label: '客服9',
    value: 'staff9',
  },
]

export const userOptions = [
  {
    label: '用户1',
    value: 'customer1',
  },
  {
    label: '用户2',
    value: 'customer2',
  },
  {
    label: '用户3',
    value: 'customer3',
  },
]

export const productList = [
  {
    id: 1001,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    name: '产品A',
  },
  {
    id: 1002,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    name: '产品B',
  },
  {
    id: 1003,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    name: '产品C',
  },
  {
    id: 1004,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    name: '产品D',
  },
]

export const allProductList = [
  {
    id: 2001,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    name: '产品1',
  },
  {
    id: 2002,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    name: '产品2',
  },
  {
    id: 2003,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    name: '产品3',
  },
  {
    id: 2004,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    name: '产品4',
  },
  {
    id: 2005,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    name: '产品5',
  },
  {
    id: 2006,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    name: '产品6',
  },
  {
    id: 2007,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    name: '产品7',
  },
  {
    id: 2008,
    url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    name: '产品8',
  },
]

// 邮箱正则校验
export const regexpEmail = (rule, email) => {
  const regexp = /^([a-zA-Z0-9_]-*\.*)+@([a-zA-Z0-9_]-?)+(\.[a-zA-Z]{2,3}){1,2}$/
  return regexp.test(email)
}
// 电话号码正则校验
export const regexpPhone = (rule, phone) => {
  const regexp = /^1[3456789]\d{9}$/
  return regexp.test(phone)
}
