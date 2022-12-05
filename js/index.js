
const HEADERCLASSNAME = ".header";
const FOOTERCLASSNAME = ".footer";
const MENUCLASSNAME = ".menu";
const PHONEMENUCLASSNAME = ".menu_phone";
const TOP_RECOMMENDATION = ".top_recommendation"
window.onload = function () {
  // 底部公共
  var header = itemDoesItExist(HEADERCLASSNAME) && new Vue({
    el: HEADERCLASSNAME,
    data: {
      showSearch: false
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
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng2ccb0f7fdb181eb9b9532a59c98ba58de94fb84ab26ee19b27f78d6c651c4e8d" />
        <img class="label_2" referrerpolicy="no-referrer"
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng205b93b3eedfb2980a047955c747375fbc6d1b57e1416a737c68bd1921a131f4" />
        <img class="label_3" referrerpolicy="no-referrer"
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng2400955fe1fa1790e54019af0998149bf3ef681dca9533bd1ac4ef8f3688b19b" />
        <img class="label_4" referrerpolicy="no-referrer"
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga78ffff007c9d8e68674501873e57b98a7e8e90d6cbf102928b6106417ee1be9" />
        <img class="label_5" referrerpolicy="no-referrer"
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngbaecf8b84e1fa240a7ad586e7339c0750c1bdd18ffc295c32453fb4d801d979c" />
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
  var menu = itemDoesItExist(MENUCLASSNAME) && new Vue({
    el: MENUCLASSNAME,
    data: {
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
            <a class="text_5">Best&nbsp;Picks</a>
          </div>
          <div class="block_1_item flex-col">
            <a class="text_6">Reviews</a>
          </div>
          <div class="block_1_item flex-col">
            <a class="text_7">Deal</a>
          </div>
          <div class="block_1_item flex-col">
            <a class="text_8">Money</a>
          </div>
          <div class="block_1_item flex-col">
            <a class="text_9">Tech</a>
          </div>
          <div class="block_1_item flex-col">
            <a class="text_10">Health</a>
          </div>
          <div class="block_1_item flex-col">
            <a class="text_11">Home&nbsp;&amp;Garden</a>
          </div>
          <div class="block_1_item flex-col">
            <a class="text_12">Hobbies</a>
          </div>
        </div>
      </div>
    </div>`
  })
  // 移动端菜单
  var phoneMenu = itemDoesItExist(PHONEMENUCLASSNAME) && new Vue({
    el: PHONEMENUCLASSNAME,
    data: {
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
        <div class="menu_item">
          <a href="">Deal</a>
        </div>
        <div class="menu_item">
          <a href="">Money</a>
        </div>
        <div class="menu_item">
          <a href="">Tech</a>
        </div>
        <div class="menu_item">
          <a href="">Health</a>
        </div>
        <div class="menu_item">
          <a href="">Home&nbsp;&amp;Garden</a>
        </div>
        <div class="menu_item">
          <a href="">Hobbies</a>
        </div>
      </div>
    </div>
    </div>`
  })
  // 顶部推荐
  var top_recommendation = itemDoesItExist(TOP_RECOMMENDATION) && new Vue({
    el: TOP_RECOMMENDATION,
    data: {
    },
    template: `<div class="top_recommendation">
        <a href="" class="active">
          <span class="text_13">TRENDING</span></a>
        <a href="">
          <span class="text_14">Gas Lawn Mowers</span></a>
        <a href="">
          <span class="text_15">Patio Heaters</span></a>
        <a href=""><span class="text_16">Hot Tubs</span></a>
        <a href=""><span class="text_17">Cell Phone Providers</span></a>
        <a href=""><span class="text_18">Eyeglasses</span></a>
      </div>`
  })
  // 底部公共
  var footer = itemDoesItExist(FOOTERCLASSNAME) && new Vue({
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
function itemDoesItExist(value) {
  return Boolean(document.querySelector(value))
}
