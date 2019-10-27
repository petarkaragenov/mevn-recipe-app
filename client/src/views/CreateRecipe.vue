<template>
  <div class="create-recipe">
      <form @submit.prevent="createRecipe" enctype="multipart/form-data">
        <div class="row">
            <div class="column-wide mr">
                <div class="form-field">
                    <label for="title">Title: </label>
                    <input type="text" id="title" class="form-input" autofocus autocomplete="off">
                </div>
            </div>
            <div class="column-slim ml">
                <div class="form-field">
                    <label for="cover">Cover Image: </label>
                    <input type="file" id="cover" class="form-input">
                </div>
            </div>
        </div>
        <div class="row" v-for="index in indexes" :key="index">
            <div class="column-wide mr">
                <div class="form-field">
                    <label :for="index | step">Step: </label>
                    <textarea :id="index | step" rows=2 class="form-input"></textarea>
                </div>
            </div>
            <div class="column-slim ml">
                <div class="form-field">
                    <label :for="index | image">Image: </label>
                    <input type="file" :id="index | image" class="form-input">
                </div>
            </div>
        </div>
        <div class="new-field" @click="addField">
            <span>Add new field</span> 
            <i class="fas fa-plus-square btn-plus"></i>
        </div>
      </form>
  </div>
</template>

<script>
export default {
    name: 'create',
    data() {
        return {
            title: null,
            content: [],
            images: [],
            index: 1,
            indexes: [1]
        }
    },
    methods: {
        createRecipe() {

        },
        addField() {
            this.index++
            this.indexes.push(this.index)           
        }
    },
    filters: {
        image(id) {
            return 'image' + id
        },
        step(id) {
            return 'step' + id
        }
    }
}
</script>

<style scoped>
    .new-field {
        display: flex;
        align-items: center;
        cursor: pointer;
        float: right;
    }
    .new-field i {
        margin-left: .4rem;
        color: #666;
    }
    .new-field span {
        color: #f59042;
        transition: all .4s;
    }
    .new-field:hover span {
        color: #f5ad42;
    }
</style>