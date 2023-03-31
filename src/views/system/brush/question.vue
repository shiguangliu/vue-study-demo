<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="text-align: center">
            <span>考题</span>
          </div>
          <div class="remark" style="position: relative" >
            <i class="cur"></i>
            <span>正确</span>
            <i class="err"></i>
            <span>错误</span>
            <i class="mid"></i>
            <span>未做</span>
          </div>
          <div>
            <div class="exam_menu">答题卡</div>
            <div class="exam_tab">
              <ul class="m_ul">
                <li
                  v-bind:class="card_result(index)" @click="showQuestion(index + 1)"
                   v-for="(question,index) in safetyList" :key="question.id">{{index + 1}}</li>
              </ul>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center">
            <span>考试题目</span>
          </div>
          <div class="exam_main">
            <div class="exam_main_home">
              <div class="exam_itembox">
                <div class="exam_no">
                  <div class="tab_no"> {{ tabNo }} </div>
                  <div class="exam_itemtype" v-for="item in dict.type.topic_type" v-if="item.value === currentTopic.type">{{item.label}}</div>
                </div>
                <div class="tab_question" >
                  <p v-show="true" v-html="currentTopic.title" />
                </div>
              </div>
              <div class="tab_answer_dv" >
                <el-radio-group v-model="from.answer" v-show="currentTopic.type === 1 || currentTopic.type === 3">
                  <el-radio v-if="currentTopic.optionA !== ''" label="A" style="display: block; padding-top: 10px;">{{currentTopic.optionA}}</el-radio>
                  <el-radio v-if="currentTopic.optionB !== ''" label="B" style="display: block; padding-top: 10px;">{{currentTopic.optionB}}</el-radio>
                  <el-radio v-if="currentTopic.optionC !== ''" label="C" style="display: block; padding-top: 10px;">{{currentTopic.optionC}}</el-radio>
                  <el-radio v-if="currentTopic.optionD !== ''" label="D" style="display: block; padding-top: 10px;">{{currentTopic.optionD}}</el-radio>
                  <el-radio v-if="currentTopic.optionE !== ''" label="E" style="display: block; padding-top: 10px;">{{currentTopic.optionE}}</el-radio>
                </el-radio-group>
                <el-checkbox-group v-model="from.answers" v-show="currentTopic.type === 2">
                  <el-checkbox v-if="currentTopic.optionA !== ''" label="A" style="display: block; padding-top: 10px;">{{currentTopic.optionA}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionB !== ''" label="B" style="display: block; padding-top: 10px;">{{currentTopic.optionB}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionC !== ''" label="C" style="display: block; padding-top: 10px;">{{currentTopic.optionC}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionD !== ''" label="D" style="display: block; padding-top: 10px;">{{currentTopic.optionD}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionE !== ''" label="E" style="display: block; padding-top: 10px;">{{currentTopic.optionE}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="buttonsbox" >
              <input @click="showPrevQuestion()" v-show="displayPrevQuestion()" type="button" class="button btn_last btn_qno" value="< 上一题">
              <input @click="showNextQuestion()" type="button" class="button btn_next btn_qno" value="提交答案">
              <input @click="showNextQuestion()" v-show="displayNextQuestion()" type="button" class="button btn_next btn_qno" value="下一题 >">
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { questionRandomExam, questionCheckAnswer } from "@/api/system/brush/question";

export default {
  name: "safety",
  dicts: ['topic_type'],
  data() {
    return {
      answerList: [], // 答案列表
      currentTopic:{},// 当前题
      tabNo: 1, // 当前题号
      total: 0, // 考试总题数
      safetyList: [], // 考试题目
      from: {
        topicId: 0,
        answer: '',
        answers: []
      }
    };
  },
  created() {
    this.getRandomExam();
  },
  methods: {
    getRandomExam() {
      questionRandomExam().then(res => {
        this.safetyList = res.data.items;
        this.total = res.data.total;
        if (this.total > 0) {
          this.from.topicId = this.safetyList[0].id
          this.currentTopic = this.safetyList[0]
        }
      });
    },
    // 表单重置
    reset() {
      this.from = {
        topicId: 0,
        answer: '',
        answers: []
      }
    },
    card_result: function (index) {
      let className = '';
      // 循环判断是否已经答题
       this.answerList.forEach(item => {
          if (item.tabNo === index + 1) {
            if (item.flag) {
              className = 'cur'
              // return {'cur':true,'err':false,'mid':false}
              return true // 退出循环
            } else if (!item.flag) {
              className = 'err'
              // return {'cur':false,'err':true,'mid':false}
              return true // 退出循环
            } else {
              className = 'mid'
              // return {'cur':false,'err':false,'mid':true}
              return true // 退出循环
            }
          }
        })
      return className
    },
    showQuestion(tabNo){
      let flag = false;
      // 判断是否已经答题
      this.answerList.forEach(item => {
        if (item.tabNo === tabNo) {
          this.from.topicId = item.topicId
          this.from.answer = item.answer
          this.from.answers = item.answers
          return flag = true;
        }
      })
      if (!flag) {
        this.reset()
      }
      this.currentTopic = this.safetyList[tabNo - 1]
      this.from.topicId = this.currentTopic.id
      this.tabNo = tabNo;
    },
    // 显示上一题
    async showPrevQuestion(){
      // 先判断下一题要不要掉用接口  然后再当前是否已经答题
      let nextTabNo = this.tabNo // 下一题
      let currentTabNo = this.tabNo - 1 // 当前题
      // 判断下一题是否已经答题
      let LastProblem = false // 下一题是否已经答题
      this.answerList.forEach(item => {
          if (item.tabNo === nextTabNo) {
            return LastProblem = true;
          }
      })
      // 如果下一题未答题并且已经选择答案 则调用答题接口
      if (!LastProblem) {
        if ((this.from.answer !== '' || this.from.answers.length > 0)) {
          const data = {
            id: this.from.topicId,
            answer: this.from.answer || this.from.answers.sort().join('')
          }
          await questionCheckAnswer(data).then(res => {
            this.answerList.push({
              tabNo: nextTabNo,
              topicId: this.from.topicId,
              answer: this.from.answer,
              answers: this.from.answers,
              flag: res.data.flag
            })
          })
        }
      }
      this.showQuestion(currentTabNo)
    },
    async showNextQuestion(){
      // 先判断上一题要不要掉用接口  然后再当前是否已经答题
      let tabNo = this.tabNo + 1 // 下一题
      let currentTabNo = this.tabNo // 当前题
      // 判断上一题是否已经答题
      let LastProblem = false
      this.answerList.forEach(item => {
        if (item.tabNo === currentTabNo) {
          return LastProblem = true
        }
      })
      // 如果上一题未答题并且已经选择答案 则调用答题接口
      if (!LastProblem) {
        // 如果选择了答案 则调用答题接口
        if (this.from.answer !== '' || this.from.answers.length > 0) {
          const data = {
            id: this.from.topicId,
            answer: this.from.answer || this.from.answers.sort().join('')
          }
          await questionCheckAnswer(data).then(res => {
            this.answerList.push({
              tabNo: currentTabNo,
              flag: res.data.flag,
              topicId: this.from.topicId,
              answer: this.from.answer,
              answers: this.from.answers,
            })
          })
        }
      }
      this.showQuestion(tabNo)
    },
    displayPrevQuestion(){
      return this.tabNo > 1;
    },
    displayNextQuestion(){
      return this.tabNo < this.total;
    },
  }
};
</script>
