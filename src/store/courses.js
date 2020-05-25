import { auth, db, storage,  currentUser, coursesCollection, usersCollection } from "../firebase/firebaseConfig";


export default {
    state: {
        course: { title: '', description: '', imgSrc: '' },
        description: '',
        src: '',
        categories: [],
        category: '',
        joined: false,
        imgCourse: '',
        courseToEdit:''
    },
    mutations: {
        setCourse(state, payload) {
            state.course = payload;
        },
        setJoined(state, payload) {
            state.joined = payload;
        },
        setDesc(state, payload) {
            state.description = payload
        },
        setSrc(state, payload) {
            state.src = payload
        },
        setCat(state, payload) {
            state.categories = payload
        },
        createCourse(state, payload) {
            state.course = payload
        },
        setImgCourse(state, payload) {
            state.course = payload;
        },
        setCourseToEdit(state,payload){
            state.courseToEdit = payload
        }

    },
    actions: {
        async  addCourse({ commit }, payload) {
            console.log('Adding a course')
            if (!auth.currentUser) {
                try {
                    commit('setTrigger', true)
                }
                catch (error) {
                    console.log(error)
                }
                return;

            }

            const userData = await usersCollection.doc(auth.currentUser.uid).get()

            if (userData.data().courses[payload.course]) {
                console.log("You have already joined that course!")
                return;
            }
            else {
                console.log("Adding course");
                console.log('AddCoursePayload', payload)

                await usersCollection.doc(auth.currentUser.uid).set({
                    courses: {
                        [payload.course]: {
                            ctitle: payload.title,
                            cprogress: 0,
                            currentlesson: 0,
                            lprogress: 0,
                            flessons: []
                        }

                    }
                }, { merge: true })
            }

        },
        async setCat({ commit }, payload) {
            let cats = []
            let courses = await coursesCollection.get()
            courses.forEach(course => cats.push(course.data()))
            commit("setCat", cats)
            console.log('cats', cats) // ! В масиві 2 об'єкта з курсами(Angular, TypeScript)

        },

        async setCourse({ commit }, payload) {
            console.log('settingCourses', payload)
            var tcourse = null;
            commit('setLoading', true)  
            let course = await coursesCollection.where("category","==",payload).get()
            course.forEach(c => tcourse = c.data())
            console.log('currenEmail',auth.currentUser.email)
            console.log("Cooursse",tcourse)
            console.log('Returned data', tcourse)
            commit("setCourse", tcourse)
            commit('setLoading', false)
        },

        async addCourseLesson({commit},payload){
            let courseId = ''
            let userLesson =  storage.ref('CourseVideos/' + payload.video.name)
            await  userLesson.put(payload.video)
            let videoUrl = await userLesson.getDownloadURL()
            const video = {
                author:payload.author,
                cat:payload.cat,
                course:payload.course,
                description:payload.description,
                rating:0,
                ratings:{},
                title:payload.title,
                videoUrl:videoUrl
            }
            console.log('to add',video)
            await usersCollection.doc(auth.currentUser.uid).get()
            .then(
                data => {
                  courseId =  data.data().myCourses[payload.course].courseId
                }
            )
            await  coursesCollection.doc(courseId).collection('Lessons').add(video)
            .then(
                ()=>{
                    console.log('succeess')
                }
        
            )
            .catch(
                (error)=>{
                    console.log('addingeROROR',error)
                }
            )


        },
      async deleteLesson ({commit},payload){
        await coursesCollection.doc(payload.courseId).collection('Lessons').doc(payload.lessonId).delete()
        .then(
            ()=>{
                console.log('deleted')
            }
        )

      } ,
      async editLesson ({commit},payload){
        await coursesCollection.doc(payload.courseId).collection('Lessons').doc(payload.lessonId).set({
          description:payload.description,
          title:payload.title  
        },{merge:true})
        .then(
            ()=>{
                console.log('edited')
            }
        )
      } ,
      async  courseToEdit({commit},payload){
        let courseData =   await  (await coursesCollection.doc(payload).get()).data();
        let lessons = []
        let courseLessonData = await (await coursesCollection.doc(payload).collection('Lessons').get()).forEach(
              lesson => lessons.push({...lesson.data(),id:lesson.id})  
        )
        console.log('courseLEssons',lessons)
        commit('setCourseToEdit',{...courseData,id:payload,lessons})
        },
      async editCourse ({commit},{id,description,image,category}){
        let coursePhoto = storage.ref('Course/' + image.name)
        await coursePhoto.put(image)
        let photo = await coursePhoto.getDownloadURL()


     await   coursesCollection.doc(id).set({
            description,
            imageSrc:photo

        },{merge:true})
     await usersCollection.doc(auth.currentUser.uid).set({
         myCourses:{
            [category]:{
                courseImage:photo
            }
         }
     },{merge:true})   



      } , 
        async getJoined({ commit }, payload) {
            if (!auth.currentUser) {
                commit('setJoined', false)
                console.log("no user")
                return;
            }
            const userData = await usersCollection.doc(auth.currentUser.uid).get()
            if (userData.data().courses.hasOwnProperty(payload)) {
                commit('setJoined', true)
                console.log("joined", userData.data().courses)
            }
            else {
                commit('setJoined', false)
                console.log("not joined", userData.data().courses)
            }
        },
        async createCourse({commit}, payload) {
           
            console.log('coursePPPP',payload);
           let coursePhoto = storage.ref('Course/' + payload.imageSrc.name)
           await coursePhoto.put(payload.imageSrc)
           let photo = await coursePhoto.getDownloadURL()
           const course = {
            category: payload.category,
            description: payload.description,
            imageSrc: photo,
            title:payload.title,
            author:payload.userName,
            rating:0,
            creatorId:auth.currentUser.uid

        }
        let courseId = '';
        await    coursesCollection.add(course)
                .then((docRef) => {
                    console.log(docRef.id);
                    courseId = docRef.id;
                 //   commit('createCourse', course)
                })
                .catch(err => {
                    console.log(err);
                })
        await    usersCollection.doc(auth.currentUser.uid).set({
            myCourses:{
                [payload.category]:{
                    category:payload.category,
                    title:payload.title,
                    courseId: courseId,
                    courseImage:photo
                }
            }

        },{merge:true})    
        },
        async deleteCourse({commit},payload){
         let  userData =  (await usersCollection.doc(auth.currentUser.uid).get()).data()
         delete  userData.myCourses[payload.course]
        await     usersCollection.doc(auth.currentUser.uid).set({
             ...userData
         })
        await  coursesCollection.doc(payload.id).delete()

        },
        async setImgCourse({ commit}, payload) {
            let photo = '';
            let coursePhotos = storage.ref('CoursePhotos/' + payload.name)
            await coursePhotos.put(payload)
            photo = await coursePhotos.getDownloadURL()
            console.log(photo)
        
            await coursesCollection.doc('').set({imgCourse: photo}, { merge: true})
            commit('setImgCourse', photo);


        }
    },
    getters: {
        getCourse(state) {
            return state.course
        },
        getCoursePhoto(state) {
            return state.imgCourse
        },
        getCat(state) {
            return state.categories
        },
        getJoined(state) {
            return state.joined
        },
        getCourseToEdit(state) {
            return state.courseToEdit
        }
    }
}

