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
const DETAILS_BESTPICKS = ".detailsBestpicks"
const DETAILS_REVIEWS = ".detailsReviews"
const SEARCH_RESULT = ".search_result"
const REVIEWS_PAGE = ".reviewsPage"
const BESTPICKS_PAGE = ".bestpicksPage"
const CHANNEL_PAGE = ".channelPage"
const AUTHOR_CONTENT = ".author_content"
const INDEX_CONTENT = ".index_content"
window.onload = function () {
  // 顶部公共
  renderElement(HEADERCLASSNAME, {
    el: HEADERCLASSNAME,
    data: {
      showSearch: window.location.pathname.includes('search.html') ? true : false,
      searchResult: [],
      successSearchResult: [],
      searchKeys: ""
    },
    async mounted() {
      this.searchResult = await getJson('../api/search/search.json');
    },
    watch: {
      searchKeys(value, old) {
        if (value)
          this.successSearchResult = this.searchResult.filter(el => el.main_title.includes(value) || el.title.includes(value))
        else
          this.successSearchResult = []
        document.querySelector(SEARCH_RESULT).innerHTML = this.successSearchResult.map(item => `
            <a href="${item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id}" class="article_item">
                <img class="image_2" referrerpolicy="no-referrer"
                  src="${item.first_picture}" />
                <div class="article_item_text-group_1">
                  <div class="text_21">
                    ${item.title}
                  </div>
                  <div class="text_23">
                    By ${item.author_name} published ${Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 * 60 * 24))} days ago
                  </div>
                  <div class="start" style="display: ${item.type == 2 ? '' : 'none'}">
                  ${(() => { let newArray = new Array(Number(Math.ceil(item.score))).fill('★'); return newArray.join('') })()}<spa>☆☆☆☆☆☆</span>
                  </div>
                  <div class="text_22">
                    ${item.main_title}
                  </div>

                </div>
              </a>`).join()
      }
    },
    methods: {
      handleShowMenu() {
        document.querySelector('.menu_phone').style.display = 'block';
      },
      shareLink(path) {
        let goPath = path.replace('xxxxx', window.location.href)
        window.open(goPath)
      }
    },
    template: `<div class="header">
      <div class="phone_menu icon iconfont" @click="handleShowMenu">
       &#xe790;
      </div>
      <a href="./index.html" class="text-wrapper_1" :style="{display: showSearch ? 'none' : 'block'}" v-if="!showSearch">
        <span class="text_1">Evaluation</span>
        <span class="text_2">station</span>
      </a>
      <!-- 双标签解决双端正常显示网站名称-->
      <a href="./index.html" class="text-wrapper_1 text-wrapper_2" v-else>
        <span class="text_1">Evaluation</span>
        <span class="text_2">station</span>
      </a>
      <div class="search_box" v-if="showSearch">
        <input type="text" v-model="searchKeys" class="search_box_input">
      </div>
      <div class="share">
        <img class="label_1" referrerpolicy="no-referrer"
          src="../images/faceBook" @click="shareLink('https://www.facebook.com/sharer/sharer.php?u=xxxxx')"/>
        <img class="label_2" @click="shareLink('https://twitter.com/intent/tweet?url=xxxxx&text=I found a great article on the Evaluation station website.')" referrerpolicy="no-referrer"
          src="../images/Twitter" />
        <img class="label_3" @click="shareLink('https://pinterest.com/pin/create/button/?url=xxxxx&media=&description=I found a great article on the Evaluation station website.')" referrerpolicy="no-referrer"
          src="../images/Q" />
        <img class="label_4" @click="shareLink('https://share.flipboard.com/bookmarklet/popout?v=2&title=I found a great article on the Evaluation station website.&url=xxxxx')" referrerpolicy="no-referrer"
          src="../images/San" />
        <img class="label_5" @click="shareLink('mailto:info@example.com?&subject=&cc=&bcc=&body=xxxxx%0A')" referrerpolicy="no-referrer"
          src="../images/Email" />
        <div class="search_box_icon" v-if="!showSearch">
          <a href="./search.html" class="icon iconfont" style="line-height: 30px;margin: 0 10px;font-size: 23px">
          &#xe600;
          </a>
          <a href="./search.html"  style="color:#ccc">Search</a>

        </div>
        <div class="search_box_pc" v-if="showSearch">
          <div class="icon iconfont" style="line-height: 30px;margin: 0 10px;">
          &#xe600;
          </div>
          <input type="text" v-model="searchKeys" class="search_box_input">
        </div>
      </div>
      <a href="./search.html" class="phone_search icon iconfont">
        &#xe600;
      </a>
    </div>`
  })

  // 菜单
  renderElement(MENUCLASSNAME, {
    el: MENUCLASSNAME,
    data: {
      menu: []
    },
    async mounted() {
      this.menu = await getJson('../api/channel/menu.json');
      console.log(window.location)
    },

    template: `
    <div class="menu">
      <div class="menu_content">
        <div class="block_1 flex-row">
          <a href="/" class="block_1_item flex-col" style="margin: 14px 0;">
            <div class="icon iconfont" style="color:#fff; font-size: 23px" >
              &#xe750;
            </div>
          </a>
          <div class="block_1_item flex-col" v-for="item in menu">
            <a :href="item.id == '18' ? './bestpicksPage.html?id=' + item.type + '-' + item.id + '-' + 1 :
            item.id == '19' ? './reviewsPage.html?id=' + item.type + '-' + item.id + '-' + 1 : './channelPage.html?id=' + item.type + '-' + item.id + '-' + 1" class="text_6">{{item.name}}</a>
          </div>
        </div>
      </div>
    </div>`
  })

  // 移动端菜单
  renderElement(PHONEMENUCLASSNAME, {
    el: PHONEMENUCLASSNAME,
    data: {
      menu: null
    },
    async mounted() {
      this.menu = await getJson('../api/channel/menu.json');
    },
    methods: {
      handleEmpy(e) {
        if (e.target.className === 'menu_phone_content') {
          document.querySelector('.menu_phone').style.display = 'none';
        }
      }
    },
    template: `
    <div class="menu_phone">
    <div class="menu_phone_content" @click="handleEmpy">
      <div class="box_1">
        <a href="/">
        <div class="block_1 icon iconfont" style="font-size: 23px">
              &#xe750;
        </div>
        </a>
      </div>
      <div class="box_2">
        <div class="menu_item" v-for="item in menu">
            <a :href="item.id == '18' ? './bestpicksPage.html?id=' + item.type + '-' + item.id + '-' + 1 :
            item.id == '19' ? './reviewsPage.html?id=' + item.type + '-' + item.id + '-' + 1 : './channelPage.html?id=' + item.type + '-' + item.id + '-' + 1" class="text_6">{{item.name}}</a>
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
      this.topRecommendation = await getJson('../api/channel/topping.json');
    },
    template: `<div class="top_recommendation">
        <a :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id" class="active_null" v-for="item in topRecommendation">
          <span class="text_13">{{item.topping_title}}</span></a>
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

  // Bestpicks 详情
  renderElement(DETAILS_BESTPICKS, {
    el: DETAILS_BESTPICKS,
    data: {
      details_info: {},
      active: 0
    },
    async mounted() {
      // 获取查询参数
      let id = window.location.search.split('=')[1].split('&')[0];
      this.details_info = await getJson('../api/details/details-' + id + '.json');

      window.onscroll = (e) => {
        // 导航跟随
        try {
          let elements = this.details_info.content_list.map(el => el.amazon_adv).flat(1).map(el => ({ top: document.getElementById(el.id).offsetTop, ...el })).filter(Boolean)
          for (let i = 0; i < elements.length; i++) {
            if (window.pageYOffset >= elements[i].top - 100) {
              this.active = i;
            }
          }
          let arr = [...document.querySelectorAll('.app .content .details .details_body .left .included .included_item img')]
          if (window.pageYOffset > 400) {
            arr.map(el => el.style.display = "none")
          } else {
            arr.map(el => el.style.display = "block")
          }
        } catch (error) {

        }
      }
    },
    methods: {
      shareLink(path) {
        let goPath = path.replace('xxxxx', window.location.href)
        window.open(goPath)
      }
    },
    template: `<div class="details detailsBestpicks">
        <div class="details_body">
          <div class="left">
            <div class="crumbs">
              <a href="./index.html">Home</a> > <a href="./bestpicksPage.html?id=1-18-1">Best.picks</a>
            </div>
            <h2 class="text_20">
            {{details_info.title}}
            </h2>
            <p class="text_23">
             <span class="text_23">By {{details_info.author_name}} published {{Math.floor((+new Date() - +new Date(details_info.release_time)) / 1000 / (60 * 60 * 24)) }} days ago</span>
            </p>
            <p class="text_25">
            {{details_info.description}}
            </p>
            <div class="share">
              <img class="label_1" referrerpolicy="no-referrer" src="../images/faceBook" @click="shareLink('https://www.facebook.com/sharer/sharer.php?u=xxxxx')"/>
              <img class="label_2" @click="shareLink('https://twitter.com/intent/tweet?url=xxxxx&text=I found a great article on the Evaluation station website.')" referrerpolicy="no-referrer"
                src="../images/Twitter" />
              <img class="label_3" @click="shareLink('https://pinterest.com/pin/create/button/?url=xxxxx&media=&description=I found a great article on the Evaluation station website.')" referrerpolicy="no-referrer"
                src="../images/Q" />
              <img class="label_4" @click="shareLink('https://share.flipboard.com/bookmarklet/popout?v=2&title=I found a great article on the Evaluation station website.&url=xxxxx')" referrerpolicy="no-referrer"
                src="../images/San" />
              <img class="label_5" @click="shareLink('mailto:info@example.com?&subject=&cc=&bcc=&body=xxxxx%0A')" referrerpolicy="no-referrer"
                src="../images/Email" />
            </div>
            <p class="text_22">
              included in this guide:
            </p>
            <div class="included">
              <template v-for="item, index in details_info.content_list.map(el => el.amazon_adv).flat(1)">
               <a :style="{borderBottom: index == active ? '4px solid red': '' }" :href="'#' + item.id" class="included_item">
                <!--序号1显示红色-->
                <div class="tag" :style="{backgroundColor: index  == active ? 'red' : '', color: index  == active ? '#fff' : ''}">
                <!--内外下标相加得到序号-->
                  {{index + 1}}
                </div>
                 <div class="arrow icon iconfont">
                <!--内外下标相加得到序号-->
                  &#xe61f;
                </div>
                <img
                  :src="item.picture"
                  alt="">
                <h2 class="text_22">{{item.title}}</h2>
                <p>{{item.specifications}}</p>
                <a :href="item.link"><button>CHECK PRICE</button></a>
              </a>
             </template>
            </div>
            <div class="content_line"></div>
            <h2 class="text_21">
              Latest Reviews
            </h2>
            <img width="100%" class="details_img"
              :src="details_info.first_picture"
              alt="">
           <template v-for="item in details_info.content_list">

            <div style="margin-top: 20px;"  :id="item.amazon_adv[0] ? item.amazon_adv[0].id : ''">
              <div class="details_subtitle" v-if="item.subtitle">
                <div>{{item.subtitle}}</div>
              </div>
              <div v-html="item.content"></div>
              <!--<div class="amazon_adv">
                <div class="amazon_adv_item" v-for="amazon_adv in item.amazon_adv">
                  <img src="amazon_adv.picture">
                  {{amazon_adv.title}}
                  <p class="amazon_adv_price">{{amazon_adv.actual_price}}</p>
                  <a :href="amazon_adv.link">VIEW</a>
                </div>
              </div>-->
            </div>
           </template>
            <div class="author_info">
              <div class="author_top">
                <div class="author_img">
                  <img
                    :src="details_info.author_head_portrait"
                    alt="">
                </div>
                <div class="author_title">
                  <a :href="'author.html?id=' + details_info.author_id + '-1'" class="text_26">
                    {{details_info.author_name ||'--'}}
                  </a>
                </div>
              </div>
              <div class="author_des">
                <span class="text_22">
                 {{details_info.author_introduction}}
                </span>
              </div>
              <div class="content_line"></div>
              <div class="recommended_by_the_author">
                <div class="recommended_by_left">
                  <div class="author_nav">MORE ABOUT ELECTRONICS</div>
                  <div class="author_article_list">
                    <a :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id" class="author_article_list_item" v-for="item in details_info.category_recommend_list">
                      <img style="display: block;"
                        :src="item.first_picture"
                        alt="">
                      <a class="text_21">{{item.title}}►</a>
                    </a>
                  </div>
                </div>
                <div class="recommended_by_right">
                  <div class="author_nav">
                    <span>LATEST</span>
                    <span>MORE►</span>
                  </div>
                  <div class="author_article_list">
                    <a :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id" class="author_article_list_item" v-for="item in details_info.newest_recommend">
                      <img
                        :src="item.first_picture"
                        alt="">
                      <a class="text_21">{{item.title}}►</a>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="post">
              <div class="top">
                <img src="./images/Email" alt="" height="42">
                <div class="right_flex">
                  <p class="text_21">SIGN UP FOR EMAIL NEWSLETTERS</p>
                </div>

              </div>
              <p>
                Get the best reviews, product advice, newsand more!
              </p>
              <input type="text" class="input">
              <div>
                <input type="checkbox" name="Contact me with news and offers from otherFuture brands">
                <label for="Contact me with news and offers from otherFuture brands">Contact me with news and offers
                  from
                  otherFuture brands</label>
              </div>
              <div>
                <input type="checkbox" name="Receive email from us on behalf of ourtrusted
                            partners or
                            sponsors">
                <label for="Receive email from us on behalf of ourtrusted
                            partners or
                            sponsors">Receive email from us on behalf of ourtrusted
                  partners or
                  sponsors</label>
              </div>
              <div>
                <button>SIGE ME UP</button>
              </div>
              <p>By submitting your information you agree to theTerms Conditions and Privacy Policy and areaged 16 or
                over</p>
            </div>
          </div>
        </div>
      </div>`
  })

  // Reviews 详情
  renderElement(DETAILS_REVIEWS, {
    el: DETAILS_REVIEWS,
    data: {
      details_info: {},
    },
    async mounted() {
      // 获取查询参数
      let id = window.location.search.split('=')[1].split('&')[0];
      this.details_info = await getJson('../api/details/details-' + id + '.json');
    },
    methods: {
      shareLink(path) {
        let goPath = path.replace('xxxxx', window.location.href)
        window.open(goPath)
      },
    },
    template: `<div class="details detailsReviews">
  <div class="crumbs">
    <a href="./index.html">Home</a> > <a href="./reviewsPage.html?id=1-19-1">Reviews</a>
  </div>
  <h2 class="text_20">
    {{details_info.title}}
  </h2>
  <p class="text_23">
    <span class="start" style="display: inline_block"><span v-for="el in details_info.score">★</span><span
        v-for="el in 5">☆</span></span><span class="text_23"> By {{details_info.author_name}} published
      {{Math.floor((+new Date() - +new Date(details_info.release_time)) / 1000 / (60 * 60 * 24)) }} days ago</span>
  </p>
  <p class="text_25">
    {{details_info.description}}
  </p>
  <div class="share">
    <img class="label_1" referrerpolicy="no-referrer" src="../images/faceBook" @click="shareLink('https://www.facebook.com/sharer/sharer.php?u=xxxxx')"/>
    <img class="label_2" @click="shareLink('https://twitter.com/intent/tweet?url=xxxxx&text=I found a great article on the Evaluation station website.')" referrerpolicy="no-referrer"
      src="../images/Twitter" />
    <img class="label_3" @click="shareLink('https://pinterest.com/pin/create/button/?url=xxxxx&media=&description=I found a great article on the Evaluation station website.')" referrerpolicy="no-referrer"
      src="../images/Q" />
    <img class="label_4" @click="shareLink('https://share.flipboard.com/bookmarklet/popout?v=2&title=I found a great article on the Evaluation station website.&url=xxxxx')" referrerpolicy="no-referrer"
      src="../images/San" />
    <img class="label_5" @click="shareLink('mailto:info@example.com?&subject=&cc=&bcc=&body=xxxxx%0A')" referrerpolicy="no-referrer"
      src="../images/Email" />
  </div>
  <img width="100%" class="details_img" :src="details_info.first_picture" alt="">
  <div class="details_body">
    <div class="left">
      <template v-for="item in details_info.content_list">
        <div class="details_subtitle" v-if="item.subtitle">
          <div>{{item.subtitle}}</div>
        </div>
        <div>
          <div v-html="item.content"></div>
          <h2 class="text_21 amazon_adv_item_des" v-if="item.amazon_adv.length">Round up of today's best deals</h2>
          <div class="amazon_adv amazon_adv_reviews">
            <div class="amazon_adv_item" v-for="amazon_adv in item.amazon_adv">
              <img src="amazon_adv.picture">
              <p class="amazon_adv_title">{{amazon_adv.title}}</p>
              <p class="amazon_adv_price">{{amazon_adv.actual_price}}</p>
              <a :href="amazon_adv.link">VIEW</a>
            </div>
          </div>
        </div>
      </template>
      <div class="author_info">
        <div class="author_top">
          <div class="author_img">
            <img :src="details_info.author_head_portrait" alt="">
          </div>
          <div class="author_title">
            <a :href="'author.html?id=' + details_info.author_id + '-1'" class="text_26">
              {{details_info.author_name ||'--'}}
            </a>
          </div>
        </div>
        <div class="author_des">
          <span class="text_22">
            {{details_info.author_introduction}}
          </span>
        </div>
        <div class="content_line"></div>
        <div class="recommended_by_the_author">
          <div class="recommended_by_left">
            <div class="author_nav">MORE ABOUT ELECTRONICS</div>
            <div class="author_article_list">
              <a :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id"
                class="author_article_list_item" v-for="item in details_info.category_recommend_list">
                <img :src="item.first_picture" alt="">
                <a class="text_21">{{item.title}}►</a>
              </a>
            </div>
          </div>
          <div class="recommended_by_right">
            <div class="author_nav">
              <span>LATEST</span>
              <span>MORE►</span>
            </div>
            <div class="author_article_list">
              <a :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id"
                class="author_article_list_item" v-for="item in details_info.newest_recommend">
                <img :src="item.first_picture" alt="" style="display: block;">
                <a class="text_21">{{item.title}}►</a>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="post">
        <div class="top">
          <img src="./images/Email" alt="" height="42">
          <div class="right_flex">
            <p class="text_21">SIGN UP FOR EMAIL NEWSLETTERS</p>
          </div>

        </div>
        <p>
          Get the best reviews, product advice, newsand more!
        </p>
        <input type="text" class="input">
        <div>
          <input type="checkbox" name="Contact me with news and offers from otherFuture brands">
          <label for="Contact me with news and offers from otherFuture brands">Contact me with news and offers
            from
            otherFuture brands</label>
        </div>
        <div>
          <input type="checkbox" name="Receive email from us on behalf of ourtrusted
                            partners or
                            sponsors">
          <label for="Receive email from us on behalf of ourtrusted
                            partners or
                            sponsors">Receive email from us on behalf of ourtrusted
            partners or
            sponsors</label>
        </div>
        <div>
          <button>SIGE ME UP</button>
        </div>
        <p>By submitting your information you agree to theTerms Conditions and Privacy Policy and areaged 16 or
          over</p>
      </div>
    </div>
  </div>
</div>
`
  })

  // reviewsPage
  renderElement(REVIEWS_PAGE, {
    el: REVIEWS_PAGE,
    data: {
      channelResult: [],
      total: 0,
      id: 1,
      page: 0
    },
    async mounted() {
      // 获取查询参数
      this.getData()
    },
    methods: {
      async getData() {
        let id = window.location.search.split('=')[1].split('&')[0];
        // 获取查询参数
        let { res, total } = await getJson('../api/channel/channel-' + id + '.json');
        this.channelResult = res;
        this.total = Math.ceil(total / 10);
        this.id = id.slice(0, -1)
        this.page = id.slice(-1) == this.total ? 1 : +id.slice(-1) + 1
      },
      handleNextPage() {
        window.location.href = "./reviewsPage.html?id=" + this.id + this.page
      }
    },
    template: ` <div class="typePage reviewsPage">
        <div class="left">
          <div class="typePage_top_content">
            <a :href="'./detailsReviews.html?id=' + channelResult[0].id" class="left">
              <img class="image_2" referrerpolicy="no-referrer"
                :src="channelResult[0].first_picture" />
              <div class="text-group_1 flex-col">
                <h2 class=" text_21">
                  {{channelResult[0].title}}
                </h2>
                <p class="text_22">
                  {{channelResult[0].main_title}}
                </p>
              </div>
            </a>
            <div class="right">
              <a :href="'./detailsReviews.html?id=' + item.id" class="right_item" v-for="item in channelResult.slice(1, 4)">
                <img class="image_2" referrerpolicy="no-referrer"
                  :src="item.first_picture" />
                <div class="right_item_text-group_1 flex-col">
                  <h2 class=" text_24">
                    {{item.title}}
                  </h2>
                  <p class="text_23">
                     Updated {{item.time_en}}
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="content_line"></div>
          <div class="article_block">
            <div class="article_title">
              <span class="text_22">
                Latest -Reviews
              </span>
              <span class="bottom_border"></span>
            </div>
            <div class="article_list">
              <a :href="'./detailsReviews.html?id=' + item.id" class="article_item" v-for="item in channelResult.slice(4)">
                <img class="image_2" referrerpolicy="no-referrer"
                  :src="item.first_picture" />
                <div class="article_item_text-group_1">
                  <div class="text_21">
                    {{item.title}}
                  </div>
                  <div class="text_23">
                     By {{item.author_name}} published {{Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 * 60 * 24)) }} days ago
                  </div>
                  <div class="start">
                   <span v-for="el in item.score">★</span><span v-for="el in 5">☆</span>
                  </div>
                  <div class="text_22">
                    {{item.main_title}}
                  </div>
                </div>
              </a>
            </div>
            <div class="article_limit_page">
              <span v-for="item in total">
                <a :class="{active: item == page-1}" :href="'./reviewsPage.html?id=' + id + item">{{item}}</a>
              </span>
              <span @click="handleNextPage">Next Page</span>
            </div>
          </div>
        </div>
        <div class="right">

        </div>
      </div>`
  })

  // bestpicksPage
  renderElement(BESTPICKS_PAGE, {
    el: BESTPICKS_PAGE,
    data: {
      channelResult: [],
      total: 0,
      id: 1,
      page: 0

    },
    methods: {
      async getData() {
        let id = window.location.search.split('=')[1].split('&')[0];
        // 获取查询参数
        let { res, total } = await getJson('../api/channel/channel-' + id + '.json');
        this.channelResult = res;
        this.total = Math.ceil(total / 10);
        this.id = id.slice(0, -1)
        this.page = id.slice(-1) == this.total ? 1 : +id.slice(-1) + 1
      },
      handleNextPage() {
        window.location.href = "./bestpicksPage.html?id=" + this.id + this.page
      }
    },
    async mounted() {
      this.getData();
    },
    template: `<div class="typePage bestpicksPage">
        <div class="left">
          <div class="typePage_top_content">
            <a :href="'./detailsBestpicks.html?id=' + channelResult[0].id" class="left">
              <img class="image_2" referrerpolicy="no-referrer"
                :src="channelResult[0].first_picture" />
              <div class="text-group_1 flex-col ">
                <h2 class="text_21">
                  {{channelResult[0].title}}
                </h2>
                <p class="text_22">
                  {{channelResult[0].main_title}}
                </p>
              </div>
            </a>
            <div class="right">
              <a :href="'./detailsBestpicks.html?id=' + item.id" class="right_item" v-for="item in channelResult.slice(1, 4)">
                <img class="image_2" referrerpolicy="no-referrer"
                  :src="item.first_picture" />
                <div class="right_item_text-group_1 flex-col ">
                  <h2 class="text_24">
                   {{item.title}}
                  </h2>
                  <p class="text_23">
                     Updated {{item.time_en}}
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="content_line"></div>
          <div class="article_block">
            <div class="article_title">
              <span class="text_22">
                Latest Best-Picks
              </span>
              <span class="bottom_border"></span>
            </div>
            <div class="article_list">
             <a :href="'./detailsBestpicks.html?id=' + item.id" class="article_item" v-for="item in channelResult.slice(4)">
                <img class="image_2" referrerpolicy="no-referrer"
                  :src="item.first_picture" />
                <div class="article_item_text-group_1">
                  <div class="text_21">
                    {{item.title}}
                  </div>
                  <div class="text_23">
                     By {{item.author_name}} published {{Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 * 60 * 24)) }} days ago
                  </div>
                  <div class="text_22">
                    {{item.main_title}}
                  </div>

                </div>
              </a>
            </div>
            <div class="article_limit_page">
              <span v-for="item in total">
                <a :class="{active: item == page-1}" :href="'./bestpicksPage.html?id=' + id + item">{{item}}</a>
              </span>
              <span @click="handleNextPage">Next Page</span>
            </div>
          </div>
        </div>
        <div class="right">
        </div>
      </div>`
  })

  // channelPage
  renderElement(CHANNEL_PAGE, {
    el: CHANNEL_PAGE,
    data: {
      channelResult: [],
      total: 0,
      id: 1,
      page: 0,
      menu: []
    },
    methods: {
      async getData() {
        let id = window.location.search.split('=')[1];
        // 获取查询参数
        let { res, total } = await getJson('../api/channel/channel-' + id + '.json');
        this.menu = await getJson('../api/channel/menu.json');
        this.channelResult = res;
        this.total = Math.ceil(total / 10);
        this.id = id.slice(0, -1)
        this.page = id.slice(-1) == this.total ? 1 : +id.slice(-1) + 1
      },
      handleNextPage() {
        window.location.href = "./reviewsPage.html?id=" + this.id + this.page
      }
    },
    async mounted() {
      // 获取查询参数
      this.getData()
    },
    template: `<div class="typePage channelPage">
  <div class="left">
    <h2 style="margin-top: 20px; font-size: 28px;">{{menu.find(el => el.id == id.split('-')[1]).name}}</h2>
    <div class="typePage_top_content">
      <a :href="channelResult[0].type == 1 ? './detailsBestpicks.html?id=' + channelResult[0].id : './detailsReviews.html?id=' + channelResult[0].id"
        class="left">
        <img class="image_2" referrerpolicy="no-referrer" :src="channelResult[0].first_picture" />
        <div class="text-group_1 flex-col ">
          <h2 class="text_21">
            {{channelResult[0].title}}
          </h2>
          <p class="text_22">
            {{channelResult[0].main_title}}
          </p>
        </div>
      </a>
      <div class="right">
        <a :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id"
          class="right_item" v-for="item in channelResult.slice(1, 4)">
          <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
          <div class="right_item_text-group_1 flex-col ">
            <h2 class="text_24">
              {{item.title}}
            </h2>
            <p class="text_23">
               Updated {{item.time_en}}
            </p>
          </div>
        </a>
      </div>
    </div>
    <div class="content_line"></div>
    <div class="article_block">
      <div class="article_title">
        <span class="text_22">
          Latest Articles
        </span>
        <span class="bottom_border"></span>
      </div>
      <div class="article_list">
        <a :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id"
          class="article_item" v-for="item in channelResult.slice(4)">
          <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
          <div class="article_item_text-group_1">
            <div class="text_21">
              {{item.title}}
            </div>
            <div class="text_23">
               By {{item.author_name}} published {{Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 * 60 * 24)) }} days ago
            </div>
            <div class="start" v-if="item.type == 1">
              <span v-for="el in item.score">★</span><span v-for="el in 5">☆</span>
            </div>
            <div class="text_22">
              {{item.main_title}}
            </div>
          </div>
        </a>
      </div>
     <div class="article_limit_page">
      <span v-for="item in total">
        <a :class="{active: item == page-1}" :href="'./channelPage.html?id=' + id + item">{{item}}</a>
      </span>
      <span @click="handleNextPage">Next Page</span>
    </div>
    </div>
  </div>
  <div class="right">

  </div>
</div>
`
  })

  // author_content
  renderElement(AUTHOR_CONTENT, {
    el: AUTHOR_CONTENT,
    data: {
      authorResult: [],
      total: 0,
      id: 1,
      page: 0
    },
    methods: {
    },
    async mounted() {
      // 获取查询参数
      this.getData()
    },
    methods: {
      async getData() {
        let id = window.location.search.split('=')[1].split('&')[0];
        let data = await getJson('../api/author/author-' + id + '.json')
        this.authorResult = data;
        this.total = Math.ceil(data.total / 10);
        this.id = id.slice(0, -1)
        this.page = id.slice(-1) == this.total ? 1 : +id.slice(-1) + 1
      },
      handleNextPage() {
        window.location.href = "./author.html?id=" + this.id + this.page
      }
    },
    template: `<div class="author author_content">
        <div class="left">
          <div class="author_info">
            <div class="author_top">
              <div class="author_img">
                <img
                  :src="authorResult.author_head_portrait"
                  alt="">
              </div>
              <div class="author_title">
                <span class="text_20">
                  {{authorResult.author_name}}
                </span>
              </div>
            </div>
            <div class="author_des">
              <span class="text_22">
                {{authorResult.author_introduction}}
              </span>
            </div>
          </div>
          <div class="content_line"></div>
          <div class="article_block">
            <div class="article_title">
              <span class="text_22">
                ARTICLES BY: {{authorResult.author_name}}
              </span>
              <span class="bottom_border"></span>
            </div>
            <div class="article_list">

              <a :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id" class="article_item" v-for="item in authorResult.article_list">
                <img class="image_2" referrerpolicy="no-referrer"
                  :src="item.first_picture" />
                <div class="article_item_text-group_1">
                  <div class="text_21">
                     {{item.title}}
                  </div>
                  <div class="text_23">
                    {{authorResult.author_name}} published {{item.release_time}}
                  </div>
                  <div class="start" v-if="item.type == 2">
                    <span v-for="el in item.score">★</span><span v-for="el in 5">☆</span>
                  </div>
                  <div class="text_22">
                    {{item.main_title}}
                  </div>

                </div>
              </a>
            </div>
            <div class="article_limit_page">
              <span v-for="item in total">
                <a :class="{active: item == page-1}" :href="'./author.html?id=' + id + item">{{item}}</a>
              </span>
              <span @click="handleNextPage">Next Page</span>
            </div>
          </div>
        </div>
        <div class="right">

        </div>
      </div>
`
  })

  // index_content
  renderElement(INDEX_CONTENT, {
    el: INDEX_CONTENT,
    data: {
      indexResult: []

    },
    methods: {
    },
    async mounted() {
      // 获取查询参数
      this.getData()
    },
    methods: {
      async getData() {
        this.indexResult = await getJson('../api/channel/index.json')
      },
    },
    template: `<div class="index_content">
  <div class="top_content">
    <div class="read_more index_title">
      <span>Latest</span>
      <span class="bottom_border"></span>
    </div>
    <a class="right" :href="indexResult.newest_list[0].type == 1 ? './detailsBestpicks.html?id=' + indexResult.newest_list[0].id : './detailsReviews.html?id=' + indexResult.newest_list[0].id">
      <img class="image_2" referrerpolicy="no-referrer" :src="indexResult.newest_list[0].first_picture" />
      <div class="text-group_1 flex-col ">
        <h2 class="text_21">
          {{indexResult.newest_list[0].title}}
        </h2>
        <p class="text_22">
          {{indexResult.newest_list[0].main_title}}
        </p>
        <p class="text_23">By {{indexResult.newest_list[0].author_name}}
        </p>
      </div>
    </a>
    <div class="left">
      <template v-for="item, index in indexResult.newest_list.slice(1, 3)">
        <a class="left_item" :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id">
          <div class="left_item_text-group_1 flex-col ">
            <h2 class="text_21">
              {{item.title}}
            </h2>
            <p class="text_22">
              {{item.main_title}}
            </p>
            <p class="text_23">By {{item.author_name}}
            </p>
          </div>
          <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
        </a>
        <div v-if="!index" class="left_item_hr"></div>
      </template>
    </div>
  </div>
  <div class="bottom">
    <a class="bottom_item" v-for="item in indexResult.newest_list.slice(3, 7)" :href="item.type == 1 ? './detailsBestpicks.html?id=' + item.id : './detailsReviews.html?id=' + item.id">
      <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
      <div class="bottom_item_text-group_1 flex-col ">
        <h2 class="text_21">
          {{item.title}}
        </h2>
        <p class="text_23">
          Updated {{item.time_en}}
        </p>
      </div>
    </a>
  </div>
  <div class="content_line">

  </div>
  <div class="read_more">
    <span>Lates best_picks</span>
    <span class="bottom_border"></span>
    <a href="./bestpicksPage.html?id=1-18-1"><span>VIEW MORE▶</span></a>
  </div>
  <div class="top_content best_picks">
    <a class="right" :href="'detailsBestpicks.html?id=' + indexResult.newest_best_picks_list[0].id">
      <img class="image_2" referrerpolicy="no-referrer" :src="indexResult.newest_best_picks_list[0].first_picture" />
      <div class="text-group_1 flex-col ">
        <h2 class="text_21">
          {{indexResult.newest_best_picks_list[0].title}}
        </h2>
        <p class="text_22">
          {{indexResult.newest_best_picks_list[0].main_title}}
        </p>
        <p class="text_23">
         By {{indexResult.newest_best_picks_list[0].author_name}} published {{Math.floor((+new Date() - +new Date(indexResult.newest_best_picks_list[0].release_time)) / 1000 / (60 * 60 * 24)) }} days ago
        </p>
      </div>
    </a>
    <div class="left">
      <template v-for="item, index in indexResult.newest_best_picks_list.slice(1, 4)">
        <a class="left_item" :href="'detailsBestpicks.html?id=' + item.id">
          <div class="left_item_text-group_1 flex-col ">
            <h2 class="text_21">
              {{item.title}}
            </h2>
            <p class="text_22">
              {{item.main_title}}
            </p>
            <p class="text_23">By {{item.author_name}} published {{Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 * 60 * 24)) }} days ago
            </p>
          </div>
          <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
        </a>
        <div v-if="index != 2" style="margin: 10px 0"></div>
      </template>
    </div>
  </div>
  <div class="bottom best_picks_bottom">
    <a class="bottom_item" v-for="item in indexResult.newest_best_picks_list.slice(1, 4)" :href="'detailsBestpicks.html?id=' + item.id">
      <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
      <div class="bottom_item_text-group_1 flex-col ">
        <h2 class="text_21">
          {{item.title}}
        </h2>
        <p  class="text_22">
        {{item.main_title}}
        </p>
        <p class="text_23">
           By {{item.author_name}} published {{Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 * 60 * 24)) }} days ago
        </p>
      </div>
    </a>
  </div>
  <div class="content_line">
  </div>
  <div class="read_more">
    <span>Lates Reviews</span>
    <span class="bottom_border"></span>
    <a href="./reviewsPage.html?id=1-19-1"><span>VIEW MORE▶</span></a>
  </div>
  <div class="bottom reviews_bottom">
    <a class="bottom_item" v-for="item in indexResult.newest_reviews_list.slice(0, 4)" :href="'detailsReviews.html?id=' + item.id">
      <img class="image_2" referrerpolicy="no-referrer" :src="item.first_picture" />
      <div class="bottom_item_text-group_1 flex-col ">
        <h2 class="text_21">
          {{item.title}}
        </h2>
        <p class="start">
          <span v-for="el in item.score">★</span><span v-for="el in 5">☆</span>
        </p>
        <p class="text_22">
          {{item.main_title}}
        </p>
        <p class="text_23">
          By {{item.author_name}} published {{Math.floor((+new Date() - +new Date(item.release_time)) / 1000 / (60 * 60 * 24)) }} days ago
        </p>
      </div>
    </a>
  </div>
  <div class="content_line">

  </div>
</div>
`
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


