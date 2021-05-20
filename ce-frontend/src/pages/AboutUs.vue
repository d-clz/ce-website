<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        style="background-image: url('img/about-us-cover.jpg')"
      >
      </parallax>
      <div class="content-center">
        <div class="container text-left">
          <h1 class="title">ABOUT US</h1>
        </div>
      </div>
    </div>
    <div class="section section-about-us" id="home">
      <div class="container">
        <div class="row">
          <div class="col-md-7 ml-auto mr-auto text-left">
            <div class="about-section s-pb48" id="what-is-vivexelt">
              <div class="about-header s-pb24">What is ViVEXELT?</div>
              <div class="about-body">
                ViVEXELT is a project funded by the British Council and
                supported by the National Foreign Language Project in Vietnam
                through the ‘Digital Learning Innovation Fund’ initiative that
                aims to encourage partnerships between the UK and Vietnam which
                generate new research, insight and/or innovations to improve the
                teaching and learning of English. With the impact of Covid-19 on
                learning, British Council and Vietnam’s National Foreign
                Languages Project (NFLP) are keen to ensure that future remote
                and online learning opportunities are more equitable and
                accessible to all, rather than just a few, and that they are
                sustainable over time. ViVEXELT addresses ELT capacity building
                and digital competence enhancement through the creation of
                cross-sectional ELT networks as communities of practice
                supported by a Virtual Exchange course. VE enables sustained,
                technology-enabled, research informed, people-to-people
                education programmes or activities in which constructive
                communication and interaction takes place between individuals or
                groups who are geographically separated and/or from different
                cultural backgrounds, with the support of educators or
                facilitators (Helm 2019). The participants are practising
                English Language teachers and students in teacher education who
                will reflect ‘in’ action, ‘on’ action’ and ‘for action’ through
                a VE course, exploring both the local and the global ELT needs
                and competencies for the 21st century, which has been made more
                urgent by the COVID 19 Pandemic, forcing many teachers to move
                to online delivery.
              </div>
            </div>
            <div class="about-section s-pb48" id="what-is-vivexelt-aims-to">
              <div class="about-header s-pb24">What ViVEXELT aims to?</div>
              <div class="about-body">
                <ul>
                  <li>
                    Develop a novel and sustainable ‘bottom-up’ and inclusive
                    digital model of CPD (Continuous Professional Development)
                    for ELT training/education based on reflective practice
                    through a VE-based online course to support the
                    implementation of the National Foreign Language Project in
                    Vietnam;
                  </li>
                  <li>
                    To create a Vietnam/UK sustainable community of ELT VE
                    practice that will continue after the project ends;
                  </li>
                  <li>
                    To support the Vietnamese and UK ELT professionals (both
                    novice and experienced) to develop the interactional and
                    intercultural competencies required to teach online;
                  </li>
                  <li>
                    To explore and reflect on innovative digital solutions in
                    ELT, including the repurposing of existing tools and
                    platforms already developed by the Ministry of Education and
                    Training (MOET) and/or the British Council (e.g. MOOCs for
                    ELT), to support the further development of intercultural
                    communicative competence and the fostering of
                    student-centred ELT pedagogy;
                  </li>
                  <li>
                    To create accessible and inclusive CPD digital learning
                    objects (e.g. 5 short videos and 10 online ELT lesson
                    plans), and other ELT-VE guides co-designed and produced by
                    the Vietnamese-UK partners in collaboration with
                    participating teachers and students in teacher education.
                  </li>
                </ul>
              </div>
            </div>
            <div class="about-section s-pb48" id="who-is-vivexelt-for">
              <div class="about-header s-pb24">Who is ViVEXELT for?</div>
              <div class="about-body">
                ViVEXELT is for teachers and students involved in English
                Language Teacher Education in the post -18 state sector in the
                UK and Vietnam. We hope that ViVEXELT will support the creation
                of a community of ELT practice through Virtual Exchange, where
                English language teachers can practice interactional and
                intercultural online skills while also learning more about the
                theory and practice of English language learning and teaching.
                Participants will be offered free online courses on ELT theory
                and practice and will practise them online through Virtual
                Exchanges between the UK and Vietnam. On successful completion
                of the VE course, participants will be provided with an official
                certification of completion approved by the British Council and
                the National Foreign Language Project. Selected participants
                will also be offered attendance at a free conference in March
                2022. All participating teachers and students in teacher
                education from Vietnam will be given a small monetary reward for
                their contribution to the project.
              </div>
            </div>
            <div class="about-section s-pb48" id="meet-vivexelt-team">
              <div class="about-header s-pb24">Meet ViVEXELT Team</div>
              <div class="about-body row">
                <div
                  class="about-ava col-lg-4"
                  v-for="(user, index) in profile"
                  :key="index"
                >
                  <img
                    class="d-block s-pb12"
                    :src="user.image"
                    :alt="user.name"
                  />
                  <span class="text-bold text-upper s-pb12">
                    {{ user.name }}
                  </span>
                  <span class="text-center">
                    {{ user.short_description }}
                  </span>
                  <router-link :to="`/profile/${index}`">
                    <n-button type="primary" round simple>Detail</n-button>
                  </router-link>
                </div>
              </div>
            </div>
            <div
              class="about-section s-pb48"
              id="when-will-the-courses-take-place"
            >
              <div class="about-header s-pb24">
                When will the courses take place?
              </div>
              <div class="about-body">
                ViVEXELT is for teachers and students involved in English
                Language Teacher Education in the post -18 state sector in the
                UK and Vietnam. We hope that ViVEXELT will support the creation
                of a community of ELT practice through Virtual Exchange, where
                English language teachers can practice interactional and
                intercultural online skills while also learning more about the
                theory and practice of English language learning and teaching.
                Participants will be offered free online courses on ELT theory
                and practice and will practise them online through Virtual
                Exchanges between the UK and Vietnam. On successful completion
                of the VE course, participants will be provided with an official
                certification of completion approved by the British Council and
                the National Foreign Language Project. Selected participants
                will also be offered attendance at a free conference in March
                2022. All participating teachers and students in teacher
                education from Vietnam will be given a small monetary reward for
                their contribution to the project.
              </div>
            </div>
          </div>
          <div
            class="col-md-3 ml-auto mr-auto text-left fixed-scroll"
            style="height: 500px"
          >
            <scrollactive
              :offset="400"
              :scrollOffset="100"
              :duration="100"
              bezier-easing-value=".5,0,.35,1"
              activeClass="active"
              :scrollOnStart="false"
            >
              <ul class="categories">
                <li>
                  <a href="#what-is-vivexelt" class="scrollactive-item">
                    What is ViVEXELT?
                    <i class="fas fa-caret-left"></i>
                  </a>
                </li>
                <li>
                  <a href="#what-is-vivexelt-aims-to" class="scrollactive-item">
                    What ViVEXELT aims to
                    <i class="fas fa-caret-left"></i>
                  </a>
                </li>
                <li>
                  <a href="#who-is-vivexelt-for" class="scrollactive-item">
                    Who is ViVEXELT for?
                    <i class="fas fa-caret-left"></i>
                  </a>
                </li>
                <li>
                  <a href="#meet-vivexelt-team" class="scrollactive-item">
                    Meet ViVEXELT Team
                    <i class="fas fa-caret-left"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#when-will-the-courses-take-place"
                    class="scrollactive-item"
                  >
                    When will the courses take place?
                    <i class="fas fa-caret-left"></i>
                  </a>
                </li>
              </ul>
            </scrollactive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, FormGroupInput } from "@/components";
import { Profile } from "./constant/const";
export default {
  name: "about-us",
  bodyClass: "landing-page",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      form: {
        firstName: "",
        email: "",
        message: "",
      },
      profile: {},
    };
  },
  mounted() {
    document.addEventListener("scroll", this.handleScroll);
    this.profile = Profile;
    console.log();
  },
  destroyed: function() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function(e) {
      let height = 400;
      let div = document.getElementsByClassName("fixed-scroll")[0];
      if (window.scrollY > height) {
        var top = window.scrollY - height;
        top = top < 0 ? 0 : top;
        var maximum =
          this.getOffset(
            document.getElementById("when-will-the-courses-take-place")
          ).top - 300;
        maximum = maximum < 0 ? 0 : maximum;
        top = top > maximum ? maximum : top;
        div.style.top = `${top}px`;
      } else {
        div.style.top = `0px`;
      }
    },
    getOffset: function(el) {
      var _x = 0;
      var _y = 0;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: _y, left: _x };
    },
  },
};
</script>
<style></style>
