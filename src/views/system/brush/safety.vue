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
                  v-bind:class="card_result(question)" @click="showQuestion(index + 1)"
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
                  <el-radio v-if="currentTopic.optionA !== ''" label="A">{{currentTopic.optionA}}</el-radio>
                  <el-radio v-if="currentTopic.optionB !== ''" label="B">{{currentTopic.optionB}}</el-radio>
                  <el-radio v-if="currentTopic.optionC !== ''" label="C">{{currentTopic.optionC}}</el-radio>
                  <el-radio v-if="currentTopic.optionD !== ''" label="D">{{currentTopic.optionD}}</el-radio>
                  <el-radio v-if="currentTopic.optionE !== ''" label="E">{{currentTopic.optionE}}</el-radio>
                </el-radio-group>
                <el-checkbox-group v-model="from.answers" v-show="currentTopic.type === 2">
                  <el-checkbox v-if="currentTopic.optionA !== ''" label="A">{{currentTopic.optionA}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionB !== ''" label="B">{{currentTopic.optionB}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionC !== ''" label="C">{{currentTopic.optionC}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionD !== ''" label="D">{{currentTopic.optionD}}</el-checkbox>
                  <el-checkbox v-if="currentTopic.optionE !== ''" label="E">{{currentTopic.optionE}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="buttonsbox" >
              <input @click="showPrevQuestion()" v-show="displayPrevQuestion()" type="button" class="button btn_last btn_qno" value="< 上一题">
              <input @click="showNextQuestion()" v-show="displayNextQuestion()" type="button" class="button btn_next btn_qno" value="下一题 >">
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { randomExam, checkAnswer } from "@/api/system/brush/safety";

export default {
  name: "safety",
  dicts: ['topic_type'],
  data() {
    return {
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
      randomExam().then(res => {
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
    card_result: function (question) {
      if (question.answer === question.answer) {
        return 'cur';
      } else if (question.answer === '') {
        return 'mid';
      } else {
        return 'err';
      }
    },
    showQuestion(tabNo){
      this.reset()
      this.currentTopic = this.safetyList[tabNo - 1]
      this.tabNo = tabNo;
    },
    showPrevQuestion(){
      this.tabNo--;
    },
    showNextQuestion(){
      this.tabNo++;
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
