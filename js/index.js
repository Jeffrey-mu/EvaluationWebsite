
const HEADERCLASSNAME = ".header";
const FOOTERCLASSNAME = ".footer";
const MENUCLASSNAME = ".menu";
const PHONEMENUCLASSNAME = ".menu_phone";
window.onload = function () {
  // 底部公共
  var header = itemDoesItExist(HEADERCLASSNAME) && new Vue({
    el: HEADERCLASSNAME,
    data: {
      message: 'Hello Vue!'
    },
    template: `<div class="header">
      <div class="phone_menu icon iconfont">
        &#xe624;
      </div>
      <div class="text-wrapper_1">
        <span class="text_1">Evaluation</span>
        <span class="text_2">station</span>
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
        <div class="search">
          <input type="text">
        </div>
      </div>
      <div class="phone_search icon iconfont">
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
          <div class="block_1_item flex-col" style="margin: 10px 0;">
            <img class="image_1" referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7b398184f7d7262418e957642707a8fc1465d7daf90cf3aa4a10de694a2610a0" />
          </div>
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
                      <a>
                        Terms and conditions
                      </a>
                      <a>
                        Privacy policy
                      </a>
                      <a>
                        Cookies policy
                      </a>
                      <a>
                        Accessibility Statement
                      </a>
                      </p>
                      <p class="more_text">
                      <a>
                        Archives
                      </a>
                      <a>
                        Advertise
                      </a>
                      <a>
                        About us
                      </a>
                      <a>
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
