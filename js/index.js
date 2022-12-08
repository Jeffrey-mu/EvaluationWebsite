/**
 * @Author WangJiaFeng
 * @Description 公共组件封装
 * @email 1115378579@qq.com
 * @Date 2022-12-05 15:44:38 星期一
 * @return
 */
const HEADERCLASSNAME = ".header";
const FOOTERCLASSNAME = ".footer";
const MENUCLASSNAME = ".menu";
const PHONEMENUCLASSNAME = ".menu_phone";
const TOP_RECOMMENDATION = ".top_recommendation"

window.onload = function () {

  // 底部公共
  renderElement(HEADERCLASSNAME, {
    el: HEADERCLASSNAME,
    data: {
      showSearch: false
    },
    async mounted() {
      console.log(await getJson('../api/menu.json'));
    },
    template: `<div class="header">
      <div class="phone_menu icon iconfont">
        &#xe624;
      </div>
      <a href="./index.html" class="text-wrapper_1" v-if="!showSearch">
        <span class="text_1">Evaluation</span>
        <span class="text_2">station</span>
      </a>
      <div class="search_box" v-else>
        <input type="text" class="search_box_input">
      </div>
      <div class="share">
        <img class="label_1" referrerpolicy="no-referrer"
          src="../images/faceBook" />
        <img class="label_2" referrerpolicy="no-referrer"
          src="../images/Twitter" />
        <img class="label_3" referrerpolicy="no-referrer"
          src="../images/Q" />
        <img class="label_4" referrerpolicy="no-referrer"
          src="../images/San" />
        <img class="label_5" referrerpolicy="no-referrer"
          src="../images/Email" />
        <div class="search_box_pc">
          <div class="icon iconfont" style="line-height: 30px;margin: 0 10px;">
          &#xe8d6;
          </div>
          <input type="text" class="search_box_input">
        </div>
      </div>
      <div class="phone_search icon iconfont" @click="showSearch=!showSearch">
        &#xe8d6;
      </div>
    </div>`
  })

  // 菜单
  renderElement(MENUCLASSNAME, {
    el: MENUCLASSNAME,
    data: {
      menu: []
    },
    async mounted() {
      this.menu = await getJson('../api/menu.json');
      console.log(window.location)
    },

    template: `
    <div class="menu">
      <div class="menu_content">
        <div class="block_1 flex-row">
          <a href="./index.html" class="block_1_item flex-col" style="margin: 10px 0;">
            <img class="image_1" referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7b398184f7d7262418e957642707a8fc1465d7daf90cf3aa4a10de694a2610a0" />
          </a>
          <div class="block_1_item flex-col">
            <a href="./reviewsPage.html" class="text_5">Best&nbsp;Picks</a>
          </div>
          <div class="block_1_item flex-col">
            <a href="./bestpicksPage.html" class="text_6">Reviews</a>
          </div>
          <div class="block_1_item flex-col" v-for="item in menu">
            <a :href="item.type == '1' ? './reviewsPage.html?type=' + item.name : './bestpicksPage.html?type=' + item.name" class="text_6">{{item.name}}</a>
          </div>
        </div>
      </div>
    </div>`
  })

  // 移动端菜单
  renderElement(PHONEMENUCLASSNAME, {
    el: PHONEMENUCLASSNAME,
    data: {
    },
    async mounted() {
      this.menu = await getJson('../api/menu.json');
    },
    template: `
    <div class="menu_phone">
    <div class="menu_phone_content">
      <div class="box_1">
        <div class="block_1"></div>
      </div>
      <div class="box_2">
        <div class="menu_item">
          <a href="">Best&nbsp;Picks</a>
        </div>
        <div class="menu_item">
          <a href="">Reviews</a>
        </div>
        <div class="menu_item" v-for="item in menu">
          <a class="text_6">{{item.name}}</a>
        </div>
      </div>
    </div>
    </div>`
  })

  // 顶部推荐
  renderElement(TOP_RECOMMENDATION, {
    el: TOP_RECOMMENDATION,
    data: {
      topRecommendation: []
    },
    async mounted() {
      this.topRecommendation = await getJson('../api/topRecommendation.json');
    },
    template: `<div class="top_recommendation">
        <a href="" class="active_null" v-for="item in topRecommendation">
          <span class="text_13">{{item.name}}</span></a>
      </div>`
  })

  // 底部公共
  renderElement(FOOTERCLASSNAME, {
    el: FOOTERCLASSNAME,
    data: {
    },
    template: `<div class="footer">
                <div class="footer_content">
                  <p class="top_text">Top Ten Reviews is part of Future US Inc, an international media group and leading digital publisher. Visit our corporate site(opens in new tab)</p>
                  <div class="footer_content_hr"></div>
                   <p class="more_text">
                      <a href="./Terms and conditions.html">
                        Terms and conditions
                      </a>
                      <a href="./Privacy policy.html">
                        Privacy policy
                      </a>
                      <a href="./Cookies policy.html">
                        Cookies policy
                      </a>
                      <a href="./Accessibility Statement.html">
                        Accessibility Statement
                      </a>
                      </p>
                      <p class="more_text">
                      <a href="./Archives.html">
                        Archives
                      </a>
                      <a href="./Advertise.html">
                        Advertise
                      </a>
                      <a href="./About us.html">
                        About us
                      </a>
                      <a href="./Contact us.html">
                        Contact us
                      </a>
                   </p>
                   <div class="footer_content_hr"></div>
                   <p class="top_text">@Full 7130 West 42nd street , New York . NY 10036</p>
                </div>
              </div>`
  })
}

// 判断节点是否存在
function itemDoesItExist(value) {
  return Boolean(document.querySelector(value))
}

// 渲染节点
function renderElement(className, value) {
  itemDoesItExist(className) && new Vue(value)
}

// api获取
async function getJson(valuePath) {
  return await (await fetch(valuePath)).json()
}

