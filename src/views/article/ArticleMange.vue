<script setup>
import { onMounted, ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { artGetListService } from '@/api/article'
import ArticleEdit from './components/ArticleEdit.vue'
//import { artGetListService, artDelService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'

const total = ref(2)
//假数据
const articleList = ref([
  {
    id: 5961,
    title: '新的文章',
    pub_date: '2022-07-10 14:53:52.602',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
])

//基于params参数,获取文章列表
const getArticleList = async () => {
  // loading.value = true

  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  // loading.value = false
}
//初始化调用
onMounted(() => {
  getArticleList()
})

const onDeleteArticle = (row) => {
  console.log(row)
}

// 定义请求参数对象
const params = ref({
  pagenum: 1, //当前页
  pagesize: 5, //当前生效的每页条数
  cate_id: '',
  state: ''
})
//分页修改逻辑
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// loading处理
// const loading = ref(false)
//搜索和重置功能

// const getArticleList = async () => {
//   loading.value=true
//   loading.value=false
// }
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
//控制抽屉显示隐藏
const visibleDrawer = ref(false) // 修正变量名
//添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
//编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
const articleEditRef = ref()

</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
<!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类: ">
        <el-select v-model="params.cate_id">
          <el-option label="新闻" value="111"></el-option>
          <el-option label="体育" value="222"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态: ">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
<!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" prop="title" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

<!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper,total,sizes,prev,pager,next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
<!-- <channel-select v-model="params.cate_id"></channel-select> -->
<!-- 抽屉 -->
 <article-edit ref="articleEditRef"></article-edit>
  </page-container>
</template>

<style scoped>
/* Add your custom styles here */
</style>

