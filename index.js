const fg = require('fast-glob');
const fs = require('fs');
fg(['./api/details/**'], { dot: true }).then(res => {
  console.log(res)
  res.forEach((path) => {
    fs.readFile(path, ((err, res) => {
      const data = JSON.parse(res.toString())
      if (data.one_type == '18') {
        const ads = data.content_list.map(el => el.amazon_adv).flat(10)
        let content = `<style>
  .included {
    transition: 0.2s;
    border-bottom: 0px solid red;
    scroll-behavior: smooth;
    margin-top: 10px;
    display: flex;
    overflow: auto;
    padding-top: 20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: #fff;
  }

  .included .included_item {
    display: inline-block;
    width: 150px;
    margin: 0 10px;
    padding-bottom: 10px;
    position: relative;
    background-color: #F7F7F7;
    text-align: center;
  }

  .included .included_item .arrow {
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    width: 40px;
    line-height: 40px;
    text-align: center;
    color: #111;
    font-weight: 600;
    right: 10px;
    top: -10px;
  }

  .included .included_item .tag {
    transition: 0.2s;
    box-shadow: 1px 1px 1px 1px #e3e3e3;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    width: 40px;
    line-height: 40px;
    text-align: center;
    color: #111;
    font-weight: 600;
    left: -10px;
    top: -10px;
  }

  .included .included_item h2 {
    margin-top: 25px;
  }

  .included .included_item a {
    display: block;
  }

  .included .included_item h2,
  .included .included_item p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-align: center;
  }

  .included .included_item img {
    width: 100%;
  }

  .included .included_item button {
    background-color: #3B78F0;
    padding: 0;
    height: 35px;
    width: 100%;
    margin-top: 11px;
    color: #fff;
  }

</style>
` + `
<div class="included">
  <!-- 一个included_item对应一个广告 -->
  ${ads.map((item, index) => `<div href="#327" class="included_item" style="border-bottom: 4px solid red;">
    <div class="tag" style="${index == 0 ? 'background-color: red; color: rgb(255, 255, 255);' : ''}">
      ${index + 1}
    </div>
    <img src="http://cms.ssnssn.com/product-icon/best-air-purifier-tools/${item.picture.split('/')[2]}" alt="" style="display: block;">
      <h2 class="text_22">${item.title} </h2>
      <!-- 商品型号-->
      <p>${item.specifications}</p>
      <!-- 商品链接 -->
      <a href="${item.link}" target="_blank"><button>CHECK PRICE</button></a>
  </div>`)}
</div>
` + `
<script>
  let included_items = document.querySelectorAll('.included_item')
  let tags = document.querySelectorAll('.included_item .tag')
  for (let i = 0; i < included_items.length; i++) {
    included_items[i].addEventListener('click', () => {
      for (let j = 0; j < included_items.length; j++) {
        tags[j].style = ''
      }
      tags[i].style = 'background-color: red; color: rgb(255, 255, 255);'
    })
  }
</script>
`
        fs.writeFile('./html/' + data.title + '.html', content, () => {

        })
      }
    }))
  })

})

