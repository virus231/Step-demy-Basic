<template>
<div class="container-fluid cc">
    <div class="wrapper">
        <v-row class="miniCont">
            <v-col cols="3" class="userImgContainer">
                <p class="txtp">Профіль</p>
                <v-icon v-if="!this.$store.getters.getUserPhoto" class="iblc" size="240px">mdi-account</v-icon>
                <img v-if="this.$store.getters.getUserPhoto" class="iblc" :src="this.$store.getters.getUserPhoto" alt />
                <div class="btns mt-5">
                    <div class="upload-btn-wrapper">
                        <!-- <v-btn class="btn">Upload a file</v-btn> -->
                        <v-btn color="primary btn" dark @click.stop="changePhoto = true">Завантажити фото</v-btn>

                        <v-dialog v-model="changePhoto" max-width="590">
                            <v-card>
                                <v-card-title class="headline" justify="center">Змінити фото</v-card-title>

                                <v-card-text>
                                    <v-file-input label="Файл..." filled ref="file" @change="selectFile" prepend-icon="mdi-camera" class="innp" show-size counter multiple name="myfile"></v-file-input>
                                </v-card-text>

                                <v-card-actions>
                                    <v-btn class="btn-photo" light text @click="dialog = false">Відміна</v-btn>

                                    <v-btn class="btn-photo" light text @click="updatePhoto" name="myfile" ref="file">Зберегти</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                    <v-btn class="mb-3 mt-2" to="courses">Моє  навчання</v-btn>
                    <v-btn class="mb-3 mt-2" to="mycourses">Мої курси </v-btn>

                    <template>
                        <v-row justify="center">
                            <v-dialog v-model="dialog"  max-width="600px" @click:outside="dialog != dialog">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary mb-3" dark v-on="on">Створити курс</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Додати курс</span>
                                    </v-card-title>
                                    <v-btn icon dark @click="dialog  = false">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-card-text>
                                        <v-container>
                                            <v-row justify="center">
                                                <v-col cols="12" class="userData">
                                                    <div>
                                                        <form @submit.prevent="onCreateCourse">
                                                            <v-text-field name="category" label="Course category" id="category" v-model="category" required>
                                                            </v-text-field>
                                                            <v-text-field name="title" label="Title course" id="title" v-model="title" required>
                                                            </v-text-field>
                                                            <v-textarea outlined name="Description" label="Description" id="description" v-model="description">
                                                            </v-textarea>
                                                            <v-file-input  label="Файл..." filled ref="file" @change="selectFile" prepend-icon="mdi-camera" class="innp" show-size counter multiple name="myfile"></v-file-input>
                                                            <v-btn  class="primary" type="submit" :disabled="!formIsValid" @click="onCreateCourse,loadPhoto">
                                                                Add Course
                                                            </v-btn>
                                                        </form>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </template>
                    <v-btn class="sett" to="settings">Налаштування</v-btn>
                </div>
            </v-col>
            <router-view></router-view>
        </v-row>
    </div>
</div>
</template>

<script>
export default {
    data: () => ({
        confP: false,
        file: null,
        userImage: "",
        changePhoto: false,
        loadPhoto: false,
        dialog: false,
        imgSrc: '',
        category: '',
        description: '',
        title:''
    }),
    created() {
        console.log(this.$store.getters.getUserPhoto);
        
    },
    computed: {
        formIsValid() {
            return this.category !== '' && this.description !== ''
        },
        userPhoto() {
            return this.$store.getters.getUserPhoto;
        },
        userName() {
            return this.$store.getters.getUserName
        }
    },
    methods: {
        onCreateCourse() {
            if(!this.formIsValid) {
                return
            }
            console.log(this.file[0])
            const courseData = {
                category: this.category,
                description: this.description,
                imageSrc: this.file,
                userName: this.userName,
                title:this.title
            }
            console.log(courseData);
             
            this.$store.dispatch('createCourse', courseData)
            this.$router.push({
                path: '/profile/mycourses'
            })

        },
        selectFile(file) {
            this.file = file[0];

            console.log(this.file);
        },
        updatePhoto() {
            console.log("updatePhoto");
            this.$store.dispatch("setUserPhoto", this.file).then(() => {
                this.file = null;
                this.changePhoto = false;
            });
        },
        // loadPhoto() {
        //     console.log('setPhoto')
        //     this.$store.dispatch("setImgCourse", this.file)
        //         .then(() => {
        //             this.file = null;
        //             this.loadPhoto = false;
        //         })
        // },
        configuratePassword() {
            this.confP = !this.confP;
        },
        
        logSm() {
            console.log('change trigger')
            this.$store.dispatch('setTrigger', false)
        }
    }
};
</script>

<style scoped>
.innp {
    cursor: pointer;
}

.btn {
    width: 200px;
}

.btn-photo {
    font-size: 18px;
}

.upload-btn-wrapper {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.upload-btn-wrapper input[type="file"] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}

.miniCont {
    height: 100%;
    margin-top: 0px;
}

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
    height: 100vh;
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
    width: 80%;
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
    width: 200px;
    height: 200px;
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
    align-items: center;
    margin-top: 0px;
    padding-top: 0px;
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
</style>
