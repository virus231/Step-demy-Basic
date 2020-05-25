<template>
<div>
    <div class="container-fluid cont">
        <h1 class="text-center mt-5">Редагування Курсу</h1>

        <v-form ref="form" v-model="valid" lazy-validation>

            <v-text-field label="Title" :placeholder="courseToEdit.category" disabled></v-text-field>
            <img width='400' height="300" :src="courseToEdit.imageSrc" alt="">
            <v-file-input label="Файл..." filled ref="file" @change="selectFile" prepend-icon="mdi-camera" class="innp" show-size counter multiple name="myfile"></v-file-input>

            <v-textarea outlined name="Description" label="Description" :placeholder="courseToEdit.description" id="description" v-model="description">
            </v-textarea>

            <div class="btns d-flex add" align="center" justify="center">
                <v-btn color="white" class="mr-5" @click="editCourse">
                    Save
                </v-btn>

                <template>
                    <v-row class='add'>
                        <v-dialog v-model="dialog" max-width="600px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark v-on="on">Add Lesson</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Додати урок</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field label="Title of Lesson" v-model="lessonTitle" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-textarea outlined name="Description" label="Description" id="description" v-model="lessonDescription">
                                                </v-textarea>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-file-input label="Файл..." filled ref="file" @change="selectVideo" prepend-icon="mdi-camera" class="innp" show-size counter multiple name="myfile"></v-file-input>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                    <v-btn color="blue darken-1" text @click="addLesson" :loading="loading">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-row>
                </template>
            </div>

        </v-form>
        <v-col class="ls">
            <div class="videoList">
                <hooper :vertical="false" class="hoop" :itemsToShow="5" :trimWhiteSpace="true" :centerMode="true">
                    <slide class="lesson" v-for="(lesson,index) in courseToEdit.lessons" :key="index">

                        <v-row class='add'>
                            <div class="prev" @click="lid=lesson.id,dialog1 =  !dialog1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="61" height="45" viewBox="0 0 99 135">
                                    <g id="Polygon_2" data-name="Polygon 2" transform="translate(99) rotate(90)" fill="#fff">
                                        <path d="M 106.617919921875 96.5 L 28.38208389282227 96.5 C 25.95551681518555 96.5 23.72024917602539 95.86758422851563 21.73836708068848 94.62030029296875 C 19.89376640319824 93.45940399169922 18.36956596374512 91.80667114257813 17.3305835723877 89.84075164794922 C 16.29159927368164 87.87483978271484 15.78468322753906 85.68447113037109 15.86464977264404 83.50642395019531 C 15.95058345794678 81.16630554199219 16.6872673034668 78.96320343017578 18.05423355102539 76.95829010009766 L 57.17214965820313 19.58535385131836 C 58.37675094604492 17.818603515625 59.93083190917969 16.44108772277832 61.79123306274414 15.49102020263672 C 63.53856658935547 14.59870338439941 65.51263427734375 14.12705421447754 67.5 14.12705421447754 C 69.48736572265625 14.12705421447754 71.46143341064453 14.59870338439941 73.20876312255859 15.49102020263672 C 75.06916809082031 16.44108772277832 76.62325286865234 17.818603515625 77.82785034179688 19.58535385131836 L 116.9457702636719 76.95830535888672 C 118.3127517700195 78.96320343017578 119.049430847168 81.16630554199219 119.1353530883789 83.50640106201172 C 119.2153167724609 85.68445587158203 118.7084197998047 87.87483978271484 117.66943359375 89.84073638916016 C 116.6304321289063 91.80665588378906 115.1062469482422 93.45940399169922 113.2616348266602 94.62030029296875 C 111.2797698974609 95.86758422851563 109.0445022583008 96.5 106.617919921875 96.5 Z" stroke="none" />
                                        <path d="M 67.5 16.62705230712891 C 64.14128112792969 16.62705230712891 61.12979888916016 18.2186279296875 59.23771667480469 20.99369049072266 L 20.11979675292969 78.36663055419922 C 19.02242279052734 79.97612762451172 18.43132019042969 81.73626708984375 18.36296081542969 83.59815216064453 C 18.29904174804688 85.3388671875 18.70635986328125 87.09358978271484 19.54087829589844 88.67259216308594 C 20.37538146972656 90.2515869140625 21.59571838378906 91.57662963867188 23.06996154785156 92.50443267822266 C 24.64679718017578 93.49681091308594 26.43405914306641 93.99999237060547 28.382080078125 93.99999237060547 L 106.617919921875 93.99999237060547 C 108.5659408569336 93.99999237060547 110.3531799316406 93.49681091308594 111.9300231933594 92.50443267822266 C 113.4042816162109 91.57662963867188 114.6246185302734 90.2515869140625 115.4591217041016 88.67259216308594 C 116.2936172485352 87.09356689453125 116.7009429931641 85.3388671875 116.6370239257813 83.59812927246094 C 116.5686645507813 81.73626708984375 115.9775772094727 79.97612762451172 114.8801803588867 78.36663055419922 L 75.76226043701172 20.99369049072266 C 73.87017822265625 18.2186279296875 70.85870361328125 16.62705230712891 67.5 16.62705230712891 M 67.5 11.62705230712891 C 72.20808410644531 11.62705230712891 76.91616058349609 13.81037139892578 79.89340209960938 18.17700958251953 L 119.0113220214844 75.54994964599609 C 125.8002777099609 85.50707244873047 118.6692199707031 98.99999237060547 106.617919921875 98.99999237060547 L 28.382080078125 98.99999237060547 C 16.33075714111328 98.99999237060547 9.199722290039063 85.50707244873047 15.98866271972656 75.54994964599609 L 55.10658264160156 18.17700958251953 C 58.08383178710938 13.81037139892578 62.79191589355469 11.62705230712891 67.5 11.62705230712891 Z" stroke="none" fill="#707070" />
                                    </g>
                                </svg>
                            </div>
                        </v-row>

                        <div class="inform">
                            {{lesson.title}}
                        </div>

                    </slide>

                </hooper>

            </div>
        </v-col>
        <v-dialog v-model="dialog1" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Редагувати урок</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Title of a lesson" v-model="editTitle" :placeholder="lid && courseToEdit.lessons.find( l=> l.id === lid) ? courseToEdit.lessons.find( l=> l.id === lid).title : 'dsa'" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea outlined name="Description" v-model="editDescription" label="Description" id="description" :placeholder="lid && courseToEdit.lessons.find( l=> l.id === lid) ? courseToEdit.lessons.find( l=> l.id === lid).description : 'NOne'">

                                </v-textarea>
                            </v-col>
                            <v-col cols="12">

                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
                    <v-btn :loading="loading" color="blue darken-1" text @click="editLesson(courseToEdit.id,lid,editTitle,editDescription)">Save</v-btn>
                    <v-btn :loading="loading" color="blue darken-1" text @click="deleteLesson(courseToEdit.id,lid)">Видалити Урок</v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</div>
</template>

<script>
    import * as fb from 'firebase'

    import {
        Hooper,
        Slide
    } from 'hooper';
    import 'hooper/dist/hooper.css';

    export default {
        data: () => ({
            valid: true,
            name: '',
            dialog: false,
            dialog1: false,
            description: '',
            file: null,
            lessonTitle: '',
            lessonDescription: '',
            videoFile: null,
            editTitle: '',
            editDescription: '',
            loading: false,
            lid: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],

        }),
        components: {
            Hooper,
            Slide
        },
        methods: {
            validate() {
                this.$refs.form.validate()
            },
            reset() {
                this.$refs.form.reset()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            goToCourse(course, lesson) {
                this.$router.push({
                    path: `/courses/${course}/${lesson}`
                })
            },
            selectFile(file) {
                this.file = file[0];

                console.log(this.file);
            },
            selectVideo(file) {
                this.videoFile = file[0]
                console.log(this.videoFile)
            },
            async editCourse() {
                this.loading = true
                await this.$store.dispatch('editCourse', {
                    id: this.courseToEdit.id,
                    description: this.description,
                    image: this.file,
                    category: this.courseToEdit.category
                })
                const id = this.$route.path.split('/')[3]

                await this.$store.dispatch('courseToEdit', id)
                this.loading = false

            },
            async addLesson() {
                console.log('addingLesson')
                this.loading = true
                await this.$store.dispatch('addCourseLesson', {
                    video: this.videoFile,
                    title: this.lessonTitle,
                    description: this.lessonDescription,
                    cat: this.courseToEdit.title.trim(),
                    author: this.courseToEdit.author,
                    course: this.courseToEdit.category
                })
                const id = this.$route.path.split('/')[3]
                await this.$store.dispatch('courseToEdit', id)
                this.dialog = false
                this.videoFile = null,
                    this.lessonTitle = '',
                    this.lessonTitle = ''
                this.loading = false

            },
            async deleteLesson(cid, lid) {
                this.loading = true
                await this.$store.dispatch('deleteLesson', {
                    courseId: cid,
                    lessonId: lid
                })
                this.dialog1 = false;
                const id = this.$route.path.split('/')[3]

                await this.$store.dispatch('courseToEdit', id)
                this.loading = false
            },
            async editLesson(cid, lid, title, description) {
                this.loading = true;
                await this.$store.dispatch('editLesson', {
                    courseId: cid,
                    lessonId: lid,
                    description: this.editDescription,
                    title: this.editTitle
                })
                this.editDescription = '';
                this.editTitle = '';
                this.dialog1 = false;
                const id = this.$route.path.split('/')[3]

                await this.$store.dispatch('courseToEdit', id)
                this.loading = false

            }
        },
        computed: {
            lessons() {
                //console.log('lessonsssss',this.$store.getters.getLessons)
                // return this.$store.getters.getLessons
                return Array.from({
                    length: 10
                }, () => '1');
            },
            // currentLesson() {
            //     // return this.$store.getters.getCurrentLesson

            // },
            courseToEdit() {
                return this.$store.getters.getCourseToEdit
            },

            isLoading() {
                return this.$store.getters.loading;
            }

        },

        async mounted() {
            // console.log("LEsson",this.$store.getters.getLessons)
            const id = this.$route.path.split('/')[3]

            await this.$store.dispatch('courseToEdit', id)

            // if (this.$refs.source) {
            //     this.$refs.source.currentTime = this.$store.getters.getCurrentTime;
            // }

        },

    }
</script>

<style scoped>
    .cont {
        width: 900px;
        margin: 0 auto;
        margin-left: 50px;
    }

    .rdiv {
        width: 315px;
        height: 55px;
        display: flex;
    }

    .row {
        justify-content: space-evenly !important;
    }

    .title {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

    }

    .title>p {
        font-size: 35px;
        font-weight: lighter;

    }

    .authorD {
        height: 90px;
        display: flex;
        flex-direction: column;

    }

    .authorD>p {
        margin-bottom: 0px !important;
        text-align: right;
    }

    /* .rte>i {
    font-size: 22px;
} */

    .author {
        /* border: 1px solid #4E5256; */
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
    }

    .author>p {
        margin-bottom: 0px !important;
        margin-right: 8px;
        font-size: 22px;
        text-decoration: underline;
    }

    .author>i {
        width: 42px;
        height: 42px;
        border: 1px solid #4E5256;
        border-radius: 100%;
    }

    .row {
        display: flex;
        justify-content: space-between
    }

    .uroc {
        width: 854px;
        height: 480px;

    }

    .vd {
        max-width: 854px;
    }

    .videoCont {
        height: 854px;
        width: 854px;
    }

    .rr {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .playlist {
        border: 1px solid gray;
        height: 400px;
        margin-left: 170px;
    }

    .lesson {
        width: 210px !important;
        height: 114px !important;
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        /* flex-direction: column; */
    }

    .prev {
        width: 130px;
        height: 114px;
        border: 3px solid #4E5256;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 5px;
    }

    .videoList {
        width: 384px;

    }

    .hoop {
        /* height: 700px; */
        width: 165%;
    }

    .ls {
        max-width: 500px;
    }

    .inform {
        width: 245px;
    }

    .title-video {
        font-size: 40px;
    }

    .main {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .add {
        justify-content: start !important;
    }
</style>

<!-- <template>
<v-col cols="8" class="userData">
<p>{{courseToEdit}}</p>
    <p>{{courseToEdit.category}}</p>

    <img :src="courseToEdit.imageSrc" width="100" height="100" alt="" srcset="">
     <v-file-input  label="Файл..." filled ref="file" @change="selectFile" prepend-icon="mdi-camera" class="innp" show-size counter multiple name="myfile"></v-file-input>
      <input  type="text" v-model="description" name="" :placeholder="courseToEdit.description" id="">
      <v-btn @click="editCourse">Save</v-btn>

</v-col>
</template>

<script>
export default {
    data: () => ({
        file:null,
        description:''
    }),

    methods: {
        goToCourse(course, lesson) {
            this.$router.push({
                path: `/courses/${course}/${lesson}`
            })
        },
       selectFile(file) {
            this.file = file[0];

            console.log(this.file);
        },
       async editCourse(){
            this.$store.dispatch('editCourse',{id:this.courseToEdit.id,description:this.description,image:this.file,category:this.courseToEdit.category})
        }
    },
    computed: {
        courseToEdit(){
            return this.$store.getters.getCourseToEdit
        },
    },

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

</style> -->
