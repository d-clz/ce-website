<template>
  <div>
    <div class="page-header page-header-medium">
      <parallax
        class="page-header-image"
        style="background-image: url('img/bg6.jpg')"
      >
      </parallax>
      <div class="content-center">
        <div class="container text-left">
          <h1 class="title">ViVEXELT</h1>
          <h2 class="sub-title">
            Vietnam Virtual EXchange for English Language Teaching A British
            Council funded Digital Learning Innovation Pilot With the support of
            the Vietnam’s National Foreign Languages Project (NFLP)
          </h2>
          <n-button
            class="text-bold"
            type="primary"
            round
            style="font-size: 1rem"
            @click="goToTut()"
          >
            Join the VIVEXELT Network
          </n-button>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="row justify-content-center">
          <!-- <div class="col-md-4 home-carousel s-pb24">
            <el-carousel height="500px">
              <el-carousel-item v-for="(img, index) in images" :key="index">
                <img
                  class="d-block"
                  :src="getImgUrl(img.filename)"
                  alt="vivexelt"
                />
                <div class="carousel-caption d-none d-md-block"></div>
              </el-carousel-item>
            </el-carousel>
          </div> -->
          <div class="col-md-8">
            <!-- First image on the right side, above the article -->
            <!-- <h3>
              <img
                style="width: 150px"
                src="img/real-logo.png"
                alt="Third slide"
              />
            </h3> -->
            <div
              class="text-center tweeter timeline-twitter"
            >
              <!-- <div class="tweeter-head">
                {{ item.title }}
                <span class="tag">{{ item.tag }}</span>
                <img
                  style="width: 50px"
                  src="img/tweeter.png"
                  alt="Third slide"
                />
              </div>
              <div class="tweeter-body s-mb24">{{ item.body }}</div>
              <div class="tweeter-react">
                <div class="s-pr40">
                  <i class="fas fa-comment-alt icon20 s-mr12"></i>
                  <span class="icon20">{{ item.comments || "" }}</span>
                </div>
                <div class="s-pr36">
                  <i class="fas fa-retweet icon25 s-mr12"></i>
                  <span class="icon20">{{ item.retweets || "" }}</span>
                </div>
                <div class="s-pr36">
                  <i class="fas fa-heart icon20 s-mr12"></i>
                  <span class="icon20">{{ item.likes || "" }}</span>
                </div>
                <div class="s-pr36">
                  <span class="icon20" style="color: #858585">Twitter</span>
                </div>
              </div> -->
              <a class="twitter-timeline" style="width: 100%;" data-height="550" href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw">Tweets by TwitterDev</a> 
            </div>
            <!-- <n-button class="text-bold w100" type="primary" round
              >Load more
            </n-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, CarouselItem } from 'element-ui';
import axios from 'axios'
export default {
  name: 'landing',
  bodyClass: 'landing-page',
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem
  },
  data() {
    return {
      tweets: [
        {
          title: 'ViVEXELT',
          tag: '@vivexelt',
          body: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                egestas facilisis nullam neque fames. A, auctor id quam id. Ut
                non cursus faucibus vulputate. Lectus auctor egestas vitae felis
                bibendum.`,
          comments: 0,
          retweets: 7,
          likes: 14,
        },
        {
          title: 'ViVEXELT',
          tag: '@vivexelt',
          body: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                egestas facilisis nullam neque fames. A, auctor id quam id. Ut
                non cursus faucibus vulputate. Lectus auctor egestas vitae felis
                bibendum.`,
          comments: 0,
          retweets: 7,
          likes: 14,
        },
      ],
      images: [],

    };
  },
  computed: {
    logoSvg() {
      return require('../assets/images/logo.svg')
    }
  },
  async mounted() {
    
    let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
      document.head.appendChild(recaptchaScript)
    await this.getAllImages()
  },

  methods: {
    goToTut() {
      this.$router.push({ name: 'tutorials' })
    },
    async getAllImages() {
      axios.get(`${process.env.VUE_APP_BASE_API_ENDPOINT}/public/get-all-image-gallery`)
        .then((response) => {
          console.log(response);
          if (response && response.data && response.data.success && response.data.gallerys) {
            this.images = response.data.gallerys
          }
        }, (error) => {
          console.log(error);
        });
    },
    getImgUrl(name) {
      return `${process.env.VUE_APP_BASE_API_ENDPOINT}/public/image/${name}`
    }
  }
};
</script>
<style></style>
