<template>
  <div class="grid">
    <div 
      class="card" 
      v-for="(recipe, index) in recipes" 
      :key="recipe._id"
    >
      <div 
        class="card__content"
        :style="{ 'background-image': getImageURL(recipe)}"
      >
        <div class="card__overlay" @click="showRecipe(index)">
          {{ recipe.title }}
        </div>
      </div>
      <LightBox 
            ref=lightbox
            :images="getImages(recipe)"
            :showLightBox=false
            :showCaption=true
          ></LightBox>
    </div>
    <router-link to="/create">
      <div class="card_plus">
        <i class="fas fa-plus-circle fa-5x"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
import LightBox from 'vue-image-lightbox'
export default {
  name: 'home',
  components: {
    LightBox
  },
  data() {
    return {
      recipes: null
    }
  },
  methods: {
    async getRecipes() {
      const data = await axios.get('http://localhost:3000/api/recipes')
      if (data.data.recipes.length > 0) {
        this.recipes = data.data.recipes
      }
    },
    getImageURL(recipe) {
      return `url(http://localhost:3000/api/recipes/${recipe._id}/images/0)`
    },
    getImages(recipe) {
      let caption

      return recipe.images.map((img, i) => {
        if (i === 0) {
          caption = '<ul class="ingredients-list">'
          for (let ing of recipe.ingredients) {
            caption += '<li>' + ing + '</li>'
          }
          caption += '</ul>'
        } else {
          caption = recipe.content[i-1]
        }

        return {
          thumb: `http://localhost:3000/api/recipes/${recipe._id}/images/${i}`,
          src: `http://localhost:3000/api/recipes/${recipe._id}/images/${i}`,
          caption
        }
      })
    },
    showRecipe(i) {
      this.$refs.lightbox[i].showImage(0)
    }
  },
  created() {
    this.getRecipes()
  }
}
</script>

<style scoped>
  .fas {
    color: #666;
  }
</style>
