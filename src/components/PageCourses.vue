<template>
<div class="d-flex flex-wrap mt-5 ">
    <!-- <p>{{categories}}</p> -->
    <v-card v-for="cat in categories" :key="cat.category" class="mx-auto mb-5" max-width="300">
        <v-img class="white--text align-end" height="200px" 
        :style="{backgroundImage : cat.category === 'TypeScript' ?`url(${typescript})` : `url(${angular})`}">
            <v-card-title class="title-course">{{cat.title}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
            <p>{{cat.author || userName}}</p>
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <div>{{cat.description}}</div>
            
            
        </v-card-text>

        <v-card-actions>
            <v-btn color="orange" text @click="manageCourse(cat.title, cat.category)">
                {{ joined ? 'Продовжити' : 'Приєднатися до курсу'}}>
            </v-btn>
        </v-card-actions>
    </v-card>
    
</div>
</template>

<script>
export default {
    data() {
        return {
            name: this.$route.path.replace('/pageCourses/', ''),
            id: this.$route.params['id'],
            rating: 0,
            typescript: 'https://firebasestorage.googleapis.com/v0/b/stepdemy.appspot.com/o/coursePics%2FTupeScript.jpg?alt=media&token=74d72fb8-38b8-431c-81be-8ec5997e110a',
            angular: 'https://firebasestorage.googleapis.com/v0/b/stepdemy.appspot.com/o/coursePics%2FWeb%201920%20%E2%80%93%201.jpg?alt=media&token=556dd1d7-89bd-4f83-a775-005df8438403'
        }
    },
    methods: {
        async manageCourse(title, category) {
            console.log('category - title',category,title)
            await this.$store.dispatch('addCourse', {
                category,
                title
            })
            
            this.$router.push({
                path: '/courses/' +  category + '/' + title.split(' ').join('')
            })
            
        },
        
    },
    computed: {
        categories() {
            return this.$store.getters.getCat;
        },
        courses() {
            return this.$store.getters.getCourse
        },
        joined() {
            return this.$store.getters.getJoined
        },
        userId() {
            return this.$store.getters.user.id;
        },
        userName() {
            return this.$store.getters.getUserName
        }
    },
    // watch: {
    //     $route(to) {
    //         console.log('parid', to.params['id'])
    //         this.$store.dispatch('setCourse', this.$route.path.replace('/pageCourses/', ''))
    //         this.id = to.params['id']
    //     }

    // }
}
</script>

<style scoped>

.title-course {
    color: black
}
</style>