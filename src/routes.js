import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import Login from './pages/Login'
import TabScreen from './pages/TabScreen'
import Register from './pages/Register'
import Verificar from './services/api';
import Quizz from "./pages/Quizz"
import EducationTeachers from './pages/EducationTeachers';
import AddCourse from './pages/AddCourse';
import Questions from './pages/Questions';
import AddLessons from './pages/AddLessons';
import UpdatePassword from './pages/UpdatePassword';
import UpdateProfile from './pages/UpdateProfile'
import Help from './pages/Help'
import CourseDetails from './pages/CourseDetails';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import Subject from './pages/Subject';
import ListLessonTeachers from './pages/ListLessonTeachers';
import CourseByCategory from './pages/CourseByCategory';
const AppStack = createNativeStackNavigator();



export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false,
            gestureEnabled: Platform.OS === 'ios' ? false : true}}
            >
                <AppStack.Screen name='Verificar' component={Verificar}/>
                <AppStack.Screen name='Quizz' component={Quizz}/>
                <AppStack.Screen name='CourseByCategory' component={CourseByCategory}/>

                <AppStack.Screen name='Subject' component={Subject}/>

                <AppStack.Screen name='ListLessonTeachers'component={ListLessonTeachers}/>

                <AppStack.Screen name='Register'component={Register}/>
                <AppStack.Screen name='Login' component={Login}/>
                <AppStack.Screen name='TabScreen' component={TabScreen}/>
                <AppStack.Screen name='CourseDetails' component={CourseDetails}/>

                <AppStack.Screen name='UpdatePassword' component={UpdatePassword}/>
                <AppStack.Screen name='UpdateProfile' component={UpdateProfile}/>
                <AppStack.Screen name='Help' component={Help}/>

                <AppStack.Screen name='EducationTeachers' component={EducationTeachers}/>
                <AppStack.Screen name='AddCourse' component={AddCourse}/>

                <AppStack.Screen name='AddLessons' component={AddLessons}/>
                <AppStack.Screen name='Questions' component={Questions}/>

                <AppStack.Screen name='Lesson' component={Lesson}/>

                <AppStack.Screen name='Course' component={Course}/>

            </AppStack.Navigator>
        </NavigationContainer>
    )
}
