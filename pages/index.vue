<template>
  <div id="app" style="background:#CEF6D8;">
    <!-- <full-page :options="options" id="fullpage" ref="fullpage">
      <div class="section" align="center">
        <img src="~/assets/SHH.png" />
        <img src="~/assets/TMU.png" height="177px" width="180px" />
        <div>
          <br />
          <h1>NCU交班系統</h1>
          <p style="font-family:'Brush Script MT'">
            <font size="5">
              by Ming-Chin Lab
            </font>
          </p>
        </div>

        <p>向下滑以開始記錄</p>
        <p class="introimg">&darr;&#9636;&darr;</p>
      </div> -->
    <div class="section">
      <div class="slide" align="center">
        <br />
        <h2>
          <img
            src="~/assets/SHH.png"
            height="77px"
            width="90px"
          />&nbsp;NCU 研究記錄系統&nbsp;<img
            src="~/assets/TMU.png"
            height="80px"
            width="78px"
          />
        </h2>
        <p style="font-family:'Brush Script MT'">
          <font size="3">
            <u>by Ming-Chin Lab😄</u>
          </font>
        </p>
        <form>
          <div id="clock">
            <p>{{ clock }}</p>
          </div>
          <!-- <p style="font-family: 'Share Tech Mono', monospace">
              {{ currentDT }}
            </p> -->
          <b-row align-h="between">
            <b-col cols="3"></b-col>
            <b-col>
              <label>床號</label>
              <b-input
                type="number"
                maxlength="2"
                name="bedNo"
                v-model="currentData.bedNo"
                class="w-15 inline"
                size="sm"
                readonly
              />
            </b-col>
            <b-col cols="3">
              <b-button variant="warning" href="#page3" @click="Readonlyyy()"
                >手動更改</b-button
              >
            </b-col>
          </b-row>
          <p></p>
          <p>
            patientID
            <b-input
              type="text"
              placeholder="病人ID"
              name="patientID"
              v-model="currentData.patientID"
              required
              class="w-25 inline"
              size="sm"
              v-bind:readonly="is_readonly"
            />
          </p>
          <div>
            <b-row align-h="between">
              <b-col cols="3"></b-col>
              <b-col>
                <p>
                  sensor貼身
                  <b-input
                    type="text"
                    placeholder="貼身"
                    name="s1"
                    v-model="currentData.s1"
                    class="w-25 inline"
                    size="sm"
                    v-bind:readonly="is_readonly"
                  />
                  <b-input
                    type="text"
                    placeholder="貼身"
                    name="s2"
                    v-model="currentData.s2"
                    class="w-25 inline"
                    size="sm"
                    v-bind:readonly="is_readonly"
                  />
                </p>
              </b-col>
              <b-col cols="3">
                <b-button
                  variant="warning"
                  href="#page3"
                  @click="RefreshSensor()"
                  >sensor刷新</b-button
                >
              </b-col>
            </b-row>
            <b-row align-h="between">
              <b-col cols="3"></b-col>
              <b-col>
                <p>
                  sensor貼頭
                  <b-input
                    type="text"
                    placeholder="貼頭"
                    name="s3"
                    v-model="currentData.s3"
                    class="w-25 inline"
                    size="sm"
                    v-bind:readonly="is_readonly"
                  />
                  <b-input
                    type="text"
                    placeholder="貼頭"
                    name="s4"
                    v-model="currentData.s4"
                    class="w-25 inline"
                    size="sm"
                    v-bind:readonly="is_readonly"
                  />
                </p>
              </b-col>
              <b-col cols="3"></b-col>
            </b-row>
          </div>
          <hr width="70%" />
          <div>
            <b-row align-h="between">
              <b-col cols="3"
                ><b-button @click="preBed()" size="lg">上一床</b-button>
              </b-col>

              <label class="typo__label"
                ><span v-if="isEditing" style="color:red"
                  >⛔️編輯中⛔️<br /></span
                ><h4>狀態</h4></label
              >
              <b-col cols="3"
                ><b-button @click="nextBed()" size="lg">下一床</b-button>
              </b-col>
            </b-row>
            <!-- v-model="multiValue" -->
            <multiselect
              v-model="currentData.diagnosis"
              :options="multiOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="true"
              :preserve-search="false"
              :group-select="true"
              :searchable="false"
              group-label="type"
              group-values="libs"
              label="name"
              track-by="name"
              class="w-40"
              size="lg"
            >
              <template slot="selection" slot-scope="{ values, search, isOpen }"
                ><span
                  class="multiselect__single"
                  v-if="multiValue.length &amp;&amp; !isOpen"
                  >{{ multiValue.length }} options selected
                </span>
              </template>
            </multiselect>
            <b-form-checkbox v-model="checked2" size="lg">(狀態手動新增)</b-form-checkbox>
            <div v-if="checked2">
                <b-input class="w-25 inline" v-model="currentData.diagnosis2" />
              </div>
            <!-- <pre class="language-json"><code>{{multiValue.value}}</code></!-->
          </div>
          <br />
          <b-row align-h="between">
            <b-col cols="3"></b-col>
            <h4>備註</h4>
            <b-col cols="3"><b-button variant="light" id="show-btn" @click="$bvModal.show('bv-modal-example')">班表記錄</b-button></b-col>
            <b-modal id="bv-modal-example" size="lg" hide-footer>
              <template v-slot:modal-title>
            <b-container>
              <b-row>
                <!-- <b-col><b-button @click="preMonth()">上個月</b-button></b-col> -->
                <b-col>{{month-1}} 月份班表及薪水</b-col>
                <!-- <b-col><b-button @click="nextMonth()">下個月</b-button></b-col> -->
              </b-row>
            </b-container>
              </template>
            <div class="d-block text-center">
              <b-table
              striped hover
              :fields="salaryField"
              :items="salaryItem"
              >
              </b-table>

              <b-table
              striped hover
              :fields="nurseField"
              :items="NurseByDay"
              >
              </b-table>
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">關閉</b-button>
            </b-modal>
          </b-row>
            <br />
            <multiselect
              v-model="currentData.remark"
              :options="remarkOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="true"
              :preserve-search="false"
              label="name"
              track-by="name"
              :searchable="false"
              class="w-40"
            >
              <template slot="selection" slot-scope="{ values, search, isOpen }"
                ><span
                  class="multiselect__single"
                  v-if="multiValue.length &amp;&amp; !isOpen"
                  >{{ multiValue.length }} options selected
                </span>
              </template>
            </multiselect>
            <div>
                <!-- <input type="checkbox" v-model="checked" size="lg" />手動新增 -->
              <b-form-checkbox v-model="checked" size="lg">(備註手動新增)</b-form-checkbox>
              </div>
              <div v-if="checked">
                <b-input class="w-25 inline" v-model="currentData.remark2" />
              </div>
            <br />
            護理師
            <b-form-select
              class="inline"
              style="width: 10%"
              v-model="currentData.nurse"
              :options="nurse"
            />
          <!-- <input type="submit" value="新增" @click="addPatient" /> -->
          <b-button variant="success" size="lg" @click="addPatient"
            >新增</b-button
          >
        </form><br>
        <div>
          <b-table
            striped
            hover
            :items="PatientsByBedNo"
            :fields="paitentFields"
            responsive="lg"
            @row-clicked="rowOnClick"
          >
            <template v-slot:cell(_)="x">
              <b-button variant="danger" @click="deletePatient(x.item.id)">
                刪除
              </b-button>
            </template>
          </b-table>
        </div>
      </div>
      <!-- <div class="slide">
          <h3>Slide 2.2</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.3</h3>
        </div> -->
    </div>
    <!-- <div class="section 3 ">
        <p align="center">{{ month }}月份排班記錄</p>
      </div> -->
    <!-- </full-page> -->
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      //clock_vue
      clock: "",
      month:0,
      day:"",
      paitentFields: [
        {
          key: "datetime",
          label: "時間日期"
        },
        {
          key: "bedNo",
          label: "床號"
        },
        {
          key: "patientID",
          label: "patientID"
        },
        {
          key: "s1",
          label: "貼身"
        },
        {
          key: "s2",
          label: "貼身"
        },
        {
          key: "s3",
          label: "貼頭"
        },
        {
          key: "s4",
          label: "貼頭"
        },
        {
          key: "diagnosis",
          label: "診斷"
        },
        {
          key: "remark",
          label: "備註"
        },
        {
          key: "nurse",
          label: "護理師"
        },
        {
          key: "_",
        }
      ],
      nurseField: [
        "datetime",
        "nurse",
      ],
      salaryField: [
        {key:'nurse', label:'護理人員'},{key:'quantity',label:'次數'},{key:'fee', label:'費用'}
      ],
      salaryItem:[
        {'nurse': "施",'quantity':'','fee':''},
        {'nurse': "如",'quantity':'','fee':''},
        {'nurse': "鈺",'quantity':'','fee':''},
        {'nurse': "婷",'quantity':'','fee':''},
        {'nurse': "馮",'quantity':'','fee':''},
        {'nurse': "劉",'quantity':'','fee':''},
        {'nurse': "孟",'quantity':'','fee':''},
        {'nurse': "君",'quantity':'','fee':''},
        {'nurse': "于",'quantity':'','fee':''},
        {'nurse': " ",'quantity':'','fee':''},
      ],
      nurse: [
        { value: "施", text: "施" },
        { value: "如", text: "如" },
        { value: "鈺", text: "鈺" },
        { value: "婷", text: "婷" },
        { value: "馮", text: "馮" },
        { value: "劉", text: "劉" },
        { value: "孟", text: "孟" },
        { value: "君", text: "君" },
        { value: "于", text: "于" }
      ],
      currentData: {
        bedNo: 1,
        patientID: "",
        s1: "",
        s2: "",
        s3: "",
        s4: "",
        diagnosis: [],
        diagnosis2: "",
        remark: [],
        remark2: "",
        nurse: ""
      },
      PatientsByBedNo: [],
      NurseByDay: [],
      // currentDT: [],
      month: "",
      multiValue: [],
      multiOptions: [
        {
          libs: [
            { name: "不收案", value: "pass" },
            { name: "手術中", value:"oping"},
            { name: "腦部開刀", value: "op" }
          ]
        },
        //診斷
        {
          type: "🔽🔽🔽 診斷 🔽🔽🔽",
          libs: [
            { name: "ICH", value: "ICH" },
            { name: "SAH", value: "SAH" },
            { name: "EDH", value: "EDH" },
            { name: "SDH", value: "SDH" },
            { name: "Infarction(無tPA)", value: "Infarction_NoTPA" },
            { name: "Infarction(有tPA)", value: "Infarction" },
            { name: "Seizure", value: "Seizure" },
            { name: "Spine相關診斷", value: "Spine相關診斷" },
            { name: "Brain Tumor", value: "Brain_tumor" },
            { name: "Aneurysm", value: "Aneurysm" }
          ]
        },
        //病史
        {
          type: "🔽🔽🔽 病史 🔽🔽🔽",
          libs: [
            { name: "hx of Seizure", value: "h_Seizure" },
            { name: "hx of ICH", value: "h_ICH" },
            { name: "hx of Infarction", value: "h_Infarction" }
          ]
        }
      ],
      remarkOptions: [
        { name: "流汗", value: "流汗" },
        { name: "口水多", value: "口水多" },
        { name: "隔離", value: "隔離" },
        { name: "管路多", value: "管路多" },
        { name: "躁動不安", value: "躁動不安" },
        { name: "使用BIPAP", value: "使用BIPAP"},
        { name: "清醒", value: "清醒" },
        { name: "皮紅", value: "皮紅" },
        { name: "有傷口", value: "有傷口" },
        { name: "預轉", value: "預轉" },
        { name: "貼神內", value: "貼神內" },
        { name: "頸圈", value: "頸圈" },
      ],
      patientData: {},
      isEditing: false,
      checked: false,
      checked2: false,
      is_readonly: true
      // options: {
      //   afterLoad: this.afterLoad,
      //   navigation: true,
      //   anchors: ["page1", "page2", "page3"],
      //   sectionsColor: ["#E3F6CE", "#CEF6D8", "#9fdf9f"]
      // }
    };
  },
  mounted() {
    // var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var timerID = setInterval(updateTime, 1000);
    let that = this;
    updateTime();
    function updateTime() {
      var cd = new Date();
      that.month = cd.getMonth() + 1;
      that.clock =
        zeroPadding(cd.getFullYear(), 4) +
        "-" +
        zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        zeroPadding(cd.getDate(), 2) +
        " " +
        zeroPadding(cd.getHours(), 2) +
        ":" +
        zeroPadding(cd.getMinutes(), 2) +
        ":" +
        zeroPadding(cd.getSeconds(), 2);
      // week[cd.getDay()];
    }

    function zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }

    this.getPatientsByBedNo(1);
    this.getSensorsByBedNo(1);
    this.getPIDbyBedNo(1);
    this.getNurseByMonth(this.month-1);
  },
  methods: {
    // getCurrentDT() {
    //   const DT = new Date();
    //   this.currentDT = DT.toLocaleString("en-US", {
    //     timeZone: "Asia/Shanghai"
    //   });
    // },
    checkboxOnClick() {},
    rowOnClick(user) {
      console.log(user);
      if (user.diagnosis != "") {
        this.currentData.diagnosis = user.diagnosis.split(",").map(item => {
          return { name: item, value: item };
        });
      } else {
        this.currentData.diagnosis = [];
      }
      if (user.remark != ""){
              this.currentData.remark = user.remark.split(",").map(item => {
        return { name: item, value: item };
      });
      this.currentData.remark.forEach(item => {
        if (
          this.remarkOptions.find(remark => remark.name == item.name) == null
        ) {
          this.remarkOptions.push(item);
        }
      });
      } else {
        this.currentData.remark =[];
      }

      // this.currentData.nurse = user.nurse;
      this.isEditing = true;
    },
    async getPIDbyBedNo(num) {
      function zeroPadding(num, digit) {
        var zero = "";
        for (var i = 0; i < digit; i++) {
          zero += "0";
        }
        return (zero + num).slice(-digit);
      }

      let p = (
        await this.$axios.get("/api/getPatientData/NCU" + zeroPadding(num, 2))
      ).data;
      this.patientData = p;
      // console.log(p);
      if (p.patientID != null) {
        this.currentData.patientID =
          this.patientData.patientID + " " + this.patientData.patientName;
      } else {
        this.currentData.patientID = "空床";
      }
      // console.log(typeof this.currentData.patientID);
    },
    async RefreshSensor() {
      this.getSensorsByBedNo(this.currentData.bedNo);
    },
    async Readonlyyy() {
      if (this.is_readonly) {
        this.is_readonly = false;
      } else {
        this.is_readonly = true;
      }
    },
    async getPatientsByBedNo(num) {
      let p = (await this.$axios.get("api/patient/bed/" + num)).data;
      p.map(item => {
        item.datetime = new Date(item.datetime).toLocaleString();
        return item;
      });
      this.PatientsByBedNo = p;
    },
    async getNurseByMonth(num){
      let p = (await this.$axios.get("/api/nurse/" + num)).data;
      p.map(item => {
        item.datetime = new Date(item.datetime).toLocaleString();
        return item;
      })
      let p2 = p.filter(p => p.bedNo == 9);
      this.NurseByDay = p2;

      let n1 = p2.filter(p => p.nurse == '施');
      let n2 = p2.filter(p => p.nurse == '如');
      let n3 = p2.filter(p => p.nurse == '鈺');
      let n4 = p2.filter(p => p.nurse == '婷');
      let n5 = p2.filter(p => p.nurse == '馮');
      let n6 = p2.filter(p => p.nurse == '劉');
      let n7 = p2.filter(p => p.nurse == '孟');
      let n8 = p2.filter(p => p.nurse == '君');
      let n9 = p2.filter(p => p.nurse == '于');

      this.salaryItem.map(i => {
        if (i.nurse == "施"){
          i.quantity = n1.length;
        } else if (i.nurse == "如") {
          i.quantity = n2.length;
        } else if (i.nurse == "鈺") {
          i.quantity = n3.length;
        } else if (i.nurse == "婷") {
          i.quantity = n4.length;
        } else if (i.nurse == "馮") {
          i.quantity = n5.length;
        } else if (i.nurse == "劉") {
          i.quantity = n6.length;
        } else if (i.nurse == "孟") {
          i.quantity = n7.length;
        } else if (i.nurse == "君") {
          i.quantity = n8.length;
        } else if (i.nurse == "于") {
          i.quantity = n9.length;
        } else {
          i.quantity = n1.length+n2.length+n3.length+n4.length+n5.length+n6.length+n7.length+n8.length+n9.length;
        }
        i.fee = i.quantity*250;
        return i;
      })
      // switch(p2.filter(p=>)) {
      //   case
      // }
    },
    // async preMonth(){
    //   if (this.month == 1) {
    //     this.getNurseByMonth(12)
    //   } else {
    //     this.getNurseByMonth(num-1)
    //   }
    // },
    // async nextMonth(){
    //   if (this.month == 12) {
    //     this.getNurseByMonth(1)
    //   } else {
    //     this.getNurseByMonth(num+1)
    //   }
    // },
    async getSensorsByBedNo(num) {
      function zeroPadding(num, digit) {
        var zero = "";
        for (var i = 0; i < digit; i++) {
          zero += "0";
        }
        return (zero + num).slice(-digit);
      }

      let s = (
        await this.$axios.get("/api/sensor/phoneID/Bed_" + zeroPadding(num, 2))
      ).data;
      if (s != null) {
        this.currentData.s1 = s.s1;
        this.currentData.s2 = s.s2;
        this.currentData.s3 = s.s3;
        this.currentData.s4 = s.s4;
      }
    },
    async addPatient() {
      this.isEditing = false;
      // this.checked = false;
      if (this.currentData.patientID != "") {
        if (this.checked == true && this.checked2 == true) {
          console.log(this.currentData.remark2);
          console.log(this.currentData.diagnosis2);
          this.currentData.diagnosis.push({
            name: this.currentData.diagnosis2,
            value: this.currentData.diagnosis2
          });
          this.currentData.remark.push({
            name: this.currentData.remark2,
            value: this.currentData.remark2
          });
          await this.$axios.post("/api/patient", {
            bedNo: this.currentData.bedNo,
            patientID: this.currentData.patientID,
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: this.currentData.diagnosis,
            diagnosis2: "",
            remark: this.currentData.remark,
            remark2: "",
            nurse: this.currentData.nurse
          });
          console.log(this.currentData.reamrk);
          console.log(this.currentData.diagnosis);
          this.getPatientsByBedNo(this.currentData.bedNo);
          this.getPIDbyBedNo(this.currentData.bedNo);
          this.currentData = {
            bedNo: this.currentData.bedNo,
            patientID: "",
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: [],
            diagnosis2:"",
            remark: [],
            remark2: "",
            nurse: this.currentData.nurse
          };
        } else if (this.checked == true) {
          console.log(this.currentData.remark2);
          this.currentData.remark.push({
            name: this.currentData.remark2,
            value: this.currentData.remark2
          });
          await this.$axios.post("/api/patient", {
            bedNo: this.currentData.bedNo,
            patientID: this.currentData.patientID,
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: this.currentData.diagnosis,
            diagnosis2: "",
            remark: this.currentData.remark,
            remark2: "",
            nurse: this.currentData.nurse
          });
          console.log(this.currentData.reamrk);
          this.getPatientsByBedNo(this.currentData.bedNo);
          this.getPIDbyBedNo(this.currentData.bedNo);
          this.currentData = {
            bedNo: this.currentData.bedNo,
            patientID: "",
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: [],
            diagnosis2:"",
            remark: [],
            remark2: "",
            nurse: this.currentData.nurse
          };

        } else if (this.checked2 == true) {
          console.log(this.currentData.diagnosis2);
          this.currentData.diagnosis.push({
            name: this.currentData.diagnosis2,
            value: this.currentData.diagnosis2
          });
          await this.$axios.post("/api/patient", {
            bedNo: this.currentData.bedNo,
            patientID: this.currentData.patientID,
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: this.currentData.diagnosis,
            diagnosis2: "",
            remark: this.currentData.remark,
            remark2: "",
            nurse: this.currentData.nurse
          });
          console.log(this.currentData.diagnosis);
          this.getPatientsByBedNo(this.currentData.bedNo);
          this.getPIDbyBedNo(this.currentData.bedNo);
          this.currentData = {
            bedNo: this.currentData.bedNo,
            patientID: "",
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: [],
            diagnosis2:"",
            remark: [],
            remark2: "",
            nurse: this.currentData.nurse
          };

        } else {
          await this.$axios.post("/api/patient", {
            bedNo: this.currentData.bedNo,
            patientID: this.currentData.patientID,
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: this.currentData.diagnosis,
            diagnosis2: "",
            remark: this.currentData.remark,
            remark2: "",
            nurse: this.currentData.nurse
          });
          console.log(this.currentData.reamrk);
          this.getPatientsByBedNo(this.currentData.bedNo);
          this.getPIDbyBedNo(this.currentData.bedNo);
          this.currentData = {
            bedNo: this.currentData.bedNo,
            patientID: "",
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: [],
            diagnosis2: "",
            remark: [],
            remark2: "",
            nurse: this.currentData.nurse
          };
        }
      } else {
        if (confirm("病歷號為空，是否為空床??")) {
          console.log(this.currentData.remark2);
          this.currentData.diagnosis.push({
            name: this.currentData.diagnosis2,
            value: this.currentData.diagnosis2
          });
          this.currentData.remark.push({
            name: this.currentData.remark2,
            value: this.currentData.remark2
          });
          await this.$axios.post("/api/patient", {
            bedNo: this.currentData.bedNo,
            patientID: this.currentData.patientID,
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: this.currentData.diagnosis,
            diagnosis2: "",
            remark: this.currentData.remark,
            remark2: "",
            nurse: this.currentData.nurse
          });
          console.log(this.currentData.reamrk);
          this.getPatientsByBedNo(this.currentData.bedNo);
          this.getPIDbyBedNo(this.currentData.bedNo);
          this.currentData = {
            bedNo: this.currentData.bedNo,
            patientID: "",
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: [],
            diagnosis2: "",
            remark: [],
            remark2: "",
            nurse: this.currentData.nurse
          };
        } else {
          await this.$axios.post("/api/patient", {
            bedNo: this.currentData.bedNo,
            patientID: this.currentData.patientID,
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: this.currentData.diagnosis,
            diagnosis2: "",
            remark: this.currentData.remark,
            remark2: "",
            nurse: this.currentData.nurse
          });
          console.log(this.currentData.reamrk);
          this.getPatientsByBedNo(this.currentData.bedNo);
          this.getPIDbyBedNo(this.currentData.bedNo);
          this.currentData = {
            bedNo: this.currentData.bedNo,
            patientID: "",
            s1: this.currentData.s1,
            s2: this.currentData.s2,
            s3: this.currentData.s3,
            s4: this.currentData.s4,
            diagnosis: [],
            diagnosis2: "",
            remark: [],
            remark2: "",
            nurse: this.currentData.nurse
          };
        }
      }
    },
    async deletePatient(id) {
      this.isEditing = false;
      this.checked = false;
      this.checked2 = false;
      var a = confirm("確定要刪除嗎");
      if (a == true) {
        await this.$axios.delete("/api/patient/" + id);
        this.getPatientsByBedNo(this.currentData.bedNo);
        this.getPIDbyBedNo(this.currentData.bedNo);
      } else {
        return;
      }
    },
    // async deleteSensor() {
    //   await this.$axios.delete("/api/sensors/:id");
    // },
    async preBed() {
      this.isEditing = false;
      this.checked = false;
      this.checked2 = false;
      if (this.currentData.bedNo == 1) {
        this.getPatientsByBedNo(25);
        this.getSensorsByBedNo(25);
        this.getPIDbyBedNo(25);
        this.currentData = {
          bedNo: 25,
          patientID: "",
          s1: "",
          s2: "",
          s3: "",
          s4: "",
          diagnosis: [],
          diagnosis2: "",
          remark: [],
          remark2: "",
          nurse: this.currentData.nurse
        };
      } else if (this.currentData.bedNo == 5 || this.currentData.bedNo == 15 || this.currentData.bedNo == 25) {
        this.getSensorsByBedNo(this.currentData.bedNo - 2);
        this.getPatientsByBedNo(this.currentData.bedNo - 2);
        this.getPIDbyBedNo(this.currentData.bedNo - 2);
        this.currentData = {
          bedNo: this.currentData.bedNo - 2,
          patientID: "",
          s1: "",
          s2: "",
          s3: "",
          s4: "",
          diagnosis: [],
          diagnosis2: "",
          remark: [],
          remark2: "",
          nurse: this.currentData.nurse
        };
      } else {
        this.getSensorsByBedNo(this.currentData.bedNo - 1);
        this.getPatientsByBedNo(this.currentData.bedNo - 1);
        this.getPIDbyBedNo(this.currentData.bedNo - 1);
        this.currentData = {
          bedNo: this.currentData.bedNo - 1,
          patientID: "",
          s1: "",
          s2: "",
          s3: "",
          s4: "",
          diagnosis: [],
          diagnosis2: "",
          remark: [],
          remark2: "",
          nurse: this.currentData.nurse
        };
      }
    },
    async nextBed() {
      this.isEditing = false;
      this.checked = false;
      this.checked2 = false;
      if (this.currentData.bedNo == 25) {
        this.getSensorsByBedNo(1);
        this.getPatientsByBedNo(1);
        this.getPIDbyBedNo(1);
        this.currentData = {
          bedNo: 1,
          patientID: "",
          s1: "",
          s2: "",
          s3: "",
          s4: "",
          diagnosis: [],
          diagnosis2:"",
          remark: [],
          remark2: "",
          nurse: this.currentData.nurse
        };
      } else if (this.currentData.bedNo == 3 || this.currentData.bedNo == 13 || this.currentData.bedNo == 23) {
        this.getSensorsByBedNo(this.currentData.bedNo + 2);
        this.getPatientsByBedNo(this.currentData.bedNo + 2);
        this.getPIDbyBedNo(this.currentData.bedNo + 2);
        this.currentData = {
          bedNo: this.currentData.bedNo + 2,
          patientID: "",
          s1: "",
          s2: "",
          s3: "",
          s4: "",
          diagnosis: [],
          diagnosis2:"",
          remark: [],
          remark2: "",
          nurse: this.currentData.nurse
        };
      } else {
        this.getSensorsByBedNo(this.currentData.bedNo + 1);
        this.getPatientsByBedNo(this.currentData.bedNo + 1);
        this.getPIDbyBedNo(this.currentData.bedNo + 1);
        this.currentData = {
          bedNo: this.currentData.bedNo + 1,
          patientID: "",
          s1: "",
          s2: "",
          s3: "",
          s4: "",
          diagnosis: [],
          diagnosis2:"",
          remark: [],
          remark2: "",
          nurse: this.currentData.nurse
        };
      }
    }
  }
};
</script>

<style>
#clock {
  font-family: "Share Tech Mono", monospace;
  /* color: #ffffff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0); */
}
/*
.text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
} */
.fp-controlArrow.fp-next {
  display: none;
}
.fp-controlArrow.fp-prev {
  display: none;
}
.inline {
  display: inline;
}
.w-10 {
  width: 10%;
}
.w-15 {
  width: 15%;
}
.w-25 {
  width: 25%;
}
.w-40 {
  width: 40%;
}
.h-15 {
  height: 15%;
}
</style>
