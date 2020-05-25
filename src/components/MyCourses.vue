<template>
<v-col cols="8" class="userData offset-1">
    <p class="txtp">Мої курси</p>
    <div class="courseCont" v-if="userCourses.length">
        <v-card class="course d-flex flex-column" align="center" justify="center"  v-for="x in userCourses "
                :key="x.title">
            <p class="current-lesson">{{x.title}}</p>
            <img width="100" height="100" :src="x.image" />
            
            <v-btn class="continue" @click="editCourse(x.title,x.id)">Редагувати курс</v-btn>
            <v-btn class="continue" color="danger" @click="deleteCourse(x.id,x.title)">Видалити курс</v-btn>
        </v-card>
    </div>
    <div v-else-if="!userCourses.length">
        <h1>Учитесь!</h1>
    </div>
</v-col>
</template>

<script>
export default {
    data: () => ({
        confP: false
    }),

    methods: {
        goToCourse(course, lesson) {
            this.$router.push({
                path: `/courses/${course}/${lesson}`
            })
        },
       async deleteCourse(id,course){
              await   this.$store.dispatch('deleteCourse',{id,course})
              await   this.$store.dispatch('getCreatedCourses')
        },
     async   editCourse(title,id){
            await this.$store.dispatch('courseToEdit',id)
            this.$router.push(`/profile/mycourses/${id}`)
        },
    
    },
    computed: {
        userCourses() {
            return this.$store.getters.getCreatedCourses
        }
    },
   async mounted(){
     await   this.$store.dispatch('getCreatedCourses')
    }
}
</script>

<style scoped>
.changepsw {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 165px;
    background: #323232;
    border-radius: 10px;
    align-items: center;
    transition-duration: 5000ms;
}

.chP {
    width: 400px !important;

}

.changepsw>input {
    border-bottom: 1px solid white;
    padding: 10px;
    color: white;
    width: 70%;
    padding-bottom: 7px;

}

.cc {
    display: flex;
    justify-content: flex-start;
    height: 100%;
}

.iblc {

    width: 272px;
    height: 272px;
    border: 1px solid black;
    margin-top: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
}

.wrapper {
    width: 70%;
    height: 100%;
}

.inp {
    border-bottom: 1px solid black;
    margin-right: 5px;
}

.inpC {
    padding: 10px;
}

.userData {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btns {

    display: flex;
    flex-direction: column;
    justify-content: center;

}

.btns>button {
    margin: 10px;
    width: 200px;
}

.userImgContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 2px solid black;
}

.txtp {
    font-size: 50px;
    padding: 0px;
    margin: 1px;
}

.edit:hover {
    color: black;
}

.course {
    padding: 30px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}


.continue {
    margin-top: 15px;
}

.current-lesson {
    font-size: 26px;
}

.courseCont {
    display: flex;
}

</style>
