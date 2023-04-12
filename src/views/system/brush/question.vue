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
                  <el-radio v-if="currentTopic.optionA !== '' && currentTopic.optionA !== null" label="A" style="display: block; padding-top: 10px;">{{currentTopic.optionA}}</el-radio>
                  <el-radio v-if="currentTopic.optionB !== '' && currentTopic.optionB !== null" label="B" style="display: block; padding-top: 10px;">{{currentTopic.optionB}}</el-radio>
                  <el-radio v-if="currentTopic.optionC !== '' && currentTopic.optionC !== null" label="C" style="display: block; padding-top: 10px;">{{currentTopic.optionC}}</el-radio>
                  <el-radio v-if="currentTopic.optionD !== '' && currentTopic.optionD !== null" label="D" style="display: block; padding-top: 10px;">{{currentTopic.optionD}}</el-radio>
                  <el-radio v-if="currentTopic.optionE !== '' && currentTopic.optionE !== null" label="E" style="display: block; padding-top: 10px;">{{currentTopic.optionE}}</el-radio>
                </el-radio-group>
                <el-checkbox-group v-model="from.answers" v-show="currentTopic.type === 2">
                  <el-checkbox v-if="currentTopic.optionA !== '' && currentTopic.optionA !== null" label="A" style="display: block; padding-top: 10px;">{{currentTopic.optionA}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionB !== '' && currentTopic.optionB !== null" label="B" style="display: block; padding-top: 10px;">{{currentTopic.optionB}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionC !== '' && currentTopic.optionC !== null" label="C" style="display: block; padding-top: 10px;">{{currentTopic.optionC}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionD !== '' && currentTopic.optionD !== null" label="D" style="display: block; padding-top: 10px;">{{currentTopic.optionD}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionE !== '' && currentTopic.optionE !== null" label="E" style="display: block; padding-top: 10px;">{{currentTopic.optionE}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="buttonsbox" >
                <input @click="showPrevQuestion()" v-show="displayPrevQuestion()" type="button" class="button btn_last btn_qno" value="< 上一题">
                <input @click="submitAnswer()" type="button" class="button btn_last btn_qno" value="提交答案">
                <input @click="showNextQuestion()" v-show="displayNextQuestion()" type="button" class="button btn_next btn_qno" value="下一题 >">
              </div>
            </div>
            <div class="exam_analys" style="display: block;" v-show="isMyAnswerNull(this.tabNo)">
              <i></i>
              <div class="hd">
                <span class="grey bold answerdb">
                    我的答案：{{ this.myAnswer }}
                </span>
              </div>
              <div class="hd">
                <span class="green bold answerdb" v-html="'正确答案:' + this.rightAnswers">
                </span>
              </div>
              <div class="key_box">
                <h4>参考解析：</h4>
                <p v-html=" this.analysis ">
                </p>
              </div>
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
  name: "question",
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
      },
      myAnswer: '', // 我的答案
      rightAnswers: '', // 正确答案
      analysis: '' // 解析
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
            return className = 'cur' // 退出循环
          } else if (!item.flag) {
            return className = 'err' // 退出循环
          } else {
            return className = 'mid' // 退出循环
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
      this.showQuestion(this.tabNo - 1)
    },
    async showNextQuestion(){
      this.showQuestion(this.tabNo + 1)
    },
    submitAnswer(){
      // 判断当前题是否已经答题
      let LastProblem = false
      this.answerList.forEach(item => {
        if (item.tabNo === this.tabNo) {
          return LastProblem = true
        }
      })
      if (LastProblem) {
        // 弹窗提示
        this.$message({
          message: '当前题已经答题',
          type: 'warning'
        });
        return false
      }
      // 判断是否选择了答案
      if (this.from.answer === '' && this.from.answers.length === 0) {
        // 弹窗提示
        this.$message({
          message: '请选择答案',
          type: 'warning'
        });
        return false
      }
      // 调用答题接口
      const data = {
        id: this.from.topicId,
        answer: this.from.answer || this.from.answers.sort().join('')
      }
      questionCheckAnswer(data).then(res => {
        this.answerList.push({
          tabNo: this.tabNo,
          flag: res.data.flag,
          topicId: this.from.topicId,
          answer: this.from.answer,
          answers: this.from.answers,
          rightAnswers: res.data.answer, // 正确答案
          analysis: res.data.analysis // 解析
        })
      })
    },
    displayPrevQuestion(){
      return this.tabNo > 1;
    },
    displayNextQuestion(){
      return this.tabNo < this.total;
    },
    isMyAnswerNull(tabNo) {
      // 从this.answerList中获取答题数据
      let resultAnswer = this.answerList.filter(item => {
        return item.tabNo === tabNo
      })
      if (resultAnswer.length > 0) {
        // 判断是否正确
        if (resultAnswer[0].flag) {
          return false
        } else {
          this.myAnswer = resultAnswer[0].answer || resultAnswer[0].answers
          this.rightAnswers = resultAnswer[0].rightAnswers
          this.analysis = resultAnswer[0].analysis
          return true
        }
      }
      return false
    },
  }
};
</script>
